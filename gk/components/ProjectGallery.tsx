
import React from 'react';
import { GALLERY_IMAGES } from '../constants';
import { ExternalLink, ZoomIn } from 'lucide-react';

const ProjectGallery: React.FC = () => {
  return (
    <section id="gallery" className="py-32 px-6 bg-pod-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center lg:text-left">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Project <span className="text-impact">Visuals.</span></h2>
          <p className="text-slate-400 text-xl max-w-2xl">A glimpse into the high-performance environments and architectural designs I've delivered.</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {GALLERY_IMAGES.map((image, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-3xl bg-pod-deep-purple break-inside-avoid shadow-2xl">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pod-dark via-pod-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-pod-cyan text-[10px] font-black uppercase tracking-[0.2em] mb-2">{image.category}</span>
                <h3 className="text-2xl font-bold text-white mb-4">{image.title}</h3>
                <div className="flex gap-4">
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-pod-purple transition-colors">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-pod-purple transition-colors">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 flex justify-center">
            <button className="px-8 py-4 bg-pod-deep-purple hover:bg-pod-deep-purple/80 text-slate-300 font-bold rounded-2xl border border-white/5 transition-all hover:scale-105">
                Explore All Assets
            </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
