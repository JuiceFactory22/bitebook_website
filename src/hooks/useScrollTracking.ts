'use client';

import { useEffect } from 'react';
import { trackScrollDepth } from '@/utils/analytics';

export const useScrollTracking = () => {
  useEffect(() => {
    const trackedDepths = new Set<number>();
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      const scrollPercentage = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );
      
      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !trackedDepths.has(milestone)) {
          trackedDepths.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

