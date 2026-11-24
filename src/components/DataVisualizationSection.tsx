import React, { useState } from 'react';
import { SAMPLE_VISUALIZATIONS_DATA } from '../data/mockData';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart 
} from 'recharts';
import { BarChart3, TrendingUp, PieChart as PieIcon, Layers, Sparkles, Filter } from 'lucide-react';

export const DataVisualizationSection: React.FC = () => {
  const [chartType, setChartType] = useState<'sales' | 'accuracy' | 'distribution'>('sales');

  return (
    <section id="data-vis" className="py-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Visual Analytics
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Data Visualization Showcase
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Interactive Analytical Charts • Matplotlib, Seaborn & Tableau Aesthetics
          </p>
        </div>

        {/* Chart Selector Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setChartType('sales')}
            className={`px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 cursor-pointer transition-all ${
              chartType === 'sales'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                : 'bg-slate-900/40 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Revenue & Profit Analysis
          </button>

          <button
            onClick={() => setChartType('accuracy')}
            className={`px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 cursor-pointer transition-all ${
              chartType === 'accuracy'
                ? 'bg-indigo-500 text-white font-bold shadow-[0_0_15px_rgba(129,140,248,0.4)]'
                : 'bg-slate-900/40 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Machine Learning Model Curve
          </button>

          <button
            onClick={() => setChartType('distribution')}
            className={`px-4 py-2 rounded-xl font-mono text-xs flex items-center gap-2 cursor-pointer transition-all ${
              chartType === 'distribution'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                : 'bg-slate-900/40 border border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <PieIcon className="w-4 h-4" /> Domain Allocation Breakdown
          </button>
        </div>

        {/* Main Chart Card */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-white">
                {chartType === 'sales' && 'Monthly Retail Sales Revenue & Net Profit ($)'}
                {chartType === 'accuracy' && 'Scikit-Learn Epoch Training vs Validation Accuracy Score'}
                {chartType === 'distribution' && 'Project Workload Allocation Across Skill Domains'}
              </h3>
              <p className="text-xs font-mono text-slate-400">
                {chartType === 'sales' && 'Sample Pandas & Seaborn aggregated dataset visualization'}
                {chartType === 'accuracy' && 'Cross-validated hyperparameter tuning progress'}
                {chartType === 'distribution' && 'Relative percentage of development solutions'}
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Recharts Engine
            </div>
          </div>

          {/* Chart Rendering Frame */}
          <div className="h-[360px] w-full min-h-[360px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              {chartType === 'sales' ? (
                <AreaChart data={SAMPLE_VISUALIZATIONS_DATA.monthlySales}>
                  <defs>
                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="sales" name="Sales ($)" stroke="#38bdf8" fillOpacity={1} fill="url(#salesGrad)" />
                  <Area type="monotone" dataKey="profit" name="Net Profit ($)" stroke="#818cf8" fillOpacity={1} fill="url(#profitGrad)" />
                </AreaChart>
              ) : chartType === 'accuracy' ? (
                <LineChart data={SAMPLE_VISUALIZATIONS_DATA.modelPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="epoch" stroke="#94a3b8" fontSize={12} />
                  <YAxis domain={[0.5, 1.0]} stroke="#94a3b8" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="trainAcc" name="Training Accuracy" stroke="#38bdf8" strokeWidth={3} dot={{ r: 6 }} />
                  <Line type="monotone" dataKey="valAcc" name="Validation Accuracy" stroke="#34d399" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              ) : (
                <PieChart>
                  <Pie
                    data={SAMPLE_VISUALIZATIONS_DATA.categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {SAMPLE_VISUALIZATIONS_DATA.categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
};
