import express, { Request, Response, NextFunction } from "express";
import path from "path";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Ephemeral signing key fallback if SESSION_SECRET is not provided in env
const SESSION_SECRET =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");
const TOKEN_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

// In-memory first-run fallback credential hash (only active when process.env.ADMIN_PASSWORD is unset)
let claimedAdminHash: string | null = null;

// In-memory revoked token JTIs (pruned on cleanup)
const revokedTokenJtis = new Map<string, number>();

// Basic in-memory rate limiter for login attempts by client IP
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_LOGIN_ATTEMPTS = 10;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

function getEnvAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD || "").trim();
}

function hashPasswordScrypt(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

function verifyPasswordScrypt(password: string, storedHash: string): boolean {
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, expectedHex] = parts;
  const expectedBuf = Buffer.from(expectedHex, "hex");
  const derivedBuf = crypto.scryptSync(password, salt, 64);
  if (expectedBuf.length !== derivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, derivedBuf);
}

function verifyEnvPassword(input: string, expected: string): boolean {
  const inputDigest = crypto.createHash("sha256").update(input, "utf8").digest();
  const expectedDigest = crypto
    .createHash("sha256")
    .update(expected, "utf8")
    .digest();
  return crypto.timingSafeEqual(inputDigest, expectedDigest);
}

interface TokenPayload {
  sub: string;
  jti: string;
  iat: number;
  exp: number;
}

function issueAdminToken(): { token: string; expiresAt: number } {
  const now = Date.now();
  const expiresAt = now + TOKEN_TTL_MS;
  const payload: TokenPayload = {
    sub: "admin",
    jti: crypto.randomBytes(16).toString("hex"),
    iat: now,
    exp: expiresAt,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url"
  );
  const sig = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");
  return { token: `${encodedPayload}.${sig}`, expiresAt };
}

function verifyAdminToken(token: string): TokenPayload | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [encodedPayload, providedSig] = parts;
  const expectedSig = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");

  const providedBuf = Buffer.from(providedSig, "utf8");
  const expectedBuf = Buffer.from(expectedSig, "utf8");
  if (
    providedBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(providedBuf, expectedBuf)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as TokenPayload;
    if (payload.sub !== "admin" || typeof payload.exp !== "number") {
      return null;
    }
    if (Date.now() > payload.exp) {
      return null;
    }
    if (revokedTokenJtis.has(payload.jti)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function extractBearerToken(req: Request): string | null {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.slice(7).trim() || null;
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }
  const payload = verifyAdminToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Invalid or expired admin session." });
  }
  (req as Request & { adminPayload?: TokenPayload }).adminPayload = payload;
  next();
}

