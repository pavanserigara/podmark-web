
import React from 'react';
import { TRAINING_OFFERINGS } from '../constants';
import { ArrowRight, Terminal } from 'lucide-react';

const Training: React.FC = () => {
  return (
    <section id="training" className="py-24 px-6 bg-pod-dark">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Training Portfolio</h2>
          <p className="text-slate-400">Deep-dive technical sessions designed for practical excellence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRAINING_OFFERINGS.map((course, idx) => (
            <div key={idx} className="bg-pod-deep-purple/20 p-8 rounded-3xl border border-white/5 hover:border-pod-purple/20 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-pod-dark border border-white/10 flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-pod-cyan" />
                </div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">GK-TR-{idx + 100}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{course.title}</h3>
              <p className="text-slate-400 mb-8 flex-grow">{course.description}</p>
              
              <div className="space-y-3 mb-8">
                {course.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-pod-purple" />
                    {h}
                  </div>
                ))}
              </div>

              <button className="w-full py-4 bg-purple-gradient text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-pod-purple/10 group-hover:shadow-pod-purple/30">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
