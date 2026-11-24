# Aniket Badhe — Python Developer | Data Science & Analytics Portfolio

A high-performance full-stack web application and interactive developer workspace featuring interactive 3D WebGL background shaders, Data Science & Analytics pipeline visualizers, Recharts analytics dashboards, an interactive CLI terminal, and a full administrative Command Center dashboard.

Includes both a **Node.js Express + Vite Full-Stack Application** and an optional **Python Flask + SQLAlchemy (SQLite) Backend API** for complete database management and CRUD operations.

---

## 🚀 Project Overview

- **Developer**: Aniket Badhe (Python Developer | Data Science & Data Analytics)
- **Location**: Pune, India
- **Tech Stack**: Python, Data Science, Pandas, NumPy, Scikit-Learn, SQL, Flask, React 18, TypeScript, Vite, Tailwind CSS, Express, Recharts
- **Key Modules**:
  - **Portfolio Web Application**: Live showcase of Python, Data Science, and Machine Learning projects.
  - **Data Science Pipeline Visualizer**: Interactive 6-stage workflow breakdown (Data Ingestion → Preprocessing → Feature Engineering → Model Training → Evaluation → Deployment).
  - **Analytics & Recharts Section**: Live interactive charts (RFM Customer Segmentation, Sales Forecasting, ML Loss Curves).
  - **Admin Command Center**: Complete management hub for Projects, Skills, Experience, Education, Certifications, Achievements, Services, and Feedback Messages.
  - **Interactive CLI Terminal**: Terminal modal with diagnostic commands (`help`, `skills`, `projects`, `exp`, `contact`, `clear`, `ai <query>`).
  - **Flask + SQLAlchemy Backend API**: Python backend with SQLite database for database storage and REST API endpoints.

---

## ⚙️ Full Project Run Setup

### Prerequisites

- **Node.js**: v18.x or v20.x or higher
- **npm** or **bun** / **yarn**
- **Python**: 3.10+ (for Python Flask backend, optional)

---

### Option 1: Running the Full-Stack React + Express App (Primary)

The application runs seamlessly as a full-stack Node.js Express server with Vite middleware handling the frontend assets and backend API routes.

#### 1. Install Node.js Dependencies
```bash
npm install
```

#### 2. Configure Environment Variables
Create a `.env` file at the root directory (refer to `.env.example`):
```env
# Optional Gemini API Key for Interactive Terminal AI
GEMINI_API_KEY=your_gemini_api_key_here
```

#### 3. Start the Development Server
```bash
npm run dev
```
- Open your browser at `http://localhost:3000` (or the Cloud Run container URL).
- The application will launch with hot reload enabled.

#### 4. Linting & Type Checks
```bash
npm run lint
```

#### 5. Production Build & Execution
```bash
# Build the client bundle and bundle server.ts with esbuild
npm run build

# Start the production server
npm start
```

---

### Option 2: Running the Python Flask + SQLAlchemy Backend (SQLite)

The application includes a complete, independent Python Flask backend inside the `/backend` directory.

#### 1. Navigate to Backend Directory & Create Virtual Environment
```bash
cd backend

# Create Python virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
```

#### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### 3. Seed the SQLite Database
Run the seed script to create all tables and populate initial portfolio records:
```bash
python seed.py
```
This generates `backend/portfolio.db` with sample data for Projects, Skills, Experiences, Education, Certifications, Achievements, Services, and Feedback messages.

#### 4. Run the Flask Development Server
```bash
python app.py
```
- The Flask REST API will run on `http://localhost:5000/api`.
- Health Check: `http://localhost:5000/api/health`

---

## 🔐 Admin Command Center Access

Access to the Admin Panel is built directly into the application layout:

1. **Top Navigation**: Click **Cmd Center** in the top navigation bar at any time.
2. **Terminal Command**: Open the interactive CLI Terminal (terminal icon in navbar) and execute:
   ```bash
   dashboard
   ```
   or
   ```bash
   admin
   ```

### Admin Features Available:
- **Overview**: High-level metrics, active system stats, and quick project table.
- **Project Manager**: Add new projects (Title, Category, Problem Statement, Tags), preview project details, or remove entries.
- **Skill Matrix Manager**: Modify proficiency levels, categories, and descriptions.
- **Analytics Visualizers**: Preview live Recharts data visualizations.
- **Experience & Education**: Manage career history, internships, and degree details.
- **Certifications & Achievements**: Track verified credentials and hackathon honors.
- **Services Capability Manager**: Update offered technical capabilities.
- **Communications Inbox**: Read incoming contact messages, toggle unread status, and manage feedback.
- **Settings**: Update developer profile details (Name, Title, Location, Bio) with toast feedback.

---

## 📂 Project Directory Structure

```
├── backend/                  # Python Flask + SQLAlchemy Backend
│   ├── app.py                # Flask App Factory & Server Entry Point
│   ├── config.py             # App Configuration & SQLite URI
│   ├── models.py             # SQLAlchemy Database Models (Project, Skill, etc.)
│   ├── seed.py               # Database Seeding Script
│   ├── requirements.txt      # Python Dependencies
│   └── routes/
│       └── api.py            # Flask REST API Blueprints & CRUD Endpoints
├── src/
│   ├── App.tsx               # Main React Application Container
│   ├── components/           # UI Components
│   │   ├── AboutSection.tsx  # Developer Profile & Highlights
│   │   ├── AchievementsSection.tsx # Hackathons & Awards
│   │   ├── BackgroundShader.tsx    # WebGL Background Canvas
│   │   ├── CertificationsSection.tsx # Verified Credentials
│   │   ├── CustomCursor.tsx        # Hardware-Accelerated Smooth Cursor
│   │   ├── DashboardView.tsx       # Admin Command Center
│   │   ├── DataScienceWorkflowSection.tsx # 6-Step DS Pipeline
│   │   ├── DataVisualizationSection.tsx   # Interactive Recharts
│   │   ├── EducationSection.tsx    # Academic Degree Cards
│   │   ├── ExperienceSection.tsx   # Work History Timeline
│   │   ├── HeroSection.tsx         # Hero Landing Showcase
│   │   ├── InteractiveTerminalModal.tsx # CLI Console & AI Assistant
│   │   ├── Navbar.tsx              # Top Navigation Bar & Mobile Menu
│   │   ├── ProjectsSection.tsx     # Filterable Project Showcase
│   │   ├── ResumeModal.tsx         # Curriculum Vitae Export Modal
│   │   └── ServicesSection.tsx     # Technical Capabilities
│   ├── data/                 # Data Constants & Mock Datasets
│   ├── types.ts              # Global TypeScript Interfaces
│   └── main.tsx              # React DOM Entry Point
├── .env.example              # Environment Variable Template
├── package.json              # Node.js Dependencies & Scripts
├── server.ts                 # Express Server with Vite Middleware
└── vite.config.ts            # Vite Configuration
```

---

## 📜 Available Scripts Summary

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Express dev server with Vite middleware on port 3000 |
| `npm run build` | Compiles client SPA bundle to `dist/` and server to `dist/server.cjs` |
| `npm run start` | Runs production server (`node dist/server.cjs`) |
| `npm run lint` | Runs TypeScript compiler diagnostics (`tsc --noEmit`) |
| `python backend/seed.py` | Seeds SQLite database with portfolio data |
| `python backend/app.py` | Runs Python Flask REST API server on port 5000 |

---

## 👤 Developer Profile

- **Name**: Aniket Badhe
- **Role**: Python Developer | Data Science & Analytics Specialist
- **Email**: aniketbadhe09876@gmail.com
- **Location**: Pune, India
