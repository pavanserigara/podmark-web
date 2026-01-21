
import React from 'react';
import { CERTIFICATIONS } from '../constants';
import { CheckCircle2, ShieldCheck, Server, Cloud, Cpu, Layout, Globe, Zap } from 'lucide-react';

const Expertise: React.FC = () => {
  const categories = [
    { name: 'Azure', icon: <Cloud className="w-6 h-6 text-pod-cyan" /> },
    { name: 'Windows', icon: <Server className="w-6 h-6 text-emerald-500" /> },
    { name: 'M365', icon: <Globe className="w-6 h-6 text-sky-500" /> },
    { name: 'CompTIA', icon: <ShieldCheck className="w-6 h-6 text-pod-gold" /> },
    { name: 'VMware', icon: <Layout className="w-6 h-6 text-pod-purple" /> },
  ];

  return (
    <section id="expertise" className="py-20 md:py-24 px-4 sm:px-6 bg-pod-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:text-center lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">Core Competencies</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Specialized in end-to-end IT infrastructure, from physical hardware to complex cloud architecting and AI integration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map(cat => (
            <div key={cat.name} className="group p-6 md:p-8 bg-pod-deep-purple/30 rounded-[2rem] border border-white/5 hover:border-pod-purple/30 transition-all shadow-xl">
              <div className="flex justify-between items-center mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                  {cat.icon}
                  <h3 className="text-xl md:text-2xl font-bold text-white">{cat.name}</h3>
                </div>
                <span className="px-2 py-1 rounded-md bg-white/5 text-slate-500 text-[9px] md:text-[10px] font-mono uppercase font-bold">Expert</span>
              </div>
              <ul className="space-y-3 md:space-y-4">
                {CERTIFICATIONS.filter(cert => cert.category === cat.name).map(cert => (
                  <li key={cert.id} className="flex items-start gap-3 text-slate-400 group-hover:text-slate-200 transition-colors">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-pod-purple shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm font-medium leading-tight">{cert.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* AI Feature Box - Highlighted uniquely */}
          <div className="group p-6 md:p-8 bg-gradient-to-br from-pod-deep-purple via-pod-dark to-pod-dark rounded-[2rem] border border-pod-cyan/20 hover:border-pod-cyan/50 transition-all flex flex-col justify-center text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4">
               <Zap className="text-pod-cyan w-4 h-4 md:w-5 md:h-5 animate-pulse" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-pod-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border border-pod-cyan/20 group-hover:scale-110 transition-transform">
              <span className="text-3xl md:text-4xl">🧠</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4 uppercase tracking-tighter">Generative AI</h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Pioneer in delivering <span className="text-pod-cyan font-bold">Azure OpenAI</span> and <span className="text-pod-cyan font-bold">AI-900</span> training. Implementing LLM solutions for modern enterprise infrastructure.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
               <span className="px-2 py-1 rounded bg-pod-cyan/10 text-pod-cyan text-[8px] md:text-[10px] font-bold uppercase">LLMs</span>
               <span className="px-2 py-1 rounded bg-pod-cyan/10 text-pod-cyan text-[8px] md:text-[10px] font-bold uppercase">GPT-4</span>
               <span className="px-2 py-1 rounded bg-pod-cyan/10 text-pod-cyan text-[8px] md:text-[10px] font-bold uppercase">Prompt Eng</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
