import React from 'react';
import { INITIAL_EDUCATION } from '../data/mockData';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 relative bg-slate-950/40">
      <div className="max-w-[1280px] mx-auto px-6 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Academic Background
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Education & Academic Degrees
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Computer Applications • Data Science & Software Engineering Foundations
          </p>
        </div>

        {/* Degrees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_EDUCATION.map((edu) => (
            <div
              key={edu.id}
              className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-sky-500/40 transition-all space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <span className="font-mono text-xs text-sky-400 font-bold bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
                  {edu.period}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-2xl text-white group-hover:text-sky-300 transition-colors">
                  {edu.degree}
                </h3>
                <p className="font-mono text-xs text-slate-300 font-semibold">{edu.institution}</p>
                <p className="font-mono text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" /> {edu.location}
                </p>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed pt-2 border-t border-white/5">
                {edu.details}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
