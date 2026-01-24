
import React from 'react';
import { PROJECTS, IconMap } from './constants';
import { ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-podDark/50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Real-World <span className="text-podCyan">Deployments.</span></h2>
            <p className="text-slate-400 text-base md:text-xl">I don't just teach theory. I architect and implement high-stakes infrastructure for global organizations.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 min-h-[400px]">
          {PROJECTS.map((project, idx) => {
            const Icon = IconMap[project.icon];
            return (
              <div
                key={project.title}
                className="group relative animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 bg-podPurple rounded-3xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative h-full bg-podDeepPurple/30 border border-white/5 rounded-3xl p-10 hover:border-podPurple/30 transition-all flex flex-col backdrop-blur-sm">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-podPurple transition-all transform group-hover:-rotate-12 shadow-inner">
                    {Icon && <Icon className="w-7 h-7 text-white" />}
                  </div>

                  <span className="text-podCyan font-mono text-xs uppercase tracking-widest mb-2">{project.client}</span>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-podCyan transition-colors">{project.title}</h3>
                  <p className="text-slate-400 leading-relaxed mb-10 flex-grow text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-white/5 text-slate-500 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link || "#"}
                    className="flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-podPurple transition-all group/btn mt-auto"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
