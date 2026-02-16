
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

    // Use a combination of font loading and window load
    Promise.all([document.fonts.ready])
      .then(() => {
        if (document.readyState === 'complete') {
          handleLoad();
        } else {
          window.addEventListener('load', handleLoad, { once: true });
        }
      })
      .catch((error) => {
        console.error('Failed to wait for fonts:', error);
        // Still proceed even if font loading fails
        handleLoad();
      });
      
    // Fallback to ensure loader doesn't stick forever
    const fallbackTimeout = setTimeout(handleLoad, 5000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimeout);
      document.body.classList.remove('overflow-hidden');
    };
  }, [setIsReady]);

  return null; // This component does not render anything
}
