
import React from 'react';
import { Target, Award, Users } from 'lucide-react';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 md:py-24 px-4 sm:px-6 bg-podDark">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="relative px-4 sm:px-0 max-w-md mx-auto lg:max-w-none lg:mx-0">
                        <div className="aspect-square rounded-[2rem] md:rounded-[3rem] bg-podDeepPurple border-2 border-white/5 overflow-hidden relative shadow-2xl">
                            <img
                                src="/images/gk.jpeg"
                                alt="Gautham Kamath"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2rem] md:rounded-[3rem]" />
                        </div>
                        {/* Experience Floating Card */}
                        <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 bg-podDeepPurple border border-white/10 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-2xl backdrop-blur-md">
                            <p className="text-3xl md:text-4xl font-bold text-podPurple mb-1">15+</p>
                            <p className="text-[10px] md:text-sm font-medium text-slate-400">Years of IT Training Experience</p>
                        </div>
                    </div>

                    <div className="text-center lg:text-left mt-8 lg:mt-0">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Empowering the Next Generation of <span className="text-podCyan">Cloud Architects.</span></h2>
                        <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed">
                            As a Microsoft Certified Trainer (MCT), I specialize in delivering high-quality training across a broad spectrum of IT technologies. My mission is to empower learners by combining theory with practical, real-world experience.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
                            <div className="p-5 bg-podDeepPurple/50 rounded-2xl border border-white/5 text-left">
                                <Target className="w-8 h-8 text-podCyan mb-4" />
                                <h4 className="font-bold text-white mb-2">Practical Focus</h4>
                                <p className="text-sm text-slate-500">Hands-on guidance for Windows Server installation and management.</p>
                            </div>
                            <div className="p-5 bg-podDeepPurple/50 rounded-2xl border border-white/5 text-left">
                                <Award className="w-8 h-8 text-podGold mb-4" />
                                <h4 className="font-bold text-white mb-2">Certification Success</h4>
                                <p className="text-sm text-slate-500">Specialized tracks for AZ-900, AZ-104, and AZ-400 certification mastery.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-podPurple/5 border border-podPurple/10 text-left">
                            <Users className="text-podPurple w-8 h-8 md:w-10 md:h-10 shrink-0" />
                            <div>
                                <p className="text-white font-bold text-sm md:text-base">Trusted by Thousands</p>
                                <p className="text-slate-500 text-xs md:text-sm">Helping professionals from freshers to senior engineers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
