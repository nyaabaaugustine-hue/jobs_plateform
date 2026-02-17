'use client';

import { useEffect } from 'react';
import { useAppReady } from '@/context/loading-provider';

export function LoadingManager() {
  const { setIsReady } = useAppReady();

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    const handleLoad = () => {
        // Reduced load time for snappy feel
        setTimeout(() => {
            document.body.classList.remove('overflow-hidden');
            setIsReady(true);
        }, 400);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad, { once: true });
    }
      
    // Faster fallback
    const fallbackTimeout = setTimeout(handleLoad, 1200);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimeout);
      document.body.classList.remove('overflow-hidden');
    };
  }, [setIsReady]);

  return null;
}