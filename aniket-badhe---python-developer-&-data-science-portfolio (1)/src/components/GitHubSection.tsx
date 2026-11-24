import React from 'react';
import { Github, GitBranch, Star, GitFork, ExternalLink, Code2, Terminal } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  const repos = [
    {
      name: 'customer-segmentation-rfm',
      desc: 'Python K-Means Clustering and Recency-Frequency-Monetary (RFM) analysis pipeline on retail datasets.',
      lang: 'Python',
      stars: 24,
      forks: 8,
      url: 'https://github.com/aniketbadhe/customer-segmentation-rfm'
    },
    {
      name: 'sales-prediction-flask',
      desc: 'Scikit-Learn Random Forest regression model wrapped in a Flask REST API microservice.',
      lang: 'Python',
      stars: 19,
      forks: 5,
      url: 'https://github.com/aniketbadhe/sales-prediction-flask'
    },
    {
      name: 'covid19-data-analytics',
      desc: 'Exploratory Data Analysis (EDA) on time-series health metrics paired with Tableau dashboard visualizers.',
      lang: 'Python',
      stars: 15,
      forks: 4,
      url: 'https://github.com/aniketbadhe/covid19-data-analytics'
    },
    {
      name: 'django-student-portal',
      desc: 'Full-stack Django web app with SQLite database for student grade management and analytics.',
      lang: 'Python',
      stars: 12,
      forks: 3,
      url: 'https://github.com/aniketbadhe/django-student-portal'
    }
  ];

  return (
    <section id="github" className="py-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Open Source & Repositories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            GitHub Developer Activity
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Public Repositories • Python Packages • Code Contributions
          </p>
        </div>

        {/* GitHub Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-1 text-center">
            <Github className="w-8 h-8 text-sky-400 mx-auto mb-2" />
            <span className="font-display font-extrabold text-3xl text-white block">18+</span>
            <span className="font-mono text-xs text-slate-400">Public Repositories</span>
          </div>

          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-1 text-center">
            <GitBranch className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
            <span className="font-display font-extrabold text-3xl text-indigo-400 block">450+</span>
            <span className="font-mono text-xs text-slate-400">Yearly Commits</span>
          </div>

          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-1 text-center">
            <Star className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <span className="font-display font-extrabold text-3xl text-amber-400 block">62</span>
            <span className="font-mono text-xs text-slate-400">Stars Earned</span>
          </div>

          <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-1 text-center">
            <Code2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <span className="font-display font-extrabold text-3xl text-emerald-400 block">65%</span>
            <span className="font-mono text-xs text-slate-400">Python Codebase</span>
          </div>
        </div>

        {/* Language Ratio Progress Bar */}
        <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl space-y-3">
          <div className="flex justify-between items-center font-mono text-xs text-slate-400">
            <span>Primary Code Languages Breakdown</span>
            <a
              href="https://github.com/aniketbadhe"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:underline flex items-center gap-1"
            >
              github.com/aniketbadhe <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex border border-white/5">
            <div className="h-full bg-sky-500 w-[65%]" title="Python 65%" />
            <div className="h-full bg-indigo-500 w-[15%]" title="SQL 15%" />
            <div className="h-full bg-amber-500 w-[10%]" title="JavaScript 10%" />
            <div className="h-full bg-emerald-500 w-[10%]" title="HTML/CSS 10%" />
          </div>

          <div className="flex flex-wrap gap-6 font-mono text-xs pt-1">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-500" /> Python (65%)</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-500" /> SQL (15%)</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500" /> JavaScript (10%)</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500" /> HTML/CSS (10%)</span>
          </div>
        </div>

        {/* Repositories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-sky-500/40 transition-all space-y-3 group block"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2 text-sky-400 font-mono text-sm font-bold group-hover:underline">
                  <Github className="w-4 h-4 text-white" />
                  <span>{repo.name}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-400 transition-colors" />
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {repo.desc}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-[11px] text-slate-400">
                <span className="text-sky-400 font-bold">● {repo.lang}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> {repo.stars}</span>
                  <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5 text-slate-400" /> {repo.forks}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
