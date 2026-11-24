import React from 'react';
import { INITIAL_EXPERIENCES } from '../data/mockData';
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Career Journey
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Professional & Internship Experience
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Python Engineering • Data Analytics • Web Systems
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-white/10 ml-4 md:ml-32 space-y-12">
          {INITIAL_EXPERIENCES.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 md:pl-12 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-sky-400 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(56,189,248,0.8)]" />

              {/* Period Pill (Desktop Left) */}
              <div className="hidden md:block absolute -left-36 top-1 text-right w-28 font-mono text-xs text-sky-400 font-bold">
                {exp.period}
              </div>

              {/* Experience Card */}
              <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl hover:border-sky-500/40 transition-all space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-white group-hover:text-sky-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-400 pt-1">
                      <Building2 className="w-3.5 h-3.5 text-sky-400" />
                      <span className="text-white font-bold">{exp.company}</span>
                    </div>
                  </div>

                  <div className="md:hidden flex items-center gap-2 font-mono text-xs text-sky-400 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {exp.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
