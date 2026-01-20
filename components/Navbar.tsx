
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const MAIN_SERVICES = [
  {
    title: "Meta and Google Ads",
    desc: "Paid campaigns that scale revenue.",
    path: "/meta-google-ads",
    icon: (
      <svg className="w-10 h-10 text-podCyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    )
  },
  {
    title: "Web Design",
    desc: "Web Development Services For Scalable Digital Experiences.",
    path: "/development",
    icon: (
      <svg className="w-10 h-10 text-podPurple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  {
    title: "Social Media Marketing",
    desc: "Social Media Marketing That Builds Engagement & Trust.",
    path: "/social-media",
    icon: (
      <svg className="w-10 h-10 text-podCyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    )
  },
  {
    title: "Real Estate Shoots",
    desc: "Showcase Properties in Their Best Light.",
    path: "/real-estate-shoots",
    icon: (
      <svg className="w-10 h-10 text-podGold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    )
  },
  {
    title: "Jewellery Shoots",
    desc: "Capturing the Brilliance of Every Cut.",
    path: "/jewellery-shoots",
    icon: (
      <svg className="w-10 h-10 text-podPurple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L12 3L18 12L12 21L6 12Z M6 12H18 M12 3V21 M9 7.5H15 M9 16.5H15" />
      </svg>
    )
  },
  {
    title: "Product Shoots",
    desc: "Visuals That Make People Click 'Buy'.",
    path: "/product-shoots",
    icon: (
      <svg className="w-10 h-10 text-podGold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    )
  },
  {
    title: "Pre n post wedding",
    desc: "Capturing love with cinematic visuals.",
    path: "/wedding-shoots",
    icon: (
      <svg className="w-10 h-10 text-podPurple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    )
  },
  {
    title: "Interior Design",
    desc: "Visual Solutions for Designed Spaces.",
    path: "/interior-design",
    icon: (
      <svg className="w-10 h-10 text-podCyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
      </svg>
    )
  }
];

const DETAILED_SERVICES = [
  {
    title: "Strategy And Consulting",
    desc: "Marketing Strategy & Consulting That Aligns With Growth.",
    path: "/strategy-consulting",
    icon: (
      <svg className="w-10 h-10 text-podCyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83m0 0a1.5 1.5 0 10-2.122-2.122 1.5 1.5 0 002.122 2.122z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14.5l-2.5-2.5m-5.5-5.5L8.5 4M4 8.5L6.5 11m1.5 1.5L4 16.5m7-7l4.5 4.5m-7-7l-4.5-4.5" />
      </svg>
    )
  },
  {
    title: "Creative",
    desc: "Creative Services For Effective Brand Communication.",
    path: "/creative",
    icon: (
      <svg className="w-10 h-10 text-podGold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.013 1.62c-.14-.347-.22-.728-.22-1.128 0-1.591.93-2.966 2.274-3.597m0 0A15.997 15.997 0 0014.227 8.13m2.547 9.043a6.002 6.002 0 01-11.45 0" />
      </svg>
    )
  },
  {
    title: "PPC Advertising",
    desc: "PPC Advertising Services That Drive Qualified Traffic.",
    path: "/ppc-advertising",
    icon: (
      <svg className="w-10 h-10 text-podPurple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.066-1.386-.115-2.09-.149m5.466 0c.704.034 1.402.083 2.09.149m0 0a48.11 48.11 0 011.487 1.677c.31.374.334.914.057 1.303a30.13 30.13 0 01-3.048 3.587 30.13 30.13 0 01-3.048-3.587c-.277-.389-.253-.929.057-1.303a48.114 48.114 0 011.487-1.677zM4.5 5.25h15a2.25 2.25 0 012.25 2.25v6.75a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 14.25V7.5A2.25 2.25 0 014.5 5.25z" />
      </svg>
    )
  },
  {
    title: "SEO & Organic Growth",
    desc: "SEO Services For Sustainable Organic Growth.",
    path: "/seo-organic-growth",
    icon: (
      <svg className="w-10 h-10 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.5 4.5L21.75 7M21.75 7h-5.25M21.75 7v5.25" />
      </svg>
    )
  }
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const detailedRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (path: string, e: React.MouseEvent) => {
    if (path.startsWith('#')) {
      // Allow default anchor behavior if on home page, otherwise navigate home first
      if (window.location.pathname !== '/') {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(path.substring(1));
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      setShowDropdown(false);
      setIsOpen(false);
    } else {
      // Router link
      e.preventDefault();
      navigate(path);
      setShowDropdown(false);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: 10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      setShowDetailed(false);
    }
  }, [showDropdown]);

  useEffect(() => {
    if (showDetailed && detailedRef.current) {
      gsap.fromTo(detailedRef.current,
        { opacity: 0, x: -20, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "expo.out" }
      );
    }
  }, [showDetailed]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-4 md:px-6 py-4 min-h-[72px] ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Logo Section */}
        <div className="group cursor-pointer" onClick={(e) => handleNavigation('#home', e)}>
          <img
            src="/images/podmark_logo.svg"
            alt="PODMARK"
            className="h-6 md:h-7 w-auto transition-all duration-300 group-hover:brightness-110"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <a href="#home" onClick={(e) => handleNavigation('#home', e)} className="nav-link text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors py-2">Home</a>
          <a href="#story" onClick={(e) => handleNavigation('#story', e)} className="nav-link text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors py-2">Story</a>

          {/* Services Dropdown Trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className={`nav-link text-[10px] font-black uppercase tracking-[0.3em] py-2 transition-colors flex items-center gap-1.5 ${showDropdown ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              Services
              <svg className={`w-3 h-3 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[550px] bg-[#0E0516]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] p-5"
              >
                <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-4">
                  {MAIN_SERVICES.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.path}
                      onClick={(e) => handleNavigation(item.path, e)}
                      className="group flex gap-3 items-start p-2 rounded-xl hover:bg-white/5 transition-all"
                    >
                      <div className="shrink-0 p-2 rounded-lg bg-white/5 border border-white/5 group-hover:scale-110 group-hover:border-white/10 transition-all duration-300">
                        {React.cloneElement(item.icon as React.ReactElement, {
                          className: (item.icon as React.ReactElement).props.className.replace('w-10 h-10', 'w-6 h-6')
                        })}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white tracking-tight uppercase mb-0.5 group-hover:text-podGold transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[10px] leading-relaxed text-white/40 font-bold uppercase tracking-wider group-hover:text-white/60 transition-colors line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                {/* Dropdown Footer */}
                <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Bespoke Digital Arsenals</span>
                  <button
                    onClick={() => setShowDetailed(!showDetailed)}
                    className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all ${showDetailed ? 'text-white' : 'text-podGold'}`}
                  >
                    View Detailed List <span className={showDetailed ? 'rotate-90 transition-transform' : 'transition-transform'}>→</span>
                  </button>
                </div>

                {/* Side Sub-dropdown */}
                {showDetailed && (
                  <div
                    ref={detailedRef}
                    className="absolute left-[calc(100%+10px)] top-0 w-[280px] bg-[#0E0516]/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] p-6 z-[110]"
                  >
                    <h5 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-6 border-b border-white/5 pb-2">Premium Strategies</h5>
                    <div className="flex flex-col gap-6">
                      {DETAILED_SERVICES.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.path}
                          onClick={(e) => handleNavigation(item.path, e)}
                          className="group flex gap-4 items-start transition-all"
                        >
                          <div className="shrink-0 group-hover:scale-110 transition-transform duration-300 text-white/70">
                            {React.cloneElement(item.icon as React.ReactElement, {
                              className: (item.icon as React.ReactElement).props.className.replace('w-10 h-10', 'w-5 h-5')
                            })}
                          </div>
                          <div>
                            <h4 className="text-[10px] font-black text-white group-hover:text-podGold transition-colors uppercase tracking-widest leading-none mb-1">
                              {item.title}
                            </h4>
                            <p className="text-[8px] text-white/40 font-bold uppercase tracking-wider group-hover:text-white/60 transition-colors line-clamp-1">
                              {item.desc}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>


          <a href="#contact" className="nav-link text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors py-2">Contact</a>
        </div>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center">
          <a
            href="#contact"
            className="cta-glow px-10 py-3 purple-gradient text-white rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
          >
            Work With Us
            <svg
              className="w-3 h-3 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-[110]"
        >
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black transition-all duration-500 z-[90] ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
      >
        <div className="flex flex-col p-10 pt-32 space-y-8 h-full bg-black/95 backdrop-blur-3xl overflow-y-auto">
          {['Home', 'Story', 'Services', 'Contact'].map((item) => {
            if (item === 'Services') {
              return (
                <div key={item} className="flex flex-col">
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="text-4xl font-black tracking-tighter hover:text-podPurple transition-colors uppercase leading-none flex items-center justify-between text-left"
                  >
                    {item}
                    <svg className={`w-6 h-6 transform transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {mobileServicesOpen && (
                    <div className="mt-6 flex flex-col gap-6 pl-4 border-l border-white/10 animate-fade-in">
                      {MAIN_SERVICES.map((service, sIndex) => (
                        <a
                          key={`main-${sIndex}`}
                          href={service.path}
                          onClick={(e) => handleNavigation(service.path, e)}
                          className="flex items-center gap-4 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-podPurple/20 transition-colors">
                            {React.cloneElement(service.icon as React.ReactElement, { className: "w-4 h-4" })}
                          </div>
                          <span className="text-sm font-bold text-white/60 group-hover:text-white uppercase tracking-wider transition-colors">
                            {service.title}
                          </span>
                        </a>
                      ))}

                      <div className="mt-4 pt-4 border-t border-white/5">
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4">Detailed Services</p>
                        <div className="grid grid-cols-1 gap-4">
                          {DETAILED_SERVICES.map((service, dIndex) => (
                            <a
                              key={`det-${dIndex}`}
                              href={service.path}
                              onClick={(e) => handleNavigation(service.path, e)}
                              className="flex items-center gap-4 group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-podGold/60 group-hover:text-podGold group-hover:bg-podGold/10 transition-colors">
                                {React.cloneElement(service.icon as React.ReactElement, { className: "w-4 h-4" })}
                              </div>
                              <span className="text-sm font-bold text-white/40 group-hover:text-white uppercase tracking-wider transition-colors">
                                {service.title}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={(e) => handleNavigation(`#${item.toLowerCase().replace(' ', '-')}`, e)}
                className="text-4xl font-black tracking-tighter hover:text-podPurple transition-colors uppercase leading-none"
              >
                {item}
              </a>
            );
          })}
          <div className="pt-8 border-t border-white/10">
            <a
              href="https://wa.me/918105575795"
              target="_blank"
              onClick={() => setIsOpen(false)}
              className="w-full inline-block text-center py-5 purple-gradient rounded-2xl text-sm font-black tracking-widest uppercase shadow-2xl shadow-podPurple/20"
            >
              Start Project
            </a>
          </div>

          <div className="mt-auto pb-10 flex justify-center gap-10 text-white/40">
            <span className="text-xs tracking-widest font-black uppercase">Instagram</span>
            <span className="text-xs tracking-widest font-black uppercase">LinkedIn</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
