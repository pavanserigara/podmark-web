
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Contact } from './Contact';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
    {
        title: "Story Session",
        desc: "We meet to understand your journey, style, and what makes your bond unique."
    },
    {
        title: "Location Scouting",
        desc: "Finding the perfect backdrop—whether it's an urban rooftop, a quiet beach, or a lush forest."
    },
    {
        title: "The Shoot",
        desc: "Directed yet candid. We guide you into natural poses that capture genuine emotion."
    },
    {
        title: "Cinematic Editing",
        desc: "Color grading that enhances the mood, from airy elegance to dramatic noir."
    }
];

const WHAT_WE_OFFER = [
    {
        title: "Pre-Wedding Shoots",
        desc: "Casual, romantic sessions to celebrate your engagement and get comfortable before the big day.",
        icon: (
            <svg className="w-10 h-10 text-podPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )
    },
    {
        title: "Post-Wedding Editorial",
        desc: "High-fashion, magazine-style portraits where you can rock your wedding outfits without the rush.",
        icon: (
            <svg className="w-10 h-10 text-podPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )
    },
    {
        title: "Cinematic Films",
        desc: "Short, storytelling films set to music that capture the motion and emotion of your love.",
        icon: (
            <svg className="w-10 h-10 text-podPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Save The Date",
        desc: "Creative visuals designed specifically for your digital and printed invitations.",
        icon: (
            <svg className="w-10 h-10 text-podPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Drone Cinematography",
        desc: "Epic aerial shots that place your love story in a breathtaking landscape.",
        icon: (
            <svg className="w-10 h-10 text-podPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        )
    },
    {
        title: "Proposal Coverage",
        desc: "Secretly capturing the moment they say 'Yes' from a distance.",
        icon: (
            <svg className="w-10 h-10 text-podPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
        )
    }
]

export const WeddingShoots: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const tl = gsap.timeline();

        tl.fromTo(headerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
        );

        const steps = gsap.utils.toArray('.process-step');
        steps.forEach((step: any, i) => {
            gsap.fromTo(step,
                { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: step,
                        start: "top bottom-=100",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

    }, []);

    return (
        <main className="pt-32">
            {/* Hero */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-podPurple/20 rounded-full blur-[150px] mix-blend-screen opacity-30 animate-pulse"></div>
                </div>

                <div ref={headerRef} className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-podPurple text-[10px] font-black tracking-[0.3em] uppercase mb-6">
                        Love in Motion
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                        PRE & POST <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-podPurple to-pink-500">
                            WEDDING SHOOTS
                        </span>
                    </h1>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Timeless Frames. Cinematic Stories.
                    </p>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                        We capture the chemistry, the laughter, and the quiet moments before and after your big day.
                    </p>
                    <div className='flex flex-col md:flex-row gap-6 justify-center'>
                        <a
                            href="https://wa.me/918105575795?text=I%27m%20interested%20in%20Wedding%20Shoots%20services."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-10 py-4 bg-podPurple text-white font-black tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-lg shadow-podPurple/25"
                        >
                            Book Your Shoot
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 relative bg-black/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Why Choose Us</h2>
                        <div className="w-20 h-1 bg-podPurple mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Candid Storytelling",
                                desc: "No stiff poses. We focus on natural interactions and genuine emotions."
                            },
                            {
                                title: "Cinematic Grade",
                                desc: "4K video and high-res photography edited with film-inspired color grading."
                            },
                            {
                                title: "Concept Directors",
                                desc: "We help plan the theme, wardrobe, and location to match your personality."
                            },
                            {
                                title: "Fast Delivery",
                                desc: "Receive your teaser photos within days to share while the feeling is fresh."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 border border-white/10 rounded-3xl bg-[#0E0516] hover:border-podPurple/50 transition-all group overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="text-6xl font-black">0{i + 1}</span>
                                </div>
                                <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 text-podPurple group-hover:bg-podPurple group-hover:text-white transition-all duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-black uppercase mb-3 text-white leading-tight">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed text-xs font-bold">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Our Process - Vertical Timeline */}
            <section className="py-24 bg-[#0E0516] relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black tracking-tight mb-4">OUR PROCESS</h2>
                        <p className="text-white/50">From Concept to Frame</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto space-y-8">
                        {/* Connecting Line (Dotted) */}
                        <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-px border-l-2 border-dashed border-white/10 md:-translate-x-1/2 h-full z-0"></div>

                        {PROCESS_STEPS.map((step, i) => (
                            <div key={i} className={`process-step relative flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Content Card */}
                                <div className="ml-16 md:ml-0 md:w-1/2 md:px-12 text-left md:text-right w-full">
                                    <div className={`p-8 rounded-2xl bg-black border border-white/10 hover:border-podPurple/30 transition-all z-10 relative ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <h3 className="text-xl font-bold text-podPurple mb-2">{step.title}</h3>
                                        <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>

                                {/* Center Marker */}
                                <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#0E0516] border-4 border-black flex items-center justify-center z-10 shadow-lg shadow-black">
                                    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-xs font-bold text-podPurple border border-podPurple/30">
                                        {i + 1}
                                    </div>
                                </div>

                                {/* Spacer */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Offer Grid */}
            <section className="py-24 relative border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tight mb-4">SERVICES</h2>
                        <p className="text-white/50">Capturing Your Journey</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {WHAT_WE_OFFER.map((item, i) => (
                            <div key={i} className="flex gap-6 p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-300 group">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-[#0E0516] border border-white/10 flex items-center justify-center text-podPurple group-hover:bg-podPurple/10 transition-colors">
                                        {item.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black mb-2 text-white group-hover:text-podPurple transition-colors">{item.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 max-w-4xl mx-auto leading-tight">
                        READY TO TELL <br /> YOUR STORY?
                    </h2>
                    <a
                        href="https://wa.me/918105575795?text=I%27m%20interested%20in%20Wedding%20Shoots%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-12 py-5 bg-gradient-to-r from-podPurple to-fuchsia-600 text-white font-black tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-2xl"
                    >
                        Inquire Now
                    </a>
                </div>
            </section>

            <Contact />
        </main>
    );
};
