
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden bg-transparent">
      {/* Subtle overlays to ensure text pop */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-podDark/60 via-transparent to-podDark/60 pointer-events-none"></div>

      {/* Grid Overlay Pattern - refined */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-10"></div>

      {/* Film strip bands */}
      <div className="absolute top-[15%] left-0 w-full h-12 film-strip opacity-10 z-0"></div>
      <div className="absolute bottom-[15%] left-0 w-full h-12 film-strip opacity-10 z-0"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 text-center animate-fade-in flex-grow flex flex-col justify-center items-center">
        <div className="inline-block mb-10 px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(139,92,246,0.2)] group hover:border-podPurple/50 transition-all duration-700">
          <h3 className="text-sm md:text-lg font-black tracking-[0.5em] uppercase flex items-center gap-4">
            <span className="w-2.5 h-2.5 rounded-full bg-podPurple animate-pulse shadow-[0_0_15px_#8b5cf6]"></span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-podPurple to-podCyan drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
              WE DON'T JUST MARKET
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-podCyan animate-pulse shadow-[0_0_15px_#38BDF8]"></span>
          </h3>
        </div>

        <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white flex flex-col items-center select-none">
          <span>WE CREATE</span>
          <span className="impact-gradient drop-shadow-[0_0_30px_rgba(56,189,248,0.3)]">IMPACT.</span>
        </h1>

        <p className="mt-10 text-white/70 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed font-medium px-4">
          Founded in March 2025, <span className="text-white font-bold text-podPurple">PODMARK</span> is a creative-driven digital powerhouse built on trust and teamwork.
          We partner with elite brands to architect growth through high-impact strategy and cinematic storytelling.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="#services"
            className="group relative px-12 py-5 overflow-hidden rounded-full font-black text-sm tracking-widest transition-all"
          >
            <div className="absolute inset-0 purple-gradient transition-transform group-hover:scale-110"></div>
            <span className="relative z-10 text-white">EXPLORE OUR SERVICES</span>
          </a>
          <a
            href="#contact"
            className="px-12 py-5 border border-podGold/20 text-podGold rounded-full font-black text-sm tracking-widest hover:bg-podGold/10 transition-all backdrop-blur-sm"
          >
            CONTACT US
          </a>
        </div>
      </div>



      {/* Bottom Visual Element */}
      <div className="absolute bottom-12 right-12 flex space-x-4 opacity-30 hidden lg:flex">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`w-10 h-1 rounded-full ${i === 1 ? 'bg-podPurple' : 'bg-podPurple/20'}`}></div>
        ))}
      </div>
    </section>
  );
};
