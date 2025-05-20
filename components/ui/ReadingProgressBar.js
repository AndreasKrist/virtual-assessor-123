import { useState, useEffect } from 'react';

export default function ReadingProgressBar() {
  const [readingProgress, setReadingProgress] = useState(0);
  
  useEffect(() => {
    const updateReadingProgress = () => {
      const currentPosition = window.scrollY;
      // Get total height of the page minus window height (this is the scrollable height)
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentPosition / scrollHeight).toFixed(2)) * 100);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', updateReadingProgress);
    
    // Call once to initialize
    updateReadingProgress();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div 
        className="h-full bg-red-600 transition-all duration-200 ease-out"
        style={{ width: `${readingProgress}%` }}
      ></div>
    </div>
  );
}