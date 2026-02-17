'use client';

import { useEffect } from 'react';
import { useAppReady } from '@/context/loading-provider';

export function LoadingManager() {
  const { setIsReady } = useAppReady();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    const handleLoad = () => {
        // Optimized boot sequence for absolute best app load time
        setTimeout(() => {
            document.body.classList.remove('overflow-hidden');
            setIsReady(true);
        }, 50);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
      
    const fallbackTimeout = setTimeout(handleLoad, 600);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimeout);
      document.body.classList.remove('overflow-hidden');
    };
  }, [setIsReady]);

  return null;
}
