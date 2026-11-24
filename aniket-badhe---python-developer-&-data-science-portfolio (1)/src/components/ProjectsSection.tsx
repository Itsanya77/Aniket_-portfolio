import React, { useState } from 'react';
import { INITIAL_PROJECTS } from '../data/mockData';
import { ProjectCategory, ProjectItem } from '../types';
import { Github, ExternalLink, Sparkles, Search, Code2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'Python',
    'Data Science',
    'Data Analytics',
    'Web Development',
    'Machine Learning'
  ];

  const filteredProjects = INITIAL_PROJECTS.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Portfolio Showcase
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Featured Python & Data Science Projects
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Filterable Project Gallery • Real-World Problem Statements & Solutions
          </p>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tags..."
              className="w-full bg-slate-950 border border-white/10 pl-9 pr-4 py-1.5 rounded-xl font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900/40 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-sky-500/50 transition-all space-y-4 group flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden border-b border-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-slate-950/80 border border-sky-500/40 text-sky-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                  {project.category}
                </span>

                {project.featured && (
                  <span className="absolute top-3 right-3 bg-amber-500/90 text-slate-950 font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                    FEATURED
                  </span>
                )}
              </div>

              {/* Body Content */}
              <div className="p-6 pt-2 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-display font-extrabold text-xl text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {/* Problem Statement Box */}
                  {project.problemStatement && (
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-[11px] font-sans text-slate-400 space-y-1">
                      <span className="font-mono text-[10px] text-amber-400 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Problem Statement
                      </span>
                      <p>{project.problemStatement}</p>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-sky-400 hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                  >
                    View Details →
                  </button>

                  <div className="flex items-center gap-2">
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-sky-500/50 cursor-pointer"
                        title="GitHub Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-slate-950 cursor-pointer transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
