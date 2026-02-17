'use client';

import { useEffect } from 'react';
import { useAppReady } from '@/context/loading-provider';

export function LoadingManager() {
  const { setIsReady } = useAppReady();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    const handleLoad = () => {
        document.body.classList.remove('overflow-hidden');
        setIsReady(true);
    };

    // Use a faster combination of font loading and window load
    if (document.readyState === 'complete') {
      // Small delay to ensure the loader is seen but doesn't linger
      setTimeout(handleLoad, 500);
    } else {
      Promise.all([document.fonts.ready])
        .then(() => {
          window.addEventListener('load', handleLoad, { once: true });
        })
        .catch((error) => {
          console.error('Font loading check failed:', error);
          handleLoad();
        });
    }
      
    // Reduced fallback to ensure snappy experience
    const fallbackTimeout = setTimeout(handleLoad, 3000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimeout);
      document.body.classList.remove('overflow-hidden');
    };
  }, [setIsReady]);

  return null;
}
