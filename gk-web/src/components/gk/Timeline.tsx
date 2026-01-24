
import React from 'react';
import { TIMELINE } from './constants';

const Timeline: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-podDark/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-20 text-center uppercase tracking-tighter">My Career <span className="text-podPurple">Journey.</span></h2>

        <div className="space-y-12">
          {TIMELINE.map((item, idx) => (
            <div key={idx} className="flex gap-8 group">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-podPurple group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.8)] transition-all" />
                <div className="flex-1 w-px bg-white/10 my-2" />
              </div>
              <div className="pb-12 border-b border-white/5 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-4xl font-black text-white/20 group-hover:text-podPurple/40 transition-colors font-mono">{item.year}</h3>
                <p className="text-xl text-slate-300 font-medium md:text-right">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
