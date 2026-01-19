
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// Optimization for mobile performance
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// CSS for hardware acceleration hints
const willChangeStyle = { willChange: 'transform, opacity' };

const SERVICES = [
  {
    title: "Social Media Marketing",
    description: "We help brands grow through strategic content creation and data-driven campaigns designed to increase reach and engagement.",
    features: ["Content Strategy", "Community Management", "Paid Growth", "Analytics"],
    accent: "podPurple",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Real Estate Shoots",
    description: "Professional real estate photography showcasing interiors and architectural spaces with cinematic clarity and broker-ready impact.",
    features: ["Interior Cinema", "Aerial Perspectives", "HDR Processing", "Virtual Tours"],
    accent: "podGold",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Web Design",
    description: "Architecting modern, responsive digital homes that convert visitors into brand advocates through premium UI/UX design.",
    features: ["UI/UX Engineering", "Conversion Optimization", "Brand Identity", "SEO Mastery"],
    accent: "podCyan",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Jewellery Shoots",
    description: "Ultra-high-detail photography that captures the fire and craftsmanship of luxury pieces with precision lighting.",
    features: ["Macro Precision", "Luxury Lighting", "Creative Direction", "Post-Production"],
    accent: "podPurple",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Product Shoots",
    description: "High-end product imagery that highlights every texture. Perfect for high-conversion e-commerce and premium catalogs.",
    features: ["Studio Styling", "E-com Integration", "Detail Focus", "Batch Delivery"],
    accent: "podGold",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Pre & Post Wedding",
    description: "Capturing the raw emotion of your journey through editorial photography and cinematic, mood-driven storytelling.",
    features: ["Editorial Glow", "Cinematic Noir", "Motion Storytelling", "Event Coverage"],
    accent: "podPurple",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Interior Design",
    description: "Transforming physical environments into branded experiences that blend aesthetics with functional dominance.",
    features: ["Space Planning", "Identity Reflection", "3D Rendering", "Material Curation"],
    accent: "podCyan",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Meta & Google Ads",
    description: "Data-driven performance marketing campaigns engineered to maximize ROI and capture market share effectively.",
    features: ["Campaign Architecture", "A/B Testing", "Retargeting Pros", "Performance Reporting"],
    accent: "podGold",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
  }
];

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.service-card') as HTMLElement[];
    const mm = gsap.matchMedia();

    // Desktop Animation (Original - untouched)
    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(cards.length + 1) * 100}%`,
          pin: true,
          scrub: 1,
        }
      });

      // 1. Move Title Up aggressively to clear space for the centered cards
      tl.to(headerRef.current, {
        y: -350,
        opacity: 0,
        scale: 0.85,
        duration: 2,
        ease: "power2.inOut"
      });

      // 2. Initial Card Entrance
      tl.fromTo(cards[0],
        { scale: 0.7, opacity: 0, y: 400 },
        { scale: 1, opacity: 1, y: 0, duration: 2, ease: "power2.out" },
        "-=1.5"
      );

      // 3. Stacking logic
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          const cardImg = card.querySelector('.service-img');
          const nextCardImg = nextCard.querySelector('.service-img');

          // Current card fades out & moves slightly
          tl.to(card, {
            opacity: 0,
            y: -40, // Slight movement up
            filter: "blur(10px)",
            duration: 1.5,
            ease: "power2.inOut"
          }, "+=0.1");

          // Image Zoom In (Current: 1.1 -> 1.25)
          if (cardImg) {
            tl.to(cardImg, {
              scale: 1.25,
              duration: 1.5,
              ease: "power2.inOut"
            }, "<");
          }

          // Next card Enter
          tl.fromTo(nextCard,
            { opacity: 0, y: 150, filter: "blur(10px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
            "-=1.2"
          );

          // Next Card Image Pre-Zoom (1.0 -> 1.1)
          if (nextCardImg) {
            tl.fromTo(nextCardImg,
              { scale: 1.0 },
              { scale: 1.1, duration: 1.5, ease: "power2.out" }
              , "<");
          }
        }
      });

      tl.to({}, { duration: 0.5 });
    });

    // Mobile Animation (New - 1 Scroll = 1 Card)
    mm.add("(max-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          pin: true,
          scrub: 0.3, // Faster, more responsive scrub to reduce "lag" feeling
        }
      });

      // 1. Fade out header - Giving it standalone time
      tl.to(headerRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.5, // Slower fade out to appreciate title
        ease: "power1.out"
      });

      // 2. Initial Card Entrance - Starts HIDDEN so title is alone
      tl.fromTo(cards[0],
        { opacity: 0, scale: 0.9, y: 100 }, // Start hidden
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5, // Smooth entry
          ease: "power2.out"
        },
        "-=0.2" // Slight overlap with header fade, but mostly after
      );

      // 3. Iterate through cards for simple "slide up and replace" effect
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          const cardImg = card.querySelector('.service-img');
          const nextCardImg = nextCard.querySelector('.service-img');

          // Current card fades out
          tl.to(card, {
            opacity: 0,
            scale: 0.95, // Subtle scale down of container
            duration: 1,
            ease: "power1.inOut"
          });

          // Image Zoom In (Current: 1.1 -> 1.25)
          if (cardImg) {
            tl.to(cardImg, {
              scale: 1.25,
              duration: 1,
              ease: "power1.inOut"
            }, "<");
          }

          // Next card enters
          tl.fromTo(nextCard,
            { opacity: 0, y: 50, scale: 1 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
            "<"
          );

          // Next Card Image Pre-Zoom (1.0 -> 1.1)
          if (nextCardImg) {
            tl.fromTo(nextCardImg,
              { scale: 1.0 },
              { scale: 1.1, duration: 1, ease: "power2.out" },
              "<"
            );
          }
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative h-screen bg-podDark overflow-hidden flex items-center justify-center">
      {/* Background Visuals */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none"></div>

      <div className="absolute inset-0 z-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <div className="animate-marquee whitespace-nowrap flex gap-20 -rotate-3 translate-y-32">
          <span className="text-[30rem] font-black tracking-tighter text-white uppercase leading-none">PODMARK PODMARK PODMARK PODMARK</span>
        </div>
      </div>

      {/* Intro Header - Positioned with top offset for spacing */}
      <div
        ref={headerRef}
        className="absolute top-[5%] md:top-[12%] z-50 w-full max-w-6xl px-6 text-center flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
          <div className="w-8 md:w-16 h-px bg-podGold/40"></div>
          <span className="text-[9px] md:text-[11px] font-black tracking-[0.6em] uppercase text-podGold">Premier Arsenal</span>
          <div className="w-8 md:w-16 h-px bg-podGold/40"></div>
        </div>
        <h2 className="text-5xl md:text-[110px] lg:text-[130px] font-black tracking-tighter text-white mb-6 md:mb-8 leading-[0.8] select-none uppercase">
          ELITE <span className="text-podGold drop-shadow-[0_0_30px_rgba(189,153,112,0.3)]">SERVICES.</span>
        </h2>
        <p className="text-white/40 text-[9px] md:text-sm font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase max-w-xl md:max-w-2xl mx-auto border-t border-white/5 pt-6 md:pt-8">
          Defined by excellence. Architects of digital dominance and visual prestige.
        </p>
      </div>

      {/* Cards Stack Container - Centered Vertically and Horizontally */}
      <div
        ref={cardsContainerRef}
        className="absolute inset-0 z-10 w-full flex items-end pb-16 md:pb-0 md:items-center justify-center px-4 md:px-6"
      >
        <div className="relative w-full max-w-5xl h-[480px] md:h-[450px] lg:h-[500px] flex items-center justify-center">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="service-card absolute w-full h-full bg-[#12071d] rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/10 shadow-[0_60px_160px_-40px_rgba(0,0,0,1)] flex flex-col lg:flex-row-reverse overflow-hidden group"
              style={{
                zIndex: 10 + index,
                opacity: index === 0 ? 1 : 0,
                ...willChangeStyle
              }}
            >
              {/* Internal Accent Border */}
              <div className="absolute inset-3 md:inset-4 rounded-[1.3rem] md:rounded-[1.8rem] lg:rounded-[2.3rem] border border-white/5 pointer-events-none z-30"></div>

              {/* Image Section - Top on mobile, Right on desktop */}
              <div className="w-full lg:w-[45%] h-[180px] md:h-[200px] lg:h-full relative overflow-hidden shrink-0">
                <img
                  src={service.image}
                  srcSet={`${service.image.replace('w=1000', 'w=600')} 600w, ${service.image} 1000w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                  alt={service.title}
                  className={`service-img w-full h-full object-cover ${service.title === "Jewellery Shoots" ? "grayscale" : ""}`}
                />


                <div className="absolute inset-0 bg-gradient-to-t from-podDark to-transparent lg:hidden"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-podDark to-transparent hidden lg:block"></div>

                <div className="absolute top-6 left-6 lg:left-auto lg:right-10 z-40">
                  <div className={`px-5 py-2 rounded-full border border-white/20 backdrop-blur-xl text-[9px] font-black uppercase tracking-widest text-white shadow-xl`}>
                    0{index + 1} / STRATEGY
                  </div>
                </div>
              </div>

              {/* Content Section - Bottom on mobile, Left on desktop */}
              <div className="w-full lg:w-[55%] p-5 md:p-8 lg:p-10 flex flex-col justify-center relative z-20 bg-podDark lg:bg-transparent">
                <div className="flex items-center gap-4 mb-4 md:mb-8">
                  <div className={`w-10 h-[2px] ${service.accent === 'podPurple' ? 'bg-podPurple' : service.accent === 'podCyan' ? 'bg-podCyan' : 'bg-podGold'}`}></div>
                  <span className={`font-black text-[9px] md:text-[11px] tracking-[0.5em] uppercase ${service.accent === 'podPurple' ? 'text-podPurple' : service.accent === 'podCyan' ? 'text-podCyan' : 'text-podGold'}`}>
                    {service.accent === 'podPurple' ? 'CREATIVE' : service.accent === 'podCyan' ? 'DIGITAL' : 'PREMIUM'} ARSENAL
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tighter text-white mb-2 md:mb-4 leading-[0.9] lg:leading-[0.8] uppercase">
                  {service.title}
                </h3>

                <p className="text-white/60 text-[10px] md:text-sm lg:text-base mb-4 md:mb-6 leading-relaxed font-medium max-w-lg">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 md:gap-3 mb-5 md:mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-[10px] md:text-sm lg:text-[16px] font-bold tracking-tight text-white/90 group cursor-default">
                      <div className={`w-1.5 h-1.5 rounded-full mr-3 md:mr-6 transition-transform hover:scale-150 ${service.accent === 'podPurple' ? 'bg-podPurple shadow-[0_0_15px_rgba(139,92,246,0.6)]' : service.accent === 'podCyan' ? 'bg-podCyan shadow-[0_0_15px_rgba(56,189,248,0.6)]' : 'bg-podGold shadow-[0_0_15px_rgba(189,153,112,0.6)]'}`}></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-auto lg:mt-0">
                  <a href="#contact" className="group inline-flex items-center gap-6 text-podGold text-[10px] md:text-[13px] font-black tracking-[0.6em] uppercase transition-all hover:gap-10">
                    GET STARTED
                    <span className="text-2xl md:text-4xl group-hover:translate-x-4 transition-transform leading-none">→</span>
                  </a>
                </div>
              </div>

              {/* Subtle Lighting corner */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
