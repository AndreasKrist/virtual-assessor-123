import { useState, useEffect } from 'react';

export default function useReadingTime(content) {
  const [readingTime, setReadingTime] = useState(0);
  
  useEffect(() => {
    if (!content) {
      setReadingTime(0);
      return;
    }
    
    // Average reading speed: 200-250 words per minute
    // We'll use 225 words per minute
    const wordsPerMinute = 225;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = wordCount / wordsPerMinute;
    
    // Round up to nearest minute
    setReadingTime(Math.ceil(minutes));
  }, [content]);
  
  return readingTime;
}