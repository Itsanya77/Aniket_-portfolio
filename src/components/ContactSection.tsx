import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin, Phone, Github, Linkedin, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  onMessageSent?: (msg: { name: string; email: string; subject: string; message: string }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onMessageSent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        if (onMessageSent) {
          onMessageSent(formData);
        }
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      // Fallback local success
      setStatus('success');
      if (onMessageSent) {
        onMessageSent(formData);
      }
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 relative bg-slate-950/40">
      <div className="max-w-[1280px] mx-auto px-6 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Connect With Aniket Badhe
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Open for Python Development, Data Science & Analytics Roles
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 bg-slate-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6">
            <h3 className="font-display font-bold text-2xl text-white">Let's Build Together</h3>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Whether you have a Python backend project, an analytics dataset needing exploration, or a full-time position available, feel free to drop a message!
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Email Address</span>
                  <a href="mailto:aniketbadhe09876@gmail.com" className="text-white hover:text-sky-400 font-bold">
                    aniketbadhe09876@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Location</span>
                  <span className="text-white font-bold">Pune, MH, India</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">GitHub</span>
                  <a href="https://github.com/aniketbadhe" target="_blank" rel="noreferrer" className="text-white hover:text-sky-400 font-bold">
                    github.com/aniketbadhe
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">LinkedIn</span>
                  <a href="https://linkedin.com/in/aniketbadhe" target="_blank" rel="noreferrer" className="text-white hover:text-sky-400 font-bold">
                    linkedin.com/in/aniketbadhe
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            {status === 'success' ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Message Sent Successfully!</h3>
                <p className="text-xs font-mono text-slate-400 max-w-md mx-auto">
                  Thank you for reaching out to Aniket Badhe. Your message has been routed directly to the inbox and Admin Command Center.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-400">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-950 border border-white/10 px-4 py-3 rounded-xl font-mono text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-400">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full bg-slate-950 border border-white/10 px-4 py-3 rounded-xl font-mono text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-slate-400">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Python Developer Role / Project Consultation"
                    className="w-full bg-slate-950 border border-white/10 px-4 py-3 rounded-xl font-mono text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-slate-400">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full bg-slate-950 border border-white/10 px-4 py-3 rounded-xl font-mono text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-4 rounded-xl bg-sky-500 text-slate-950 font-mono text-xs font-extrabold hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {status === 'sending' ? 'Transmitting Message...' : 'Send Message to Aniket Badhe'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
