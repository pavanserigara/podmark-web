
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Contact } from './Contact';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
    {
        title: "Creative Brief & Strategy",
        desc: "We analyze your brand, target audience, and product usage to define the visual direction."
    },
    {
        title: "Set Styling & Prop Sourcing",
        desc: "Curating textures, backgrounds, and props that complement your product without overpowering it."
    },
    {
        title: "Studio Production",
        desc: "Professional lighting techniques to highlight textures, materials, and key features."
    },
    {
        title: "Post-Production Polish",
        desc: "Color grading, retouching, and formatting for web, print, and social media."
    }
];

const WHAT_WE_OFFER = [
    {
        title: "E-Commerce White Background",
        desc: "Clean, high-resolution images that meet Amazon and Shopify standards.",
        icon: (
            <svg className="w-10 h-10 text-podGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        )
    },
    {
        title: "Creative Still Life",
        desc: "Artistic compositions using props and lighting to tell a brand story.",
        icon: (
            <svg className="w-10 h-10 text-podGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "Lifestyle & In-Use",
        desc: "Showing your product in action to help customers visualize it in their lives.",
        icon: (
            <svg className="w-10 h-10 text-podGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "Stop Motion Animations",
        desc: "Fun, engaging short videos that bring inanimate objects to life.",
        icon: (
            <svg className="w-10 h-10 text-podGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        title: "360° Spins",
        desc: "Interactive rotating views for a complete digital product experience.",
        icon: (
            <svg className="w-10 h-10 text-podGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        )
    },
    {
        title: "Infographic Overlays",
        desc: "Highlighting key features and specs directly on the product image.",
        icon: (
            <svg className="w-10 h-10 text-podGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    }
]

export const ProductShoots: React.FC = () => {
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-podGold/20 rounded-full blur-[150px] mix-blend-screen opacity-30 animate-pulse"></div>
                </div>

                <div ref={headerRef} className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-podGold text-[10px] font-black tracking-[0.3em] uppercase mb-6">
                        Concept to Conversion
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                        PRODUCT <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-podGold to-yellow-500">
                            PHOTOGRAPHY
                        </span>
                    </h1>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Visuals That Make People Click "Buy"
                    </p>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                        Elevate your brand with studio-quality imagery designed for e-commerce, catalogs, and social impact.
                    </p>
                    <div className='flex flex-col md:flex-row gap-6 justify-center'>
                        <a href="#contact" className="inline-block px-10 py-4 bg-podGold text-black font-black tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-lg shadow-podGold/25">
                            Get a Quote
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 relative bg-black/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Why Choose Us</h2>
                        <div className="w-20 h-1 bg-podGold mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Conversion Focused",
                                desc: "We understand visual sales psychology—angles and lighting that trigger desire."
                            },
                            {
                                title: "Brand Consistency",
                                desc: "Maintaining a cohesive look across your entire SKU lineup."
                            },
                            {
                                title: "Styling Expertise",
                                desc: "Professional propping and arrangement to create aspirational scenes."
                            },
                            {
                                title: "Multi-Platform Ready",
                                desc: "Files optimized for Amazon, Instagram, Website, and Print."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 border border-white/10 rounded-3xl bg-[#0E0516] hover:border-podGold/50 transition-all group overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="text-6xl font-black">0{i + 1}</span>
                                </div>
                                <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 text-podGold group-hover:bg-podGold group-hover:text-black transition-all duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
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
                        <p className="text-white/50">From Brief to Launch</p>
                    </div>

                    <div className="relative max-w-4xl mx-auto space-y-8">
                        {/* Connecting Line (Dotted) */}
                        <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-px border-l-2 border-dashed border-white/10 md:-translate-x-1/2 h-full z-0"></div>

                        {PROCESS_STEPS.map((step, i) => (
                            <div key={i} className={`process-step relative flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Content Card */}
                                <div className="ml-16 md:ml-0 md:w-1/2 md:px-12 text-left md:text-right w-full">
                                    <div className={`p-8 rounded-2xl bg-black border border-white/10 hover:border-podGold/30 transition-all z-10 relative ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                        <h3 className="text-xl font-bold text-podGold mb-2">{step.title}</h3>
                                        <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>

                                {/* Center Marker */}
                                <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#0E0516] border-4 border-black flex items-center justify-center z-10 shadow-lg shadow-black">
                                    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-xs font-bold text-podGold border border-podGold/30">
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
                        <p className="text-white/50">Commercial Photography Solutions</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {WHAT_WE_OFFER.map((item, i) => (
                            <div key={i} className="flex gap-6 p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:-translate-y-2 transition-all duration-300 group">
                                <div className="shrink-0">
                                    <div className="w-16 h-16 rounded-2xl bg-[#0E0516] border border-white/10 flex items-center justify-center text-podGold group-hover:bg-podGold/10 transition-colors">
                                        {item.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black mb-2 text-white group-hover:text-podGold transition-colors">{item.title}</h3>
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
                        READY TO ELEVATE <br /> YOUR PRODUCTS?
                    </h2>
                    <a href="#contact" className="inline-block px-12 py-5 bg-gradient-to-r from-podGold to-yellow-600 text-black font-black tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-2xl">
                        Start Project
                    </a>
                </div>
            </section>

            <Contact />
        </main>
    );
};
