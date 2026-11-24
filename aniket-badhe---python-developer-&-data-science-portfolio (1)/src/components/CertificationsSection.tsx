import React from 'react';
import { INITIAL_CERTIFICATIONS } from '../data/mockData';
import { Award, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-[1280px] mx-auto px-6 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Verified Credentials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Professional Certifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Industry-Recognized Python, Data Analytics & SQL Credentials
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {INITIAL_CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl hover:border-sky-500/40 transition-all space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group flex flex-col justify-between"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-sky-400">{cert.issuer}</p>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 shrink-0 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {cert.status}
                </span>
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-between items-center font-mono text-xs text-slate-400">
                <span>Credential ID: <strong className="text-slate-200">{cert.credentialId}</strong></span>
                <span>Issued: <strong className="text-slate-200">{cert.issueDate}</strong></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
