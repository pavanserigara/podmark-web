import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { StrategyConsulting } from './components/StrategyConsulting';
import { Development } from './components/Development';
import { Creative } from './components/Creative';
import { SocialMedia } from './components/SocialMedia';
import { PPCAdvertising } from './components/PPCAdvertising';
import { MetaGoogleAds } from './components/MetaGoogleAds';
import { SEO } from './components/SEO';
import { Footer } from './components/Footer';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { RealEstateShoots } from './components/RealEstateShoots';
import { JewelleryShoots } from './components/JewelleryShoots';
import { ProductShoots } from './components/ProductShoots';
import { WeddingShoots } from './components/WeddingShoots';
import { InteriorDesign } from './components/InteriorDesign';
import { Splash } from './components/Splash';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <div className="relative font-sans antialiased text-white selection:bg-podPurple selection:text-white min-h-screen overflow-x-hidden">
        {/* Main Content */}
        <div className={`transition-opacity duration-1000 ease-in-out ${loading ? 'opacity-0' : 'opacity-100'} bg-black min-h-screen`}>
          {/* Global Staggered Background */}
          <BackgroundAnimation />

          <div className="relative z-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/strategy-consulting" element={<StrategyConsulting />} />
              <Route path="/development" element={<Development />} />
              <Route path="/creative" element={<Creative />} />
              <Route path="/social-media" element={<SocialMedia />} />
              <Route path="/ppc-advertising" element={<PPCAdvertising />} />
              <Route path="/meta-google-ads" element={<MetaGoogleAds />} />
              <Route path="/seo-organic-growth" element={<SEO />} />
              <Route path="/real-estate-shoots" element={<RealEstateShoots />} />
              <Route path="/jewellery-shoots" element={<JewelleryShoots />} />
              <Route path="/product-shoots" element={<ProductShoots />} />
              <Route path="/wedding-shoots" element={<WeddingShoots />} />
              <Route path="/interior-design" element={<InteriorDesign />} />
            </Routes>
            <Footer />
          </div>
        </div>

        {/* Loading Splash Screen */}
        {loading && <Splash onComplete={() => setLoading(false)} />}
      </div>
    </Router>
  );
};

export default App;
