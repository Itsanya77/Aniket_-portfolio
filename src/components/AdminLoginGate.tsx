import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, KeyRound, ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

interface AdminLoginGateProps {
  onAuthenticated: (token: string) => void;
  onCancel: () => void;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({
  onAuthenticated,
  onCancel,
}) => {
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [isConfigured, setIsConfigured] = useState<boolean>(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    const checkStatus = async () => {
      try {
        const res = await fetch('/api/admin/status');
        if (!res.ok) throw new Error('Unable to reach authentication service');
        const data = await res.json();
        if (active) {
          setIsConfigured(Boolean(data.configured));
        }
      } catch {
        if (active) {
          setError('Unable to verify authentication status.');
        }
      } finally {
        if (active) {
          setIsLoadingStatus(false);
        }
      }
    };
    checkStatus();
    return () => {
      active = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError('Please enter the admin password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Authentication failed.');
        setPassword('');
        return;
      }

      if (data.token) {
        setPassword('');
        onAuthenticated(data.token);
      } else {
        setError('Invalid server response.');
      }
    } catch {
      setError('Network error while authenticating.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFirstRunSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 409) {
          setIsConfigured(true);
          setError('Admin password is already set. Please sign in.');
        } else {
          setError(data.error || 'Failed to configure admin password.');
        }
        setPassword('');
        setConfirmPassword('');
        return;
      }

      if (data.token) {
        setPassword('');
        setConfirmPassword('');
        onAuthenticated(data.token);
      }
    } catch {
      setError('Network error while saving admin password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center relative">
      <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(2,6,23,0.9)] relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-400" />

        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            {isConfigured ? <Lock className="w-6 h-6" /> : <KeyRound className="w-6 h-6" />}
          </div>
          <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 font-bold uppercase tracking-wider">
            {isConfigured ? 'Restricted Access' : 'Initial Setup'}
          </span>
        </div>

        <h1 className="font-display font-extrabold text-2xl text-white mb-2">
          {isConfigured ? 'Admin Command Center' : 'Claim Admin Access'}
        </h1>
        <p className="text-xs font-mono text-slate-400 mb-6 leading-relaxed">
          {isConfigured
            ? 'Enter your administrator password to unlock portfolio management controls.'
            : 'No ADMIN_PASSWORD environment secret is active yet. Create a private password (min. 8 characters) to lock the Admin Command Center.'}
        </p>

        {isLoadingStatus ? (
          <div className="py-10 flex flex-col items-center justify-center gap-3 text-slate-400 font-mono text-xs">
            <Loader2 className="w-6 h-6 animate-spin text-sky-400" />
            <span>Verifying security state...</span>
          </div>
        ) : (
          <form
            onSubmit={isConfigured ? handleLogin : handleFirstRunSetup}
            className="space-y-4"
            autoComplete="off"
          >
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="admin-password-input"
                className="block text-xs font-mono text-slate-300 mb-2"
              >
                {isConfigured ? 'Admin Password' : 'Create Admin Password'}
              </label>
              <input
                id="admin-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete={isConfigured ? 'current-password' : 'new-password'}
                required
                autoFocus
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/10 text-white font-mono text-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-slate-600"
              />
            </div>

            {!isConfigured && (
              <div>
                <label
                  htmlFor="admin-password-confirm"
                  className="block text-xs font-mono text-slate-300 mb-2"
                >
                  Confirm Admin Password
                </label>
                <input
                  id="admin-password-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-white/10 text-white font-mono text-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all placeholder:text-slate-600"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-slate-950 font-mono text-xs font-extrabold hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isConfigured ? 'Verifying...' : 'Securing Admin...'}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isConfigured ? 'Unlock Command Center' : 'Set Password & Unlock'}</span>
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Portfolio
          </button>
          <span className="text-[10px] font-mono text-slate-500">
            Session protected
          </span>
        </div>
      </div>
    </div>
  );
};
