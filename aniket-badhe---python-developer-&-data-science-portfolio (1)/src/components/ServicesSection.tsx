import React from 'react';
import { INITIAL_SERVICES } from '../data/mockData';
import { Code2, Server, Layers, Search, Sparkles, BarChart2, Layout, Database, Webhook } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return Code2;
      case 'server': return Server;
      case 'layers': return Layers;
      case 'search-code': return Search;
      case 'sparkles': return Sparkles;
      case 'bar-chart-2': return BarChart2;
      case 'database': return Database;
      case 'webhook': return Webhook;
      default: return Layout;
    }
  };

  return (
    <section id="services" className="py-20 relative bg-slate-950/40">
      <div className="max-w-[1280px] mx-auto px-6 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Service Capabilities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Specialized Development & Analytics Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Custom Python Engineering • Data Pipelines • Web Frameworks
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_SERVICES.map((service) => {
            const Icon = getServiceIcon(service.iconName);
            return (
              <div
                key={service.id}
                className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-sky-500/40 transition-all space-y-4 group hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 w-fit group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {service.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
