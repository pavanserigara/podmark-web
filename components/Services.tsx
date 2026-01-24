
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// CSS for hardware acceleration hints
const willChangeStyle = { willChange: 'transform, opacity' };

const SERVICES = [
  {
    title: "Social Media Marketing",
    description: "We help brands grow through strategic content creation and data-driven campaigns designed to increase reach and engagement.",
    features: ["Content Strategy", "Community Management", "Paid Growth", "Analytics"],
    accent: "podPurple",
    category: "MARKETING",
    image: "/images/insta.avif",
    link: "/social-media"
  },
  {
    title: "Web Design",
    description: "Architecting modern, responsive digital homes that convert visitors into brand advocates through premium UI/UX design.",
    features: ["UI/UX Engineering", "Conversion Optimization", "Brand Identity", "SEO Mastery"],
    accent: "podCyan",
    category: "DESIGN",
    image: "/images/Web Design.avif",
    link: "/development"
  },
  {
    title: "Meta & Google Ads",
    description: "Multi-channel performance marketing blending Google's search intent with Meta's visual reach to scale growth.",
    features: ["Full-Funnel Strategy", "Google Search & Shopping", "Meta (FB/IG) Mastery", "ROI-Driven Scaling"],
    accent: "podCyan",
    category: "ADVERTISING",
    image: "/images/Meta & Google Ads.jpg",
    link: "/meta-google-ads"
  },
  {
    title: "Product Shoots",
    description: "High-end product imagery that highlights every texture. Perfect for high-conversion e-commerce and premium catalogs.",
    features: ["Studio Styling", "E-com Integration", "Detail Focus", "Batch Delivery"],
    accent: "podGold",
    category: "VISUAL",
    image: "/images/Product Shoots.avif",
    link: "/product-shoots"
  },
  {
    title: "Real Estate Shoots",
    description: "Professional real estate photography showcasing interiors and architectural spaces with cinematic clarity and broker-ready impact.",
    features: ["Interior Cinema", "Aerial Perspectives", "HDR Processing", "Virtual Tours"],
    accent: "podGold",
    category: "VISUAL",
    image: "/images/Real Estate Shoots.avif",
    link: "/real-estate-shoots"
  },
  {
    title: "Jewellery Shoots",
    description: "Ultra-high-detail photography that captures the fire and craftsmanship of luxury pieces with precision lighting.",
    features: ["Macro Precision", "Luxury Lighting", "Creative Direction", "Post-Production"],
    accent: "podPurple",
    category: "VISUAL",
    image: "/images/Jewellery Shoots.avif",
    link: "/jewellery-shoots"
  },
  {
    title: "Pre & Post Wedding",
    description: "Capturing the raw emotion of your journey through editorial photography and cinematic, mood-driven storytelling.",
    features: ["Editorial Glow", "Cinematic Noir", "Motion Storytelling", "Event Coverage"],
    accent: "podPurple",
    category: "VISUAL",
    image: "/images/wed.avif",
    link: "/wedding-shoots"
  },
  {
    title: "Interior Design",
    description: "Transforming physical environments into branded experiences that blend aesthetics with functional dominance.",
    features: ["Space Planning", "Identity Reflection", "3D Rendering", "Material Curation"],
    accent: "podCyan",
    category: "DESIGN",
    image: "/images/Interior Design.avif",
    link: "/interior-design"
  },
  {
    title: "IT Training & Consultant",
    description: "Empowering next-gen IT professionals with expert-led Microsoft Azure training and strategic infrastructure consulting.",
    features: ["Cloud Architecting", "MCT Certification", "Azure AI/DevOps", "IT Infrastructure"],
    accent: "podPurple",
    category: "IT",
    image: "/images/IT Training & Consultant.png",
    link: "/gk"
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
        autoAlpha: 0,
        scale: 0.85,
        duration: 2,
        ease: "power2.inOut"
      });

      // 2. Initial Card Entrance
      tl.fromTo(cards[0],
        { scale: 0.7, autoAlpha: 0, y: 400 },
        { scale: 1, autoAlpha: 1, y: 0, duration: 2, ease: "power2.out" },
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
            autoAlpha: 0,
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
            { autoAlpha: 0, y: 150, filter: "blur(10px)" },
            { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power2.out" },
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

    // Mobile Animation (Simple fade-in)
    mm.add("(max-width: 768px)", () => {
      cards.forEach((card: any) => {
        gsap.fromTo(card,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative min-h-screen lg:h-screen bg-podDark overflow-x-hidden lg:overflow-hidden flex flex-col items-center py-12 lg:py-0 lg:justify-center">
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
        className="relative md:absolute md:top-[12%] z-50 w-full max-w-6xl px-6 text-center flex flex-col items-center justify-center pointer-events-none mb-16 md:mb-0"
      >
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-4">
          <div className="w-8 md:w-16 h-px bg-podGold/40"></div>
          <span className="text-[9px] md:text-[11px] font-black tracking-[0.6em] uppercase text-podGold">PODMARK</span>
          <div className="w-8 md:w-16 h-px bg-podGold/40"></div>
        </div>
        <h2 className="text-5xl md:text-[110px] lg:text-[130px] font-black tracking-tighter text-white mb-6 md:mb-8 leading-[0.8] select-none uppercase">
          OUR <span className="text-podGold drop-shadow-[0_0_30px_rgba(189,153,112,0.3)]">SERVICES.</span>
        </h2>
        <p className="text-white/40 text-[9px] md:text-sm font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase max-w-xl md:max-w-2xl mx-auto border-t border-white/5 pt-6 md:pt-8">
          Defined by excellence. Architects of digital dominance and visual prestige.
        </p>
      </div>

      {/* Cards Stack Container - Centered Vertically and Horizontally */}
      <div
        ref={cardsContainerRef}
        className="relative md:absolute md:inset-0 z-10 w-full flex flex-col items-center md:justify-center px-4 md:px-6"
      >
        <div className="relative w-full max-w-5xl flex flex-col gap-8 md:block md:h-[500px]">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="service-card relative md:absolute w-full h-auto md:h-full bg-[#12071d] rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem] border border-white/10 shadow-[0_60px_160px_-40px_rgba(0,0,0,1)] flex flex-col md:flex-row-reverse overflow-hidden group"
              style={{
                zIndex: 10 + index,
                opacity: 1,
                visibility: 'visible',
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

              </div>

              {/* Content Section - Bottom on mobile, Left on desktop */}
              <div className="w-full lg:w-[55%] p-5 md:p-8 lg:p-10 flex flex-col justify-center relative z-20 bg-podDark lg:bg-transparent">
                <div className="flex items-center gap-4 mb-4 md:mb-8">
                  <div className={`w-10 h-[2px] ${service.accent === 'podPurple' ? 'bg-podPurple' : service.accent === 'podCyan' ? 'bg-podCyan' : 'bg-podGold'}`}></div>
                  <span className={`font-black text-[9px] md:text-[11px] tracking-[0.5em] uppercase ${service.accent === 'podPurple' ? 'text-podPurple' : service.accent === 'podCyan' ? 'text-podCyan' : 'text-podGold'}`}>
                    {service.category} SERVICE
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
                  <Link to={service.link} className="group inline-flex items-center gap-6 text-podGold text-[10px] md:text-[13px] font-black tracking-[0.6em] uppercase transition-all hover:gap-10">
                    KNOW MORE
                    <span className="text-2xl md:text-4xl group-hover:translate-x-4 transition-transform leading-none">→</span>
                  </Link>
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
