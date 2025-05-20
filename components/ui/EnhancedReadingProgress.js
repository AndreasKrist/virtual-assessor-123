import { useState, useEffect } from 'react';

export default function EnhancedReadingProgress() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const updateReadingProgress = () => {
      const currentPosition = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      // Update scrolled state for conditional rendering
      setIsScrolled(currentPosition > 150);
      
      if (scrollHeight) {
        setReadingProgress(Number((currentPosition / scrollHeight).toFixed(2)) * 100);
      }
    };
    
    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress();
    
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);
  
  return (
    <>
      {/* Top progress bar - always visible */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-red-600 transition-all duration-200 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>
      
      {/* Floating percentage indicator - visible only when scrolled */}
      {isScrolled && (
        <div className="fixed bottom-6 right-6 bg-red-600 text-white text-sm font-medium rounded-full h-12 w-12 flex items-center justify-center shadow-lg z-40 transition-all duration-300 ease-in-out">
          {Math.round(readingProgress)}%
        </div>
      )}
    </>
  );
}