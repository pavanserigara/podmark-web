
import React, { useEffect } from 'react';
import Hero from './gk/Hero';
import Clients from './gk/Clients';
import About from './gk/About';
import Expertise from './gk/Expertise';
import Experience from './gk/Experience';
import Certificates from './gk/Certificates';
import Services from './gk/Services';
import ProjectGallery from './gk/ProjectGallery';
import Training from './gk/Training';
import ContactGK from './gk/Contact';
import MatrixBackground from './gk/MatrixBackground';

export const GKPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative min-h-screen bg-podDark">
            <MatrixBackground />
            <main className="relative z-10 pt-20">
                <Hero />
                <div id="about">
                    <About />
                </div>
                <div id="expertise">
                    <Expertise />
                </div>
                <div id="experience">
                    <Experience />
                </div>
                <div id="certificates">
                    <Certificates />
                </div>
                <Clients />

                <ProjectGallery />
                <div id="services">
                    <Services />
                </div>
                <div id="training">
                    <Training />
                </div>
                <div id="contact">
                    <ContactGK />
                </div>
            </main>

            {/* Visual grain overlay for texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
        </div>
    );
};
