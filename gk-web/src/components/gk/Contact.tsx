import React, { useState } from 'react';
import { Mail, Phone, Send, Linkedin, Twitter, Youtube } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Your WhatsApp number (without '+' or special characters)
    const phoneNumber = "918105575795"; 
    
    // Construct the message
    const text = `*New Inquiry from Website*%0A%0A` +
                 `*Name:* ${formState.name}%0A` +
                 `*Email:* ${formState.email}%0A` +
                 `*Message:* ${formState.message}`;

    // Redirect to WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 px-6 bg-podDark relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build Your <span className="text-podCyan">Cloud Career.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Whether you're looking for corporate training or 1-on-1 coaching, I'm here to help you navigate the complex IT ecosystem.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-podCyan/10 rounded-xl flex items-center justify-center border border-podCyan/20">
                <Mail className="text-podCyan w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email</p>
                <p className="text-white font-medium">contact@podmark.in</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-podGold/10 rounded-xl flex items-center justify-center border border-podGold/20">
                <Phone className="text-podGold w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">WhatsApp / Call</p>
                <p className="text-white font-medium">+91 81055 75795</p>
              </div>
            </div>
          </div>

          
        </div>

        <div className="bg-podDeepPurple/40 p-8 sm:p-10 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleWhatsAppSend}>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
              <input
                required
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-podDark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-podPurple transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
              <input
                required
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full bg-podDark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-podPurple transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message</label>
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Tell me about your training needs..."
                className="w-full bg-podDark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-podPurple transition-colors resize-none"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-purple-gradient text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-podPurple/20">
              Send via WhatsApp
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

     
    </section>
  );
};

export default Contact;