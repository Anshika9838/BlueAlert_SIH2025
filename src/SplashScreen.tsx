import React, { useEffect, useState } from 'react';
import CustomLogo from './CustomLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500); // Wait for fade out animation
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center">
        {/* Ocean/Wave SVG Logo */}
        <div className="mb-8 flex justify-center">
          <CustomLogo className='animate-pulse' />
        </div>

        {/* App Name */}
        <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
          <span className="bg-gradient-to-r from-cyan-300 via-teal-400 to-blue-500 bg-clip-text text-transparent">
            BlueAlert
          </span>
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-cyan-100 font-light tracking-wider mb-2">
          Ocean Hazard Reporting
        </p>
        <p className="text-lg text-blue-200 font-light">
          & Early Warning Platform
        </p>

        {/* Loading Animation */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* Floating Ocean Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>🌊</div>
          <div className="absolute top-40 right-20 text-3xl opacity-15 animate-bounce" style={{ animationDelay: '1s' }}>⚓</div>
          <div className="absolute bottom-20 left-1/4 text-2xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>🚨</div>
          <div className="absolute top-60 right-1/3 text-3xl opacity-15 animate-bounce" style={{ animationDelay: '1.5s' }}>🏖️</div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
