import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { X, ExternalLink, Code, CheckCircle2, Terminal, AlertCircle, Github } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-sky-500/30 rounded-3xl shadow-[0_0_50px_rgba(56,189,248,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <div>
              <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                {project.title}
                <span className="text-xs font-mono font-normal text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                  {project.category}
                </span>
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Python & Data Analytics Solution
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-base text-white">Overview</h4>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Problem Statement */}
          {project.problemStatement && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <span className="font-mono text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Problem Statement
              </span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {project.problemStatement}
              </p>
            </div>
          )}

          {/* Key Features */}
          {project.keyFeatures && (
            <div className="space-y-2">
              <h4 className="font-display font-bold text-base text-white">Key Features</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans">
                {project.keyFeatures.map((kf, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{kf}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-2 gap-4">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-white/10">
                  <span className="font-mono text-[10px] text-slate-400 block">{m.label}</span>
                  <span className="font-mono text-base font-bold text-sky-400">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Technologies */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-slate-400 block uppercase tracking-wider">Technologies Used:</span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-sky-300 font-mono text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/10 bg-slate-900/80 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-sky-500/50 font-mono text-xs transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" /> Code Repository
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 text-white font-mono text-xs hover:bg-white/20 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
