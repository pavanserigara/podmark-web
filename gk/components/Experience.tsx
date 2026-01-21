
import React from 'react';
import { EXPERIENCE, IconMap } from '../constants';
import { MapPin, Calendar } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 md:py-32 px-4 sm:px-6 bg-pod-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pod-purple/5 rounded-full blur-[100px] md:blur-[120px] -translate-x-1/2" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 md:mb-6 uppercase tracking-tighter">
            Professional <span className="text-impact">Pedigree.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto px-4">
            Decades of technical excellence, from hardware engineering to specialized training for elite defense and corporate organizations.
          </p>
        </div>

        <div className="relative">
          {/* Central Line - hidden on small mobile, visible on tablet+ */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent lg:-translate-x-1/2 md:block" />

          <div className="space-y-12 md:space-y-20">
            {EXPERIENCE.map((exp, idx) => {
              const Icon = IconMap[exp.icon];
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-6 lg:left-1/2 top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-pod-purple border-2 md:border-4 border-pod-dark shadow-[0_0_15px_rgba(139,92,246,0.8)] z-20 lg:-translate-x-1/2 mt-8 lg:mt-0" />

                  {/* Content Card */}
                  <div className={`w-full lg:w-[45%] pl-16 lg:pl-0 group`}>
                    <div className="relative p-6 md:p-8 bg-pod-deep-purple/30 border border-white/5 rounded-2xl md:rounded-3xl hover:border-pod-purple/30 transition-all duration-500 backdrop-blur-sm">
                      <div className="absolute -top-3 md:-top-4 right-4 md:right-8 px-3 py-1 bg-pod-dark border border-white/10 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-pod-cyan shadow-xl">
                        {exp.company === "Self-employed" ? "Veteran Status" : "Enterprise Role"}
                      </div>

                      <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-8">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6 bg-pod-dark border border-white/10`}>
                          {Icon && <Icon className={`w-6 h-6 md:w-7 md:h-7 text-white`} />}
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-pod-cyan transition-colors">{exp.title}</h3>
                          <p className="text-pod-purple font-bold text-base md:text-lg mb-2">{exp.company}</p>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {exp.period}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-400 leading-relaxed mb-6 md:mb-8 text-xs md:text-sm italic">
                        "{exp.description}"
                      </p>

                      <div className="flex flex-wrap gap-2 pt-4 md:pt-6 border-t border-white/5">
                        {exp.skills.map(skill => (
                          <span key={skill} className="px-2 py-0.5 md:px-3 md:py-1 bg-white/5 text-slate-300 text-[8px] md:text-[10px] font-bold rounded-lg border border-white/5">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop spacing helpers */}
                  <div className="hidden lg:block w-[10%]" />
                  <div className="hidden lg:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
