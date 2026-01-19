
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string, e: React.MouseEvent) => {
    if (path.startsWith('#')) {
      // Handle anchor links with smooth scrolling
      if (window.location.pathname !== '/') {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(path.substring(1));
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        e.preventDefault();
        const element = document.getElementById(path.substring(1));
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle route links with client-side navigation
      e.preventDefault();
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-16 bg-podDark border-t border-white/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <a href="#home" onClick={(e) => handleNavigation('#home', e)} className="block mb-6 cursor-pointer">
              <img src="/images/podmark_logo.svg" alt="PODMARK" className="h-8 w-auto" />
            </a>
            <p className="text-white/40 mb-6 text-sm leading-relaxed max-w-xs">
              “We Don’t Just Market, We Create Impact.”
            </p>
            <div className="flex space-x-3">
              {/* WhatsApp */}
              <a href="https://wa.me/918105575795" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#25D366] hover:text-white transition-all border border-white/5 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /></svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#E1306C] hover:text-white transition-all border border-white/5 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#1877F2] hover:text-white transition-all border border-white/5 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              {/* Call */}
              <a href="tel:+918105575795" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-podGold hover:text-white transition-all border border-white/5 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><a href="#home" onClick={(e) => handleNavigation('#home', e)} className="hover:text-podPurple transition-colors cursor-pointer">Home</a></li>
              <li><a href="#story" onClick={(e) => handleNavigation('#story', e)} className="hover:text-podPurple transition-colors cursor-pointer">About Us</a></li>
              <li><a href="#services" onClick={(e) => handleNavigation('#services', e)} className="hover:text-podPurple transition-colors cursor-pointer">Services</a></li>
              <li><a href="/careers" onClick={(e) => handleNavigation('/careers', e)} className="hover:text-podPurple transition-colors cursor-pointer">Careers</a></li>
              <li><a href="#contact" onClick={(e) => handleNavigation('#contact', e)} className="hover:text-podPurple transition-colors cursor-pointer">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><a href="/social-media" onClick={(e) => handleNavigation('/social-media', e)} className="hover:text-podPurple transition-colors cursor-pointer">Social Media Marketing</a></li>
              <li><a href="/development" onClick={(e) => handleNavigation('/development', e)} className="hover:text-podPurple transition-colors cursor-pointer">Development</a></li>
              <li><a href="/creative" onClick={(e) => handleNavigation('/creative', e)} className="hover:text-podPurple transition-colors cursor-pointer">Creative Services</a></li>
              <li><a href="/ppc-advertising" onClick={(e) => handleNavigation('/ppc-advertising', e)} className="hover:text-podPurple transition-colors cursor-pointer">PPC Advertising</a></li>
              <li><a href="/seo-organic-growth" onClick={(e) => handleNavigation('/seo-organic-growth', e)} className="hover:text-podPurple transition-colors cursor-pointer">SEO & Organic Growth</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-podPurple">📧</span>
                <a href="mailto:sales@podmark.in" className="hover:text-white transition-colors">sales@podmark.in</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-podPurple">📞</span>
                <div>
                  <p>+91 81055 75795</p>
                  <p>+91 81059 27495</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-podPurple">📍</span>
                <span>Udupi, Karnataka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 space-y-4 md:space-y-0 text-center md:text-left">
          <p>PODMARK © 2025 – All Rights Reserved</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
