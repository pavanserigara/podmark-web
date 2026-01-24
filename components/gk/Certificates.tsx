
import React from 'react';
import { DETAILED_CERTIFICATIONS, CORPORATE_CLIENTS } from './constants';
import { Award, CheckCircle2, BookOpen, Building2 } from 'lucide-react';

const Certificates: React.FC = () => {
    return (
        <section id="certificates" className="py-20 md:py-28 px-4 sm:px-6 bg-podDark relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-podPurple/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-podGold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
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

                {/* Corporate Corporate Training Partners Section */}

                <div className="pt-20 border-t border-white/5">
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="flex items-center gap-3 mb-6">
                            <Building2 className="w-5 h-5 text-podGold" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Corporate Partners</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
                            Trusted by Industry <span className="text-podGold">Leaders.</span>
                        </h2>
                        <p className="text-slate-400 text-sm max-w-xl">
                            Delivering professional-grade training and consultancy for top-tier technology corporations.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {CORPORATE_CLIENTS.map((client, idx) => (
                            <div
                                key={idx}
                                className="group relative aspect-video rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center p-4 transition-all duration-300 hover:bg-white/[0.05] hover:border-podGold/20"
                            >
                                <div className="relative w-full h-12 flex items-center justify-center transition-all duration-500">
                                    <img
                                        src={client.logoPath || `https://logo.clearbit.com/${client.domain}`}
                                        alt={client.name}
                                        className="max-w-full max-h-full object-contain"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const parent = target.parentElement;
                                            if (parent && !parent.querySelector('.fallback')) {
                                                const fallback = document.createElement('span');
                                                fallback.className = 'fallback text-slate-500 font-bold text-sm';
                                                fallback.innerText = client.name;
                                                parent.appendChild(fallback);
                                            }
                                        }}
                                    />
                                </div>
                                <span className="mt-3 text-[9px] font-black uppercase tracking-widest text-slate-600 group-hover:text-podGold transition-colors">
                                    {client.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Logo Marquee Strip */}
                    <div className="mt-20 -mx-4 sm:-mx-6 bg-white/[0.02] border-y border-white/5 py-10 overflow-hidden relative">
                        <div className="flex whitespace-nowrap animate-marquee">
                            {[...CORPORATE_CLIENTS, ...CORPORATE_CLIENTS].map((client, i) => (
                                <div key={i} className="flex flex-col items-center gap-4 mx-6 transition-all duration-300">
                                    <div className="w-16 h-12 flex items-center justify-center">
                                        <img
                                            src={client.logoPath || `https://logo.clearbit.com/${client.domain}`}
                                            alt={client.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{client.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Impact Metrics */}
                    {/* <div className="mt-24 flex flex-wrap justify-center gap-x-12 gap-y-8 pt-12 border-t border-white/5">
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">15+</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-none">Years of<br />Experience</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">500+</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-none">Batches<br />Completed</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">10k+</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-none">Professionals<br />Trained</span>
                        </div>
                    </div> */}
                </div>
            </div>
        </section >
    );
};

export default Certificates;
