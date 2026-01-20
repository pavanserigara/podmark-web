
import React from 'react';
import { Hero } from './Hero';
import { About } from './About';
import { Team } from './Team';
import { Careers } from './Careers';
import { Services } from './Services';

import { Contact } from './Contact';

export const Home: React.FC = () => {
    return (
        <main>
            <Hero />

            <Services />

            <About />

            <Team />

            <Careers />

            <div className="h-20"></div>

            <section className="py-20 md:py-40 bg-transparent text-center relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 grid-pattern opacity-5"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
                        LET'S BUILD THE <br />
                        <span className="impact-gradient">FUTURE.</span>
                    </h2>
                    <p className="text-white/50 text-base md:text-lg mb-12 max-w-xl mx-auto">
                        Limited availability for new strategic partnerships. Let's discuss your impact.
                    </p>
                    <a href="#contact" className="inline-block px-14 py-5 purple-gradient text-white text-sm tracking-widest font-black rounded-full hover:scale-105 transition-all shadow-2xl shadow-podPurple/30">
                        START A CONVERSATION
                    </a>
                </div>
            </section>

            <Contact />
        </main>
    );
};
