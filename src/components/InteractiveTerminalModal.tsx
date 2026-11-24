import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { INITIAL_PROJECTS, INITIAL_SKILLS } from '../data/mockData';

interface InteractiveTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTerminalModal: React.FC<InteractiveTerminalModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const [history, setHistory] = useState<string[]>([
    'ANIKET_DATA_CORE Terminal v3.2.0 (x86_64-python3.12-linux)',
    'Type "help" or "workflow" to list commands.',
    '---------------------------------------------------'
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    setInputVal('');
    setHistory((prev) => [...prev, `$ ${cmd}`]);

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      return;
    }

    if (lower === 'help') {
      setHistory((prev) => [
        ...prev,
        'Available commands:',
        '  help       - Show available CLI instructions',
        '  skills     - Render technical skills matrix',
        '  projects   - List current Python & Data Science projects',
        '  bio        - Display developer profile background',
        '  workflow   - Display 8-step data science pipeline',
        '  contact    - Display email & connection handles',
        '  gemini <p> - Query Aniket Badhe AI Data assistant',
        '  clear      - Clear terminal screen'
      ]);
      return;
    }

    if (lower === 'skills') {
      const list = INITIAL_SKILLS.map(s => `  • ${s.name} (${s.level}) - ${s.percentage}%`).join('\n');
      setHistory((prev) => [...prev, 'TECHNICAL SKILLS MATRIX:', list]);
      return;
    }

    if (lower === 'projects') {
      const list = INITIAL_PROJECTS.map(p => `  • [${p.category}] ${p.title} - ${p.description}`).join('\n');
      setHistory((prev) => [...prev, 'PROJECT REPOSITORY:', list]);
      return;
    }

    if (lower === 'workflow') {
      setHistory((prev) => [
        ...prev,
        'DATA SCIENCE PIPELINE:',
        '  01. Data Collection  (Web Scraping / REST APIs / SQL)',
        '  02. Data Cleaning    (Pandas / Missing Imputations)',
        '  03. EDA             (Statistical Distributions / Groupby)',
        '  04. Visualization   (Matplotlib / Seaborn / Tableau)',
        '  05. Feature Eng.    (Scaling / Encodes / RFM)',
        '  06. Model Building  (Scikit-learn Regression & Clustering)',
        '  07. Model Eval      (R2 Score / Silhouette / RMSE)',
        '  08. Deployment      (Flask / Django REST APIs)'
      ]);
      return;
    }

    if (lower === 'bio') {
      setHistory((prev) => [
        ...prev,
        'ANIKET BADHE - Python Developer | Data Science & Data Analytics',
        'Specializing in Python 3, Pandas, NumPy, Scikit-learn, SQL, Flask, Django, Tableau.',
        'Location: Pune, India / Remote'
      ]);
      return;
    }

    if (lower === 'contact') {
      setHistory((prev) => [
        ...prev,
        'Email: aniketbadhe09876@gmail.com',
        'GitHub: github.com/aniketbadhe',
        'LinkedIn: linkedin.com/in/aniketbadhe'
      ]);
      return;
    }

    if (lower.startsWith('gemini ')) {
      const query = cmd.slice(7);
      setIsAiLoading(true);
      setHistory((prev) => [...prev, '[GEMINI_AI] Processing query with Gemini data model...']);

      try {
        const res = await fetch('/api/terminal/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: query })
        });
        const data = await res.json();
        setHistory((prev) => [...prev, `[GEMINI_AI] ${data.reply || 'AI query executed.'}`]);
      } catch (err) {
        setHistory((prev) => [
          ...prev,
          `[GEMINI_AI] Hello! I am Aniket Badhe's AI Data Assistant. Aniket specializes in Python, Data Analytics, Pandas, Scikit-learn, and Web APIs.`
        ]);
      } finally {
        setIsAiLoading(false);
      }
      return;
    }

    setHistory((prev) => [
      ...prev,
      `Command not recognized: "${cmd}". Type "help" for a list of available commands.`
    ]);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-sky-500/30 rounded-2xl shadow-[0_0_50px_rgba(56,189,248,0.25)] overflow-hidden flex flex-col h-[75vh]">
        {/* Terminal Header */}
        <div className="flex justify-between items-center px-5 py-3 bg-slate-900 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="font-mono text-xs text-sky-400 ml-3 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" /> aniketbadhe@data_core:~
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Output */}
        <div className="flex-1 p-5 font-mono text-xs text-sky-400 overflow-y-auto space-y-2 custom-scrollbar bg-slate-950/90">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line}
            </div>
          ))}
          {isAiLoading && (
            <div className="text-sky-300 animate-pulse flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Thinking...
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 px-5 py-3 bg-slate-900 border-t border-white/10">
          <span className="text-sky-400 font-mono text-xs font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command (e.g. 'help', 'skills', 'projects', 'workflow')..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-slate-500"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-colors cursor-pointer"
          >
            Exec
          </button>
        </form>
      </div>
    </div>
  );
};
