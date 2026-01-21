
import React from 'react';
import {
  ChevronRight, ShieldCheck, Terminal as TerminalIcon, Sparkles,
  Cloud, Server, Cpu, Shield, Layers, Zap, Monitor, Network
} from 'lucide-react';
import { RUNNING_SERVICES } from './constants';

const Hero: React.FC = () => {
  const marqueeIcons = [Cloud, Server, Cpu, Shield, Layers, Zap, Monitor, Network];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl pointer-events-none opacity-30 md:opacity-40">
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-podPurple/20 rounded-full blur-[100px] md:blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-podCyan/10 rounded-full blur-[100px] md:blur-[150px]" />
      </div>

      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8 md:gap-12 z-10 mb-24 md:mb-20">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-podPurple/10 border border-podPurple/20 text-podPurple text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 md:mb-8">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
            Microsoft Certified Trainer
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 md:mb-8 leading-[1.1] md:leading-[1.05]">
            Architecting <br className="hidden sm:block" />
            <span className="text-impact">
              Future Systems.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-slate-400 max-w-2xl mb-8 md:mb-12 leading-relaxed font-light mx-auto lg:mx-0">
            Gautham Kamath — empowering global IT teams with deep expertise in
            <span className="text-white font-medium"> Azure, Windows Server 2022, VMware</span> and <span className="text-podCyan font-medium">Gen AI</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center">
            <a href="#training" className="w-full sm:w-auto group px-8 md:px-10 py-4 md:py-5 bg-purple-gradient text-white rounded-2xl font-black text-base md:text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]">
              Start Training
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#projects" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-podDeepPurple/50 hover:bg-podDeepPurple backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold text-base md:text-lg transition-all hover:scale-105 text-center">
              View Work
            </a>
          </div>
        </div>

        {/* Console / Code Snippet Visual */}
        <div className="flex-1 hidden lg:block w-full max-w-lg">
          <div className="bg-[#0b1120] rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm group">
            <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-podGold/50" />
                <div className="w-3 h-3 rounded-full bg-podCyan/50" />
              </div>
              <span className="text-slate-500 text-xs">gautham_kamath --expert</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <span className="text-podPurple">$</span>
                <span className="text-slate-300">fetch --profile "Gautham Kamath"</span>
              </div>
              <div className="pl-6 text-slate-400 border-l border-podPurple/20 space-y-1">
                <p><span className="text-podCyan">Role:</span> Microsoft Certified Trainer (MCT)</p>
                <p><span className="text-podCyan">Core:</span> Azure, Windows Server 03-22</p>
                <p><span className="text-podCyan">Focus:</span> Hybrid Cloud & Virtualization</p>
                <p><span className="text-podCyan">GenAI:</span> LLM Deployment on Azure</p>
              </div>
              <div className="flex gap-3">
                <span className="text-podPurple">$</span>
                <span className="text-slate-300 animate-pulse text-podPurple">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Running Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 py-4 md:py-6 backdrop-blur-xl z-20 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...RUNNING_SERVICES, ...RUNNING_SERVICES].map((service, i) => {
            const Icon = marqueeIcons[i % marqueeIcons.length];
            return (
              <div key={i} className="flex items-center gap-3 md:gap-5 mx-6 md:mx-10">
                <Icon className="w-4 h-4 md:w-5 md:h-5 text-podPurple opacity-60" />
                <span className="text-sm md:text-lg font-black text-white/40 uppercase tracking-widest">{service}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Icons for Tech Vibe */}
      <div className="absolute top-20 right-10 animate-bounce [animation-duration:5s] opacity-10 md:opacity-20 pointer-events-none">
        <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-podCyan" />
      </div>
    </section>
  );
};

export default Hero;
