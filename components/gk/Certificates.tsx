
import React from 'react';
import { DETAILED_CERTIFICATIONS } from './constants';
import { Award, CheckCircle2, BookOpen } from 'lucide-react';

const Certificates: React.FC = () => {
    return (
        <section id="certificates" className="py-20 md:py-28 px-4 sm:px-6 bg-podDark relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-podPurple/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-8 w-1.5 bg-podGold rounded-full" />
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                                Technical <span className="text-podGold">Certifications.</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-lg max-w-2xl">
                            A comprehensive record of professional certifications across Microsoft stack, IT service management, and core networking.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DETAILED_CERTIFICATIONS.map((cert) => (
                        <div
                            key={cert.id}
                            className="group p-8 bg-podDeepPurple/20 border border-white/5 rounded-[2.5rem] hover:border-podGold/30 transition-all duration-500 hover:translate-y-[-4px] backdrop-blur-sm shadow-xl flex flex-col h-full"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-4 bg-podDark rounded-2xl border border-white/10 group-hover:bg-podGold/10 group-hover:border-podGold/20 transition-colors">
                                    <Award className="w-8 h-8 text-podGold" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-white/5">
                                    {cert.category}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-podGold transition-colors">
                                {cert.name}
                            </h3>

                            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                                {cert.description || `Issuer: ${cert.issuer}`}
                            </p>

                            {cert.modules && cert.modules.length > 0 && (
                                <div className="mt-auto pt-6 border-t border-white/5 space-y-3">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                                        <BookOpen className="w-3 h-3" /> Exam Modules
                                    </div>
                                    <ul className="space-y-2.5">
                                        {cert.modules.map((module, mIdx) => (
                                            <li key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-400 hover:text-slate-200 transition-colors">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-podGold/60 shrink-0 mt-0.5" />
                                                <span>{module}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
