
import React, { useState } from 'react';
import { CORPORATE_CLIENTS } from './constants';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';

const Clients: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    // HP, Dell, Wipro, HCL should come in first order as requested earlier.
    // Featured partners for the 3-2-1 matrix (6 total)
    const featured = CORPORATE_CLIENTS.slice(0, 6);
    const others = CORPORATE_CLIENTS.slice(6);

    return (
        <section id="partners" className="py-24 md:py-32 px-4 sm:px-6 bg-podDark relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-podPurple/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Globe className="w-3.5 h-3.5 text-podCyan animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Industry Giants</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
                        Corporate <span className="text-transparent bg-clip-text bg-gradient-to-r from-podPurple via-white to-podCyan">Trainings.</span>
                    </h2>
                </div>

                {/* 3-2-1 Matrix Layout */}
                <div className="flex flex-col items-center gap-6 md:gap-8 mb-12">
                    {/* Row 1: 3 Partners (2 cols on mobile, 3 on desktop) */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-5xl">
                        {featured.slice(0, 3).map((client, idx) => (
                            <PartnerTile key={client.name} client={client} index={idx} />
                        ))}
                    </div>

                    {/* Row 2: 2 Partners (2 cols on mobile and desktop) */}
                    <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-3xl">
                        {featured.slice(3, 5).map((client, idx) => (
                            <PartnerTile key={client.name} client={client} index={idx + 3} />
                        ))}
                    </div>

                    {/* Row 3: 1 Partner (1 col on all screens) */}
                    <div className="grid grid-cols-1 gap-4 md:gap-8 w-full max-w-sm">
                        {featured.slice(5, 6).map((client, idx) => (
                            <PartnerTile key={client.name} client={client} index={idx + 5} />
                        ))}
                    </div>
                </div>

                {/* Others shown only when expanded */}
                {isExpanded && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-12 animate-[fadeInUp_0.6s_ease-out_forwards]">
                        {others.map((client, idx) => (
                            <PartnerTile key={client.name} client={client} index={idx + 6} isSmall />
                        ))}
                    </div>
                )}

                {/* View All Button */}
                <div className="flex justify-center mt-16 pb-12">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300 backdrop-blur-sm"
                    >
                        <span className="text-sm font-black uppercase tracking-widest text-slate-300 group-hover:text-white">
                            {isExpanded ? 'Show Less' : 'View All Partners'}
                        </span>
                        {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-podCyan group-hover:-translate-y-1 transition-transform" />
                        ) : (
                            <ChevronDown className="w-4 h-4 text-podCyan group-hover:translate-y-1 transition-transform" />
                        )}
                    </button>
                </div>

                {/* Impact Metrics */}
                <div className="mt-12 flex flex-wrap justify-center gap-x-12 gap-y-6 pt-12 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-white">15+</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Years of<br />Experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-white">500+</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Batches<br />Completed</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-white">10k+</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Professionals<br />Trained</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

const PartnerTile: React.FC<{ client: any; index: number; isSmall?: boolean }> = ({ client, index, isSmall }) => {
    return (
        <div
            className={`group relative ${isSmall ? 'h-32 md:h-40' : 'h-40 md:h-48'} rounded-[2.5rem] bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center p-6 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.02] animate-[fadeInUp_0.6s_ease-out_forwards]`}
            style={{
                animationDelay: `${index * 50}ms`,
                opacity: 0
            }}
        >
            <div className={`relative ${isSmall ? 'w-16 h-16 md:w-20 md:h-20' : 'w-20 h-20 md:w-24 md:h-24'} bg-white rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-500 group-hover:rotate-3 group-hover:scale-110`}>
                <img
                    src={client.logoPath || `https://logo.clearbit.com/${client.domain}`}
                    alt={client.name}
                    className={`w-full h-full object-contain ${client.logoPath ? 'p-2' : 'p-4'} transition-transform duration-500`}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes('clearbit')) {
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.fallback-initial')) {
                                const fallback = document.createElement('div');
                                fallback.className = 'fallback-initial flex items-center justify-center w-full h-full bg-white';
                                fallback.innerHTML = `<span class="text-2xl font-black text-podDark">${client.name[0]}</span>`;
                                parent.appendChild(fallback);
                            }
                        }
                    }}
                />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-black/5" />
            </div>
            <span className={`mt-5 text-[10px] ${isSmall ? 'md:text-[10px]' : 'md:text-xs'} font-black text-slate-500 group-hover:text-podCyan uppercase tracking-[0.2em] transition-colors duration-300`}>
                {client.name}
            </span>
            <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-podCyan/20 rounded-full group-hover:bg-podCyan group-hover:animate-ping transition-colors" />
        </div>
    );
};

export default Clients;
