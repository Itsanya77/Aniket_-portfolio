import React from 'react';
import { PROFILE_IMAGE } from '../data/mockData';
import { Code2, Database, BarChart2, Brain, Sparkles, Server, CheckCircle2, Terminal } from 'lucide-react';

interface AboutSectionProps {
  profileImage?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  profileImage = PROFILE_IMAGE
}) => {
  const highlightPoints = [
    {
      title: 'Python Development',
      desc: 'Building clean, modular, object-oriented Python code for backend microservices, automation scripts, and custom tools.',
      icon: Code2
    },
    {
      title: 'Data Science & Machine Learning',
      desc: 'Applying statistical modeling, feature engineering, and predictive algorithms using NumPy, Pandas, and Scikit-learn.',
      icon: Brain
    },
    {
      title: 'Data Analytics & Visualization',
      desc: 'Cleaning messy raw datasets, conducting Exploratory Data Analysis (EDA), and crafting interactive dashboards in Tableau and Seaborn.',
      icon: BarChart2
    },
    {
      title: 'Database Development',
      desc: 'Designing relational database schemas, complex SQL query aggregations, window functions, and ORM integrations in SQLite and MySQL.',
      icon: Database
    },
    {
      title: 'Flask & Django Web Development',
      desc: 'Developing scalable REST APIs, authentication portals, and data-driven web applications.',
      icon: Server
    },
    {
      title: 'Problem Solving & Continuous Learning',
      desc: 'Deconstructing complex business challenges into structured technical workflows and continuously mastering emerging technologies.',
      icon: Sparkles
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            About My Profile
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Transforming Complex Data Into Meaningful Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Python Developer • Data Science & Analytics Enthusiast • Full Stack Web Engineer
          </p>
        </div>

        {/* Bio & Focus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Bio Card */}
          <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={profileImage}
                alt="Aniket Badhe"
                className="w-16 h-16 rounded-2xl object-cover border border-sky-400/50"
              />
              <div>
                <h3 className="font-display font-bold text-xl text-white">Aniket Badhe</h3>
                <p className="text-xs font-mono text-sky-400">Python & Data Analytics Specialist</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              I am a passionate <strong className="text-white">Python Developer</strong> and <strong className="text-sky-400">Data Science & Data Analytics enthusiast</strong> dedicated to constructing intelligent software applications and extracting actionable insights from data.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              With deep expertise in the Python data ecosystem—including <strong className="text-white">Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, SQL, Flask, and Django</strong>—I bridge the gap between backend engineering and analytical visualization.
            </p>

            <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Primary Language:</span>
                <span className="text-sky-400 font-bold">Python 3.x</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Core Focus:</span>
                <span className="text-white font-bold">Data Analytics & Web Backend</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-slate-300">Pune / San Francisco</span>
              </div>
            </div>
          </div>

          {/* Right Core Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlightPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 hover:border-sky-500/40 transition-colors space-y-3 backdrop-blur-md group"
                >
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 w-fit group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-base text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
