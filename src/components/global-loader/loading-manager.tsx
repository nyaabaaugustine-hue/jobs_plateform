'use client';

import { useEffect } from 'react';
import { useAppReady } from '@/context/loading-provider';

export function LoadingManager() {
  const { setIsReady } = useAppReady();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    const handleLoad = () => {
        // Ensure the logo animation is seen for at least a brief moment
        // but keep it snappy overall.
        setTimeout(() => {
            document.body.classList.remove('overflow-hidden');
            setIsReady(true);
        }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
      
    // Fallback if load event takes too long
    const fallbackTimeout = setTimeout(handleLoad, 2500);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimeout);
      document.body.classList.remove('overflow-hidden');
    };
  }, [setIsReady]);

  return null;
}
