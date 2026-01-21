
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setHistory(prev => [...prev, { role: 'user', parts: userMsg }]);
    setIsLoading(true);

    const response = await geminiService.sendMessage(
      history.map(m => ({ role: m.role, parts: [{ text: m.parts }] })), 
      userMsg
    );

    setHistory(prev => [...prev, { role: 'model', parts: response || 'No response' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100]">
      {isOpen ? (
        <div className="bg-pod-dark border border-white/10 w-[calc(100vw-32px)] sm:w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] sm:h-[600px] animate-in slide-in-from-bottom-4 zoom-in-95">
          <div className="p-4 bg-purple-gradient flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">GK's AI Agent</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-pod-cyan rounded-full animate-pulse" />
                  <p className="text-[10px] text-white/70">Online & Ready</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-pod-deep-purple">
            {history.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-400 text-sm italic">Hi! I'm Gautham's AI agent. Ask me anything about his Azure courses or IT training expertise!</p>
              </div>
            )}
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-pod-purple text-white rounded-tr-none shadow-lg' : 'bg-pod-deep-purple/60 text-slate-200 rounded-tl-none'}`}>
                  {msg.parts}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-pod-deep-purple/60 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-pod-purple rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-pod-purple rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-pod-purple rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-pod-dark border-t border-white/5">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..." 
                className="flex-1 bg-pod-deep-purple/40 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pod-purple transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="p-2.5 bg-purple-gradient text-white rounded-xl disabled:opacity-50 transition-all shadow-md active:scale-90"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="p-3.5 md:p-4 bg-purple-gradient text-white rounded-2xl shadow-xl flex items-center gap-3 transition-all hover:scale-110 active:scale-95 group"
          aria-label="Open AI Assistant"
        >
          <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold text-sm">
            Chat with GK's AI
          </span>
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
