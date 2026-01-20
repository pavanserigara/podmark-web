
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Contact } from './Contact';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
    {
        title: "Social Audit & Goal Alignment",
        desc: "We review your current presence, understand your audience, and align on objectives."
    },
    {
        title: "Platform Planning & Strategy",
        desc: "We craft channel-specific calendars with content buckets, creative themes, and posting schedules."
    },
    {
        title: "Content Production",
        desc: "Designs, captions, reels, hashtags, stories—we handle the end-to-end content pipeline."
    },
    {
        title: "Publishing & Community Management",
        desc: "We schedule, post, and engage with your followers to keep the momentum alive."
    },
    {
        title: "Analytics & Optimization",
        desc: "Monthly performance reviews with insights on reach, engagement, follower growth, and what's next."
    }
];

const WHAT_WE_OFFER = [
    {
        title: "Content Calendar & Strategy",
        desc: "Monthly plans tailored to brand goals, seasonal trends, and audience behavior.",
        icon: (
            <svg className="w-10 h-10 text-podCyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Visual Graphics & Video Content Creation",
        desc: "Branded graphics, reels, and story formats that stand out in crowded feeds.",
        icon: (
            <svg className="w-10 h-10 text-podCyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Caption Writing & Hashtag Research",
        desc: "Engaging copy with strategic hashtags to boost visibility and interaction.",
        icon: (
            <svg className="w-10 h-10 text-podCyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
        )
    },
    {
        title: "Page Management",
        desc: "End-to-end management of posting schedules, comments, DMs, and performance in your instagram page.",
        icon: (
            <svg className="w-10 h-10 text-podCyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        )
    },
    {
        title: "Paid Campaigns &  Boosting",
        desc: "Boosting top-performing posts, running platform ads, and tracking ROI.",
        icon: (
            <svg className="w-10 h-10 text-podCyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        )
    },
    {
        title: "Reporting & Insights",
        desc: "Clear monthly reports with data that matters—reach, engagement, followers, and growth.",
        icon: (
            <svg className="w-10 h-10 text-podCyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    }
]

export const SocialMedia: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);

        const tl = gsap.timeline();

        tl.fromTo(headerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
        );

        // Process Timeline Animation
        const steps = gsap.utils.toArray('.process-step');
        steps.forEach((step: any, i) => {
            // For social media steps, let's use a stagger effect
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
            {/* Social Hero */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-podCyan/20 rounded-full blur-[150px] mix-blend-screen opacity-30 animate-pulse"></div>
                </div>

                <div ref={headerRef} className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-podCyan text-[10px] font-black tracking-[0.3em] uppercase mb-6">
                        Social Growth
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                        SOCIAL MEDIA <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-podCyan to-blue-500">
                            MARKETING
                        </span>
                    </h1>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-6">
                        That Builds Engagement & Trust
                    </p>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                        Grow your brand, engage your audience, and drive action across top platforms.
                    </p>
                    <div className='flex flex-col md:flex-row gap-6 justify-center'>
                        <a
                            href="https://wa.me/918105575795?text=I%27m%20interested%20in%20Social%20Media%20Marketing%20services."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-10 py-4 bg-podCyan text-black font-black tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-lg shadow-podCyan/25"
                        >
                            Get My Social Strategy
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 relative bg-black/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Why Choose Us</h2>
                        <div className="w-20 h-1 bg-podCyan mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Platform-Specific Strategy",
                                desc: "What works on Instagram won't work on Linkedin-we tailor plans for each audience and algorithm."
                            },
                            {
                                title: "Content That Connects",
                                desc: "Visuals, captions, reels, and carousels crafted to drive shares, saves, and conversions."
                            },
                            {
                                title: "Performance-Driven Approach",
                                desc: "Every post is tracked. We optimize based on insights-not assumptions."
                            },
                            {
                                title: "Collaborative Execution",
                                desc: "We sync with your internal team for approvals, brand voice, and campaign timing."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 border border-white/10 rounded-3xl bg-[#0E0516] hover:border-podCyan/50 transition-all group overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="text-6xl font-black">0{i + 1}</span>
                                </div>
                                <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 text-podCyan group-hover:bg-podCyan group-hover:text-black transition-all duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                        <p className="text-white/50">Strategy to Engagement</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto space-y-8">
                        {/* Connecting Line (Dotted) */}
                        <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-px border-l-2 border-dashed border-white/10 md:-translate-x-1/2 h-full z-0"></div>

                        {PROCESS_STEPS.map((step, i) => (
                            <div key={i} className={`process-step relative flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Content Card */}
                                <div className="ml-16 md:ml-0 md:w-1/2 md:px-12 text-left md:text-right w-full">
                                    <div className={`p-8 rounded-2xl bg-black border border-white/10 hover:border-podCyan/30 transition-all z-10 relative ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <h3 className="text-xl font-bold text-podCyan mb-2">{step.title}</h3>
                                        <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>

                                {/* Center Marker */}
                                <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#0E0516] border-4 border-black flex items-center justify-center z-10 shadow-lg shadow-black">
                                    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-xs font-bold text-podCyan border border-podCyan/30">
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
                        <h2 className="text-4xl font-black tracking-tight mb-4">WHAT WE OFFER</h2>
                        <p className="text-white/50">Full-Stack Social Solutions</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {WHAT_WE_OFFER.map((item, i) => (
                            <div key={i} className="flex gap-6 p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-300 group">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-[#0E0516] border border-white/10 flex items-center justify-center text-podCyan group-hover:bg-podCyan/10 transition-colors">
                                        {item.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black mb-2 text-white group-hover:text-podCyan transition-colors">{item.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platforms We Dominate */}
            <section className="py-20 bg-white/5 relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-sm font-black tracking-[0.2em] uppercase text-white/40 mb-12">Platforms We Dominate</h3>
                    <div className="flex flex-wrap justify-center items-end gap-12 md:gap-24">
                        {/* Instagram */}
                        <div className="flex flex-col items-center gap-4 group/icon opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                            <div className="text-white group-hover/icon:text-[#E4405F] transition-colors duration-500">
                                <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover/icon:text-white transition-colors">Instagram</span>
                        </div>

                        {/* Facebook */}
                        <div className="flex flex-col items-center gap-4 group/icon opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                            <div className="text-white group-hover/icon:text-[#1877F2] transition-colors duration-500">
                                <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover/icon:text-white transition-colors">Facebook</span>
                        </div>

                        {/* LinkedIn */}
                        <div className="flex flex-col items-center gap-4 group/icon opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                            <div className="text-white group-hover/icon:text-[#0A66C2] transition-colors duration-500">
                                <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover/icon:text-white transition-colors">LinkedIn</span>
                        </div>

                        {/* Google Business */}
                        <div className="flex flex-col items-center gap-4 group/icon opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                            <div className="text-white group-hover/icon:opacity-100 transition-opacity duration-500">
                                <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24">
                                    <path d="M12.48 10.92v3.28h4.78c-.19 1.01-.71 1.86-1.57 2.45v2.13h2.54c1.49-1.37 2.35-3.39 2.35-5.77 0-.54-.05-1.07-.15-1.58H12.48z" fill="#4285F4" />
                                    <path d="M12.48 21c2.43 0 4.47-.81 5.96-2.18l-2.54-2.13c-.71.48-1.62.76-2.54.76-1.94 0-3.59-1.31-4.17-3.07H6.55v2.22c1.35 2.68 4.13 4.42 7.18 4.42z" fill="#34A853" />
                                    <path d="M8.31 14.38c-.15-.45-.24-.93-.24-1.42s.09-.97.24-1.42V9.32H6.55c-.5 1.01-.79 2.14-.79 3.32s.29 2.31.79 3.32l1.76-1.58z" fill="#FBBC05" />
                                    <path d="M12.48 7.37c1.32 0 2.51.45 3.44 1.35l2.58-2.58C16.95 4.67 14.91 3.75 12.48 3.75 9.43 3.75 6.65 5.49 5.3 8.17l2.22 2.22c.58-1.76 2.23-3.02 4.96-3.02z" fill="#EA4335" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover/icon:text-white transition-colors">Google Business</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 max-w-4xl mx-auto leading-tight">
                        READY TO GROW YOUR <br /> SOCIAL BRAND?
                    </h2>
                    <a
                        href="https://wa.me/918105575795?text=I%27m%20interested%20in%20Social%20Media%20Marketing%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-12 py-5 purple-gradient text-white font-black tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-2xl"
                    >
                        Start Your Campaign
                    </a>
                </div>
            </section>

            <Contact />
        </main>
    );
};
