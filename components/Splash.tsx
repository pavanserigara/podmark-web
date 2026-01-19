
import React, { useEffect, useState } from 'react';

export const Splash: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        <div className="relative mb-8">
          {/* Animated decorative ring */}
          <div className="absolute inset-0 -m-12 border border-podPurple/30 rounded-full animate-ping opacity-20"></div>
          <div className="relative z-10 p-4">
            <img
              src="/images/podmark_logo.svg"
              alt="PODMARK"
              className="w-48 md:w-72 h-auto mx-auto animate-pulse drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            />
          </div>
        </div>
        <div className="mt-4 flex space-x-2 justify-center">
          <div className="w-2 h-2 bg-podPurple animate-pulse"></div>
          <div className="w-2 h-2 bg-podCyan animate-pulse delay-75"></div>
          <div className="w-2 h-2 bg-white animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
};
