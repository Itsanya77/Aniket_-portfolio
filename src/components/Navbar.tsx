import React, { useState, useRef, useEffect } from 'react';
import { NavView } from '../types';
import { Terminal, Menu, X, FileText, Command, ChevronDown, GraduationCap, Award, BarChart3, Trophy, Layers, Sparkles, Lock, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  isAdminAuthenticated?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenResume,
  onOpenTerminal,
  isAdminAuthenticated = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { view: NavView; label: string }[] = [
    { view: 'home', label: 'Home' },
    { view: 'about', label: 'About' },
    { view: 'skills', label: 'Skills' },
    { view: 'projects', label: 'Projects' },
    { view: 'experience', label: 'Experience' },
    { view: 'contact', label: 'Contact' },
  ];

  const moreLinks: { view: NavView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { view: 'education', label: 'Education', icon: GraduationCap },
    { view: 'certifications', label: 'Certifications', icon: Award },
    { view: 'data-vis', label: 'Data Visualization', icon: BarChart3 },
    { view: 'workflow', label: 'Data Science Pipeline', icon: Sparkles },
    { view: 'achievements', label: 'Achievements', icon: Trophy },
    { view: 'services', label: 'Services', icon: Layers },
    { view: 'github', label: 'GitHub Activity', icon: Terminal },
  ];

  const isMoreActive = ['education', 'certifications', 'data-vis', 'workflow', 'achievements', 'services', 'github'].includes(currentView);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')} 
            className="group flex items-center gap-3 cursor-pointer text-left"
          >
            <div className="w-9 h-9 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.5)] group-hover:scale-105 transition-transform">
              <span className="text-slate-950 font-mono font-black text-base">PY</span>
            </div>
            <div>
              <span className="text-lg font-display font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-sky-300">
                ANIKET BADHE
              </span>
              <span className="block text-[10px] font-mono text-sky-400 font-medium">
                Python & Data Science
              </span>
            </div>
          </button>

          {/* Cmd Center Badge */}
          <button
            onClick={() => onNavigate('dashboard')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-sky-500/20 border-sky-400 text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-sky-500/50'
            }`}
          >
            <Command className="w-3.5 h-3.5 text-sky-400" />
            <span>Admin Cmd Center</span>
            {isAdminAuthenticated ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Lock className="w-3 h-3 text-slate-400" />
            )}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 items-center h-full">
          {navLinks.map((link) => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => onNavigate(link.view)}
                className={`h-full flex items-center font-medium text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-sky-400 font-bold border-b-2 border-sky-400 shadow-[0_4px_12px_rgba(56,189,248,0.3)]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* More Dropdown */}
          <div className="relative h-full flex items-center" ref={dropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-all duration-200 cursor-pointer ${
                isMoreActive ? 'text-sky-400 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>More</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute top-16 right-0 w-56 bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-fadeIn z-50">
                {moreLinks.map((m) => {
                  const Icon = m.icon;
                  const isActive = currentView === m.view;
                  return (
                    <button
                      key={m.view}
                      onClick={() => {
                        onNavigate(m.view);
                        setMoreDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-sky-500/20 text-sky-400 font-bold'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-sky-400" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenTerminal}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all cursor-pointer active:scale-95"
            title="Launch Data Terminal"
          >
            <Terminal className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-slate-950 font-mono text-xs font-extrabold hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300 cursor-pointer active:scale-95"
          >
            <FileText className="w-4 h-4" />
            Resume
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-200 p-2 hover:text-sky-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-white/10 px-6 py-6 space-y-3 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => {
                onNavigate(link.view);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left font-display py-2 text-base ${
                currentView === link.view ? 'text-sky-400 font-bold' : 'text-slate-300'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">More Sections</span>
            {moreLinks.map((m) => (
              <button
                key={m.view}
                onClick={() => {
                  onNavigate(m.view);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left font-mono py-1.5 text-xs ${
                  currentView === m.view ? 'text-sky-400 font-bold' : 'text-slate-400'
                }`}
              >
                • {m.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-sky-400 font-mono text-xs font-bold flex items-center justify-center gap-2"
            >
              {isAdminAuthenticated ? (
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              Admin Command Center
            </button>

            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
            >
              <FileText className="w-4 h-4" /> Download Resume
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
