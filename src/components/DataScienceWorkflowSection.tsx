import React, { useState } from 'react';
import { DATA_SCIENCE_WORKFLOW_STEPS } from '../data/mockData';
import { Database, Sparkles, Search, BarChart2, Sliders, Brain, CheckCircle2, Rocket, ArrowRight, ChevronRight } from 'lucide-react';

export const DataScienceWorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'database': return Database;
      case 'sparkles': return Sparkles;
      case 'search-code': return Search;
      case 'bar-chart-2': return BarChart2;
      case 'sliders': return Sliders;
      case 'brain': return Brain;
      case 'check-circle-2': return CheckCircle2;
      case 'rocket': return Rocket;
      default: return Database;
    }
  };

  const currentStepData = DATA_SCIENCE_WORKFLOW_STEPS.find((s) => s.step === activeStep) || DATA_SCIENCE_WORKFLOW_STEPS[0];
  const CurrentIcon = getStepIcon(currentStepData.icon);

  return (
    <section id="workflow" className="py-20 relative bg-slate-950/40">
      <div className="max-w-[1280px] mx-auto px-6 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Pipeline Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Data Science & Analytics Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Interactive Step-by-Step Data Mining & Engineering Lifecycle
          </p>
        </div>

        {/* Steps Ribbon Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {DATA_SCIENCE_WORKFLOW_STEPS.map((s) => {
            const Icon = getStepIcon(s.icon);
            const isActive = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                  isActive
                    ? 'bg-sky-500/20 border-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-105'
                    : 'bg-slate-900/40 border-white/10 text-slate-400 hover:border-sky-500/30 hover:text-white'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-sky-500 text-slate-950' : 'bg-white/10 text-slate-400'}`}>
                    0{s.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                </div>
                <span className="font-display font-bold text-xs line-clamp-2 leading-tight">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Details Interactive Card */}
        <div className="bg-slate-900/60 border border-sky-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="p-3.5 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400">
                <CurrentIcon className="w-8 h-8" />
              </div>
              <div>
                <span className="font-mono text-xs text-sky-400 font-bold block">
                  STEP 0{currentStepData.step} OF 08
                </span>
                <h3 className="font-display font-extrabold text-2xl text-white">
                  {currentStepData.title}
                </h3>
              </div>
            </div>

            <p className="text-base text-slate-300 leading-relaxed font-sans">
              {currentStepData.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
                Key Technologies & Techniques:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentStepData.techs.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-sky-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-white/10 font-mono text-xs space-y-4">
            <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-white/10">
              <span>Pipeline Stage</span>
              <span className="text-emerald-400 font-bold">● Active Process</span>
            </div>
            
            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500">Inputs:</span>
                <span>Raw Data / Features</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transformation:</span>
                <span>Python Engine</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Output Quality:</span>
                <span className="text-sky-400 font-bold">100% Validated</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 text-slate-300 cursor-pointer"
              >
                Previous
              </button>
              <button
                disabled={activeStep === 8}
                onClick={() => setActiveStep((prev) => Math.min(8, prev + 1))}
                className="px-4 py-1.5 rounded-lg bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 disabled:opacity-40 cursor-pointer flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
