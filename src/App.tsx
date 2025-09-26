import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const TypingAnimation = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Creative Marketing Solutions';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    // Start typing after background and text animations finish (3 seconds total)
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (startTyping && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100); // Typing speed
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText, startTyping]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500); // Cursor blink speed
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="font-serif text-gray-900" style={{ fontFamily: 'Frank Ruehl BT, serif' }}>
      {displayText}
      <span className={`${showCursor && startTyping ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
    </span>
  );
};

function App() {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Start animation after a short delay
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleLinkClick = () => {
    window.open('https://reizenportal.org/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden relative">
      {/* Background image that animates with the text */}
      <div 
        className={`absolute inset-0 transition-all duration-2000 delay-1000 ${
          animationStarted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-full'
        }`}
        style={{
          backgroundImage: `url(${supabaseUrl}/storage/v1/object/public/RznWebAssets/reflr2.png)`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 75%',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Off-white overlay for easier viewing */}
      <div 
        className={`absolute inset-0 bg-white transition-all duration-2000 delay-1000 ${
          animationStarted ? 'opacity-20 transform translate-y-0' : 'opacity-0 transform translate-y-full'
        }`}
      />
      
      {/* Header - Apple Books */}
      <header className="absolute top-0 left-0 w-full p-4 z-10">
        <h1 className="text-gray-900 font-bold text-lg">Reizen by Loren Roberson II</h1>
      </header>

      {/* Main animated container */}
      <div className={`relative w-full h-screen transition-all duration-2000 ease-out ${
        animationStarted ? 'transform scale-100' : ''
      }`}>
        
        {/* Book Icon - starts large and centered, then moves to top */}
        <div className={`absolute transition-all duration-2000 ease-out ${
          animationStarted 
            ? 'top-20 left-1/2 transform -translate-x-1/2 w-20 h-20' 
            : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80'
        }`}>
          <img 
            src={`${supabaseUrl}/storage/v1/object/public/RznWebAssets/oldr3.png`}
            alt="Apple Books Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content that fades in after animation */}
        <div className={`absolute inset-0 pt-40 px-8 transition-all duration-2000 delay-1000 ${
          animationStarted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-full'
        }`}>
          
          {/* Apple Books label under icon */}
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium text-lg">
              <TypingAnimation />
            </p>
          </div>

          {/* Main headline */}
          <div className="text-center mb-8 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              There's two truths <br />
              in this world
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              The version that makes you the most powerful, or the version that doesn't. <br />
              Embrace your ability to choose... <span 
                onClick={handleLinkClick}
                className="text-blue-600 hover:text-blue-800 cursor-pointer underline transition-colors duration-200"
              >
                Join me here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;