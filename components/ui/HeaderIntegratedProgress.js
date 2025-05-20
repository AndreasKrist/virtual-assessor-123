import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HeaderIntegratedProgress() {
  const [readingProgress, setReadingProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  // Check if we're on an article page
  const isArticlePage = router.pathname.includes('/articles/');

  useEffect(() => {
    setMounted(true);
    
    // Only run scroll listener on article pages
    if (!isArticlePage) {
      return;
    }
    
    const updateReadingProgress = () => {
      const currentPosition = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentPosition / scrollHeight).toFixed(2)) * 100);
      }
    };
    
    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress();
    
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, [isArticlePage]);
  
  // Don't render anything on article pages until client-side hydration is complete
  if (!isArticlePage) {
    return null;
  }
  
  return (
    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700">
      <div 
        className="h-full bg-red-600 dark:bg-red-500 transition-all duration-200 ease-out"
        style={{ width: mounted ? `${readingProgress}%` : '0%' }}
      ></div>
    </div>
  );
}