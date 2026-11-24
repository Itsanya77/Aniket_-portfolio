import React, { useState } from 'react';
import { INITIAL_SKILLS } from '../data/mockData';
import { SkillCategory, SkillItem } from '../types';
import { Cpu, Code2, Database, BarChart2, Server, Terminal, Sparkles, Search } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: string[] = [
    'All',
    'Programming',
    'Data Science',
    'Data Analytics',
    'Web Development',
    'Database',
    'Tools'
  ];

  const filteredSkills = INITIAL_SKILLS.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Technical Matrix
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Technical Arsenal & Competencies
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Interactive 3D Skill Cards • Python Ecosystem & Analytical Tooling
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill..."
              className="w-full bg-slate-950 border border-white/10 pl-9 pr-4 py-1.5 rounded-xl font-mono text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
            />
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-sky-500/50 transition-all space-y-4 group hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block">
                    {skill.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/30">
                  {skill.level}
                </span>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed min-h-[36px]">
                {skill.description}
              </p>

              {/* Progress Slider Bar */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span>Proficiency</span>
                  <span className="text-white font-bold">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${skill.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
