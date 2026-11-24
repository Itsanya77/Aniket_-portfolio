import React from 'react';
import { INITIAL_ACHIEVEMENTS } from '../data/mockData';
import { Trophy, Medal, Star, Sparkles } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-20 relative bg-slate-950/40">
      <div className="max-w-[1280px] mx-auto px-6 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Recognitions & Honors
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Key Achievements & Awards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Hackathons • Data Science Competitions • Open Source Contributions
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-amber-500/40 transition-all space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                  <Trophy className="w-7 h-7" />
                </div>
                <span className="font-mono text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  {ach.date}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
                  {ach.title}
                </h3>
                <p className="font-mono text-xs text-slate-400">{ach.issuer}</p>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed pt-2 border-t border-white/5">
                {ach.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
