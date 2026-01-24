
import React from 'react';
import { SERVICES, IconMap } from './constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 bg-podDark relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-podPurple/10 rounded-full blur-[100px] -mr-48 -mt-48" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Professional Services</h2>
            <p className="text-slate-400">Beyond just training, I offer strategic consulting and organizational development coaching to elevate your IT infrastructure.</p>
          </div>
          <a href="#contact" className="text-podCyan font-bold flex items-center gap-2 hover:gap-3 transition-all">
            See all services <span>&rarr;</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const IconComponent = IconMap[service.icon];
            return (
              <div
                key={service.id}
                className="group p-8 bg-podDeepPurple/30 border border-white/5 rounded-3xl hover:bg-podDeepPurple/60 transition-all cursor-default"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-podPurple transition-colors">
                  {IconComponent && <IconComponent className="w-6 h-6 text-white" />}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-400">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
