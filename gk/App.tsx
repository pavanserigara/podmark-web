
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Services from './components/Services';
import Projects from './components/Projects';
import ProjectGallery from './components/ProjectGallery';
import Training from './components/Training';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import MatrixBackground from './components/MatrixBackground';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <MatrixBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <ProjectGallery />
        <Services />
        <Training />
        <Contact />
      </main>
      <AIAssistant />
      
      {/* Visual grain overlay for texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default App;
