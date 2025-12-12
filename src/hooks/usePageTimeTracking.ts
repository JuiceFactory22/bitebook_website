'use client';

import { useEffect } from 'react';
import { trackTimeOnPage } from '@/utils/analytics';

export const usePageTimeTracking = (pageName: string) => {
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // Convert to seconds
      if (timeSpent > 0) {
        trackTimeOnPage(timeSpent, pageName);
      }
    };
  }, [pageName]);
};

