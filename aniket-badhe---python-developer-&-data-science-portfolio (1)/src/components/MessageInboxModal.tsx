import React, { useState } from 'react';
import { MessageItem } from '../types';
import { X, Mail, Star, Trash2, Reply, Send, Check } from 'lucide-react';

interface MessageInboxModalProps {
  messages: MessageItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MessageInboxModal: React.FC<MessageInboxModalProps> = ({
  messages,
  isOpen,
  onClose,
  onMarkRead,
  onDelete
}) => {
  if (!isOpen) return null;

  const [selectedMsg, setSelectedMsg] = useState<MessageItem | null>(messages[0] || null);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  const handleSelect = (msg: MessageItem) => {
    setSelectedMsg(msg);
    if (!msg.read) {
      onMarkRead(msg.id);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplySent(true);
    setTimeout(() => {
      setReplyText('');
      setReplySent(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-slate-950 border border-sky-500/30 rounded-2xl shadow-[0_0_50px_rgba(56,189,248,0.25)] overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-900">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-sky-400" />
            <h3 className="font-display font-bold text-xl text-white">
              DevPortal Communications Inbox
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Master Detail */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Message List */}
          <div className="md:col-span-5 border-r border-white/10 overflow-y-auto bg-slate-950 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-slate-400">
                No messages in inbox.
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${
                    selectedMsg?.id === msg.id
                      ? 'bg-sky-500/10 border-l-4 border-l-sky-400'
                      : msg.read
                      ? 'hover:bg-white/5 opacity-80'
                      : 'bg-slate-900 font-bold text-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-mono text-sky-400 truncate max-w-[180px]">
                      {msg.sender}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                  </div>
                  <h5 className="text-xs font-semibold text-white truncate mb-1">{msg.subject}</h5>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{msg.preview}</p>
                </div>
              ))
            )}
          </div>

          {/* Message Detail View */}
          <div className="md:col-span-7 p-6 overflow-y-auto flex flex-col justify-between custom-scrollbar bg-slate-950">
            {selectedMsg ? (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b border-white/10 pb-4">
                    <div>
                      <h4 className="font-display font-bold text-lg text-white">
                        {selectedMsg.subject}
                      </h4>
                      <p className="text-xs font-mono text-sky-300">
                        From: {selectedMsg.sender} &lt;{selectedMsg.email}&gt;
                      </p>
                    </div>
                    <button
                      onClick={() => onDelete(selectedMsg.id)}
                      className="p-2 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/60 p-6 rounded-xl border border-white/5">
                    {selectedMsg.body}
                  </div>
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="space-y-3 pt-4 border-t border-white/10">
                  <div className="text-xs font-mono text-sky-400 flex items-center gap-1.5">
                    <Reply className="w-3.5 h-3.5" /> Direct Reply
                  </div>
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type message response..."
                    className="w-full bg-slate-900/60 border border-white/10 p-3 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                  <div className="flex justify-between items-center">
                    {replySent && (
                      <span className="text-xs font-mono text-sky-400 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Reply transmitted!
                      </span>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-5 py-2 rounded-lg bg-sky-500 text-slate-950 font-mono text-xs font-bold hover:bg-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Send Reply
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-xs font-mono text-slate-400">
                Select a message to display content.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
