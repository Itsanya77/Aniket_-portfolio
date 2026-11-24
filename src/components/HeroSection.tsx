import React, { useState } from 'react';
import { NavView } from '../types';
import { HERO_FLOATING_TECHS, PROFILE_IMAGE } from '../data/mockData';
import { FileText, FolderGit2, Github, Linkedin, Sparkles, Terminal, ArrowRight, Code2 } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: NavView) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  profileImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onOpenResume,
  onOpenTerminal,
  profileImage = PROFILE_IMAGE
}) => {
  const [cardTilt, setCardTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -10;
    const ry = ((x - centerX) / centerX) * 10;
    setCardTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setCardTilt({ rx: 0, ry: 0 });
  };

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        
        {/* Left Column: Hero Copy & CTA Buttons */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 font-mono text-xs text-sky-400 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)] animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Python & Data Science Developer</span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <p className="text-slate-400 font-mono text-lg tracking-wide">Hello, I'm</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
              ANIKET BADHE
            </h1>
            <h2 className="text-xl sm:text-2xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 pt-2">
              Python Developer | Data Science & Data Analytics
            </h2>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans">
            I build Python-based applications, analyze data, create meaningful visualizations, and develop data-driven solutions.
          </p>

          {/* Buttons Group */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('projects')}
              className="px-6 py-3.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-extrabold hover:bg-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <FolderGit2 className="w-4 h-4" /> View My Projects <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenResume}
              className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <FileText className="w-4 h-4 text-sky-400" /> Download Resume
            </button>

            <a
              href="https://github.com/aniketbadhe"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-sky-500/10 transition-all cursor-pointer"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://linkedin.com/in/aniketbadhe"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all cursor-pointer"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>

            <button
              onClick={onOpenTerminal}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all cursor-pointer"
              title="Launch Cyber Terminal"
            >
              <Terminal className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <span className="font-display font-extrabold text-2xl text-white block">15+</span>
              <span className="font-mono text-[11px] text-slate-400">Python Projects</span>
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl text-sky-400 block">50K+</span>
              <span className="font-mono text-[11px] text-slate-400">Data Records Cleaned</span>
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl text-indigo-400 block">10+</span>
              <span className="font-mono text-[11px] text-slate-400">Dashboards & Models</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive Profile Card & Floating Tech Elements */}
        <div className="lg:col-span-5 relative flex justify-center">
          
          {/* Main 3D Tilt Card */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
            className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative group hover:border-sky-500/40"
          >
            {/* Top Card Bar */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[11px] text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                aniket_data_core.py
              </span>
            </div>

            {/* Profile Avatar Frame */}
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/10 mb-6 group-hover:border-sky-400/50 transition-colors">
              <img
                src={profileImage}
                alt="Aniket Badhe"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="font-mono text-xs font-bold text-sky-400 block">ANIKET BADHE</span>
                <span className="font-mono text-[10px] text-slate-300">Python • Data Science • Analytics</span>
              </div>
            </div>

            {/* Tech Badges Row */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Core Ecosystem</span>
                <span className="text-emerald-400 font-bold">● Active 2026</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'Flask', 'Tableau'].map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:border-sky-400/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Floating 3D Technology Pill Badges */}
          <div className="absolute -top-4 -left-6 bg-slate-950/90 border border-sky-500/40 text-sky-400 font-mono text-xs px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.3)] animate-bounce">
            🐍 Python 3
          </div>

          <div className="absolute top-1/3 -right-6 bg-slate-950/90 border border-indigo-500/40 text-indigo-300 font-mono text-xs px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(129,140,248,0.3)]">
            📊 Pandas & NumPy
          </div>

          <div className="absolute bottom-10 -left-8 bg-slate-950/90 border border-emerald-500/40 text-emerald-400 font-mono text-xs px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            📈 Seaborn & Tableau
          </div>

          <div className="absolute -bottom-4 right-4 bg-slate-950/90 border border-purple-500/40 text-purple-300 font-mono text-xs px-3.5 py-1.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            🤖 Scikit-learn
          </div>
        </div>

      </div>

      {/* Floating 3D Tech Orbit Pill Cloud */}
      <div className="max-w-[1280px] mx-auto px-6 mt-16 w-full relative z-10">
        <p className="font-mono text-xs text-slate-500 uppercase tracking-widest text-center mb-4">
          Floating Technology Stack
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {HERO_FLOATING_TECHS.map((tech, i) => (
            <div
              key={i}
              className="px-4 py-2 rounded-xl bg-slate-900/40 border border-white/10 hover:border-sky-500/50 text-slate-300 hover:text-sky-300 font-mono text-xs transition-all hover:scale-105 backdrop-blur-md cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