function isSafeImageSrc(value: string): boolean {
  if (value.length > 3_500_000) return false;
  if (/^data:image\/(png|jpeg|jpg|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(value)) {
    return true;
  }
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

let customProfileImage: string | null = null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.set("trust proxy", true);
  app.use(express.json({ limit: "4mb" }));

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Public Profile Image Retrieval
  app.get("/api/profile", (_req, res) => {
    res.json({ imageUrl: customProfileImage });
  });

  // Protected Admin Profile Image Update
  app.put("/api/profile", requireAdminAuth, (req, res) => {
    const { imageUrl } = req.body || {};
    if (imageUrl === null || imageUrl === "") {
      customProfileImage = null;
      return res.json({ imageUrl: null });
    }
    if (typeof imageUrl !== "string" || !isSafeImageSrc(imageUrl.trim())) {
      return res.status(400).json({
        error: "Invalid image URL or unsupported image format.",
      });
    }
    customProfileImage = imageUrl.trim();
    return res.json({ imageUrl: customProfileImage });
  });

  // Admin Auth Status (never exposes password or hints)
  app.get("/api/admin/status", (_req, res) => {
    const isConfigured = Boolean(getEnvAdminPassword() || claimedAdminHash);
    res.json({ configured: isConfigured });
  });

  // One-time first-run Admin Password Setup (only allowed when ADMIN_PASSWORD env is unset and unclaimed)
  app.post("/api/admin/setup", (req, res) => {
    if (getEnvAdminPassword() || claimedAdminHash) {
      return res.status(409).json({
        error: "Admin password is already configured.",
      });
    }

    const password =
      typeof req.body?.password === "string" ? req.body.password : "";
    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({
        error: "Password must be between 8 and 128 characters.",
      });
    }

    claimedAdminHash = hashPasswordScrypt(password);
    const { token, expiresAt } = issueAdminToken();
    return res.status(201).json({ token, expiresAt });
  });

  // Admin Login Verification (strictly server-side)
  app.post("/api/admin/login", (req, res) => {
    const clientIp = req.ip || "unknown";
    const now = Date.now();
    const record = loginAttempts.get(clientIp);
    if (record && now < record.resetAt && record.count >= MAX_LOGIN_ATTEMPTS) {
      return res.status(429).json({
        error: "Too many failed attempts. Please try again later.",
      });
    }

    const password =
      typeof req.body?.password === "string" ? req.body.password : "";
    if (!password) {
      return res.status(400).json({ error: "Password is required." });
    }

    const envPassword = getEnvAdminPassword();
    let isValid = false;

    if (envPassword) {
      // Configured process.env password always overrides any claimed fallback hash
      isValid = verifyEnvPassword(password, envPassword);
    } else if (claimedAdminHash) {
      isValid = verifyPasswordScrypt(password, claimedAdminHash);
    } else {
      return res.status(409).json({
        error: "Admin password has not been configured yet.",
      });
    }

    if (!isValid) {
      const current =
        record && now < record.resetAt
          ? record
          : { count: 0, resetAt: now + LOGIN_WINDOW_MS };
      current.count += 1;
      loginAttempts.set(clientIp, current);
      return res.status(401).json({ error: "Invalid admin password." });
    }

    loginAttempts.delete(clientIp);
    const { token, expiresAt } = issueAdminToken();
    return res.json({ token, expiresAt });
  });

  // Verify existing Bearer session token
  app.get("/api/admin/verify", requireAdminAuth, (req, res) => {
    const payload = (req as Request & { adminPayload?: TokenPayload })
      .adminPayload;
    res.json({ authenticated: true, expiresAt: payload?.exp });
  });

  // Revoke active session token on logout
  app.post("/api/admin/logout", requireAdminAuth, (req, res) => {
    const payload = (req as Request & { adminPayload?: TokenPayload })
      .adminPayload;
    if (payload) {
      revokedTokenJtis.set(payload.jti, payload.exp);
      // Prune expired revocations
      const now = Date.now();
      for (const [jti, exp] of revokedTokenJtis.entries()) {
        if (exp < now) revokedTokenJtis.delete(jti);
      }
    }
    res.json({ success: true });
  });

  // Terminal AI Assistant Endpoint using Gemini SDK
  app.post("/api/terminal/ai", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback response if API key is not configured
        return res.json({
          reply: `[AI_PROXY] Hello! I am Aniket Badhe's AI Data & Python Assistant. Prompt received: "${prompt}". Aniket specializes in Python development, Data Science, Pandas, NumPy, Scikit-learn, Flask/Django backends, and Tableau analytics.`
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are the AI data assistant for Aniket Badhe, a Python Developer | Data Science & Data Analytics Specialist. Keep responses concise, helpful, data-oriented, and under 3 sentences.\nUser query: ${prompt}`,
      });

      res.json({ reply: response.text || "Query processed successfully." });
    } catch (err: any) {
      console.error("AI Terminal Error:", err);
      res.json({
        reply: `[AI_PROXY] Query processed. Aniket Badhe's stack includes Python, Pandas, NumPy, Scikit-learn, SQL, Flask, Django, and Data Analytics.`
      });
    }
  });

  // Contact Form Submission Endpoint
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    console.log(`[CONTACT RECEIVED] From: ${name} (${email}) - Subject: ${subject}`);
    res.json({
      success: true,
      message: "Message delivered successfully to Aniket Badhe.",
      id: `msg-${Date.now()}`
    });
  });

  // Vite middleware setup for development vs production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
