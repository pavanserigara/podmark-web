import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Contact } from './Contact';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
    {
        title: "Strategy & Audit",
        desc: "Deep dive into your current ad performance and identifying gaps."
    },
    {
        title: "Creative Development",
        desc: "Designing high-converting visuals for Meta and compelling copy for Google."
    },
    {
        title: "Campaign Launch",
        desc: " precise targeting setup, bid strategy, and tracking implementation."
    },
    {
        title: "A/B Testing",
        desc: "Continuous testing of creatives, audiences, and landing pages."
    },
    {
        title: "Scale & Optimize",
        desc: "Doubling down on winning strategies to maximize ROI."
    }
];

const ADS_SERVICES = [
    {
        title: "Google Search Ads",
        features: [
            "High-intent keyword targeting",
            "Responsive search ads optimization",
            "Competitor conquesting campaigns"
        ]
    },
    {
        title: "Meta (Facebook/Instagram) Ads",
        features: [
            "Advanced audience retargeting",
            "Creative-first performance marketing",
            "Catalog sales and dynamic ads"
        ]
    },
    {
        title: "Google Shopping / PMax",
        features: [
            "Feed optimization and management",
            "Smart bidding strategies",
            "Cross-channel visibility"
        ]
    },
    {
        title: "Youtube Advertising",
        features: [
            "Brand awareness video campaigns",
            "Direct response video ads",
            "In-stream and discovery ad formats"
        ]
    },
    {
        title: "Display & Remarketing",
        features: [
            "Visual banner ads across the web",
            "Dynamic remarketing for cart abandoners",
            "Brand safety and placement control"
        ]
    },
    {
        title: "Analytics & Tracking",
        features: [
            "Google Analytics 4 (GA4) setup",
            "Meta Pixel and CAPI integration",
            "Custom conversion tracking"
        ]
    }
];

const BUSINESS_BENEFITS = [
    {
        title: "Instant Traffic",
        desc: [
            "Immediate visibility on search",
            "Quick audience reach on social",
            "Fast data accumulation"
        ],
        icon: (
            <svg className="w-10 h-10 text-podPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        title: "Targeted Reach",
        desc: [
            "Demographic and interest precision",
            "Intent-based targeting",
            "Lookalike audience expansion"
        ],
        icon: (
            <svg className="w-10 h-10 text-podPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "Scalable Growth",
        desc: [
            "Predictable revenue streams",
            "Flexible budget management",
            "Market share expansion"
        ],
        icon: (
            <svg className="w-10 h-10 text-podPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        )
    },
    {
        title: "Brand Dominance",
        desc: [
            "Top-of-mind awareness",
            "Cross-platform consistency",
            "Authority in your niche"
        ],
        icon: (
            <svg className="w-10 h-10 text-podPurple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        )
    }
]

export const MetaGoogleAds: React.FC = () => {
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
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.1,
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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] mix-blend-screen opacity-30 animate-pulse"></div>
                </div>

                <div ref={headerRef} className="container mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-podCyan text-[10px] font-black tracking-[0.3em] uppercase mb-6">
                        Paid Media Mastery
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                        META & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-podCyan">
                            GOOGLE ADS
                        </span>
                    </h1>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Capture Demand & Generating Leads
                    </p>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                        We blend the high intent of Google Search with the visual power of Meta to drive comprehensive growth.
                    </p>
                    <div className='flex flex-col md:flex-row gap-6 justify-center'>
                        <a href="#contact" className="inline-block px-10 py-4 blue-gradient text-white font-black tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-lg shadow-blue-500/25">
                            Start Your Campaign
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Brands Choose Us */}
            <section className="py-24 relative bg-black/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Why Our Approach Works</h2>
                        <div className="w-20 h-1 bg-podCyan mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Full-Funnel Strategy",
                                desc: "Connecting Awareness (Meta) with Intent (Google) for maximum impact."
                            },
                            {
                                title: "Data-Driven Creative",
                                desc: "Ads designed not just to look good, but to convert based on performance data."
                            },
                            {
                                title: "Precision Targeting",
                                desc: "Finding your exact ideal customer through advanced audience layering."
                            },
                            {
                                title: "ROI Focused",
                                desc: "Every dollar spent is tracked and optimized for profitable returns."
                            }
                        ].map((item, i) => (
                            <div key={i} className="p-8 border border-white/10 rounded-2xl bg-[#0E0516] hover:border-podCyan/50 transition-all group overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="text-6xl font-black">0{i + 1}</span>
                                </div>
                                <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 text-podCyan group-hover:bg-podCyan group-hover:text-black transition-all duration-300">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

            {/* Our Process - Step Cards */}
            <section className="py-24 bg-[#0E0516] relative overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black tracking-tight mb-4">OUR CAMPAIGN PROCESS</h2>
                        <p className="text-white/50">Systematic Scaling</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {PROCESS_STEPS.map((step, i) => (
                            <div key={i} className="process-step w-full md:w-[calc(33.33%-24px)] p-8 rounded-2xl bg-black border border-white/10 transition-all hover:bg-white/[0.03]">
                                <div className="text-5xl font-black text-podCyan/20 mb-4">0{i + 1}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What is Included */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3">
                            <h2 className="text-4xl font-black tracking-tight mb-6 sticky top-32">
                                COMPREHENSIVE<br />
                                <span className="text-podCyan">AD SERVICES</span>
                            </h2>
                        </div>
                        <div className="md:w-2/3 grid gap-8">
                            {ADS_SERVICES.map((service, i) => (
                                <div key={i} className="p-8 rounded-2xl bg-[#0E0516] border border-white/10 hover:border-podCyan/30 transition-all">
                                    <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-3 text-white/70 text-sm">
                                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-podCyan shrink-0"></span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 text-center bg-gradient-to-br from-black via-black to-podCyan/20">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 max-w-4xl mx-auto leading-tight">
                        READY TO SCALE YOUR REVENUE?
                    </h2>
                    <p className="text-white/60 mb-10 max-w-xl mx-auto">Get a free strategy audit for your Google and Meta ad accounts today.</p>
                    <a href="#contact" className="inline-block px-12 py-5 bg-white text-black font-black tracking-widest uppercase rounded-full hover:scale-105 transition-transform shadow-2xl">
                        Schedule Audit
                    </a>
                </div>
            </section>

            <Contact />
        </main>
    );
};
