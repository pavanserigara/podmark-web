
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  return (
    <section id="contact" className="py-24 px-6 bg-pod-dark relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Build Your <span className="text-pod-cyan">Cloud Career.</span></h2>
          <p className="text-slate-400 text-lg mb-10">Whether you're looking for corporate training or 1-on-1 coaching, I'm here to help you navigate the complex IT ecosystem.</p>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pod-cyan/10 rounded-xl flex items-center justify-center border border-pod-cyan/20">
                <Mail className="text-pod-cyan w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email</p>
                <p className="text-white font-medium">gautham@mct-expert.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pod-gold/10 rounded-xl flex items-center justify-center border border-pod-gold/20">
                <Phone className="text-pod-gold w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">WhatsApp / Call</p>
                <p className="text-white font-medium">+1 (234) 567-890</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-xl bg-pod-deep-purple border border-white/5 flex items-center justify-center hover:bg-pod-purple transition-all shadow-lg">
              <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="w-12 h-12 rounded-xl bg-pod-deep-purple border border-white/5 flex items-center justify-center hover:bg-pod-cyan transition-all shadow-lg">
              <Twitter className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="w-12 h-12 rounded-xl bg-pod-deep-purple border border-white/5 flex items-center justify-center hover:bg-pod-gold transition-all shadow-lg">
              <Youtube className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        <div className="bg-pod-deep-purple/40 p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-pod-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pod-purple transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-pod-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pod-purple transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message</label>
              <textarea 
                rows={4}
                placeholder="Tell me about your training needs..."
                className="w-full bg-pod-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pod-purple transition-colors resize-none"
              />
            </div>
            <button className="w-full py-4 bg-purple-gradient text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-pod-purple/20">
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-24 pt-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Gautham Kamath. MCT & Cloud Architect. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Contact;
