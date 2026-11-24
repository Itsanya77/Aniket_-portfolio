import React from 'react';
import { X, Printer, Download, Mail, MapPin, Globe, Github, Linkedin, Award, GraduationCap } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-sky-500/30 rounded-2xl shadow-[0_0_50px_rgba(56,189,248,0.25)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <h3 className="font-display font-bold text-xl text-white">
              Aniket Badhe — Curriculum Vitae
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div className="p-8 overflow-y-auto space-y-8 bg-slate-950 text-slate-200 print:bg-white print:text-black custom-scrollbar">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-6 print:border-black/20">
            <h1 className="text-4xl font-display font-extrabold text-white print:text-black">ANIKET BADHE</h1>
            <h2 className="text-lg font-mono text-sky-400 font-bold print:text-black mt-1">
              Python Developer | Data Science & Data Analytics
            </h2>

            <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono text-slate-400 print:text-black/80">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-sky-400" /> aniketbadhe09876@gmail.com</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-sky-400" /> Pune, MH, India</span>
              <span className="flex items-center gap-1"><Github className="w-3.5 h-3.5 text-sky-400" /> github.com/aniketbadhe</span>
              <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5 text-sky-400" /> linkedin.com/in/aniketbadhe</span>
            </div>
          </div>

          {/* Professional Tagline & Summary */}
          <div>
            <h3 className="text-xs font-mono text-sky-400 font-bold uppercase tracking-widest mb-2 print:text-black">
              Professional Summary
            </h3>
            <p className="text-sm leading-relaxed text-slate-300 print:text-black font-sans">
              Dynamic and detail-oriented <strong className="text-white print:text-black">Python Developer & Data Analytics Specialist</strong> passionate about building intelligent software applications, cleaning complex datasets, and transforming raw information into actionable business insights. Experienced with <strong className="text-sky-400 print:text-black">Python, Pandas, NumPy, Scikit-learn, SQL, Flask, Django, and Tableau</strong>.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-mono text-sky-400 font-bold uppercase tracking-widest mb-4 print:text-black">
              Professional & Internship Experience
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-base text-white print:text-black">Python & Data Analytics Developer Intern — Tech Analytics Solutions</h4>
                  <span className="text-xs font-mono text-sky-300 print:text-black">2025 – PRESENT</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 print:text-black/90 mt-2 space-y-1 font-sans">
                  <li>Developed automated Python ETL scripts using Pandas & SQLAlchemy to process and clean 100K+ daily data records.</li>
                  <li>Created interactive Tableau dashboards and Matplotlib graphs for executive performance reviews.</li>
                  <li>Built Flask REST API endpoints to serve data insights directly to web interfaces.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-base text-white print:text-black">Data Science & Web Development Apprentice — DataMetrics Labs</h4>
                  <span className="text-xs font-mono text-sky-300 print:text-black">2024 – 2025</span>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-300 print:text-black/90 mt-2 space-y-1 font-sans">
                  <li>Implemented Scikit-learn Machine Learning regression models for sales forecasting with an R² accuracy of 0.91.</li>
                  <li>Designed and optimized SQLite database schemas for Django web applications.</li>
                  <li>Performed Exploratory Data Analysis (EDA) on time-series datasets to discover revenue trends.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono text-sky-400 font-bold uppercase tracking-widest mb-3 print:text-black">
              Education
            </h3>
            <div className="space-y-3 font-sans text-xs">
              <div>
                <div className="flex justify-between font-bold text-sm text-white print:text-black">
                  <span>MCA (Master of Computer Applications)</span>
                  <span className="font-mono text-sky-400 print:text-black text-xs">2023 – 2025</span>
                </div>
                <span className="text-slate-400 print:text-black/80">Savitribai Phule Pune University (SPPU) — Specialization in Data Science & Machine Learning</span>
              </div>
              <div>
                <div className="flex justify-between font-bold text-sm text-white print:text-black">
                  <span>BCA (Bachelor of Computer Applications)</span>
                  <span className="font-mono text-sky-400 print:text-black text-xs">2020 – 2023</span>
                </div>
                <span className="text-slate-400 print:text-black/80">Savitribai Phule Pune University (SPPU) — First Class Distinction</span>
              </div>
            </div>
          </div>

          {/* Core Technical Stack */}
          <div>
            <h3 className="text-xs font-mono text-sky-400 font-bold uppercase tracking-widest mb-3 print:text-black">
              Technical Arsenal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 print:border-black/20 print:bg-gray-100">
                <span className="font-bold text-sky-400 print:text-black block mb-1">Programming & Web:</span>
                Python 3, Java, JavaScript, Flask, Django, REST API, HTML5/CSS3
              </div>
              <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 print:border-black/20 print:bg-gray-100">
                <span className="font-bold text-sky-400 print:text-black block mb-1">Data Science & Analytics:</span>
                Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Tableau, SQL, Excel, EDA
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
