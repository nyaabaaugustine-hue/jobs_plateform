'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppReady } from '@/context/loading-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function GlobalLoader() {
  const { isReady } = useAppReady();
  const logoImage = PlaceHolderImages.find((p) => p.id === 'main-logo');

  const containerVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" }
    },
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8, y: 20 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
  };

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loader"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          role="status"
          aria-live="polite"
          aria-label="Loading platform"
        >
          <div className="relative flex flex-col items-center gap-8">
            {logoImage && (
              <motion.div
                variants={logoVariants}
                className="relative"
              >
                <div className="relative z-10 bg-white/90 p-4 rounded-xl shadow-2xl ring-1 ring-black/5">
                  <Image
                    src={logoImage.imageUrl}
                    alt="Chapel Hill Logo"
                    width={180}
                    height={60}
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Logo Glow */}
                <div className="absolute -inset-10 bg-primary/20 blur-3xl -z-10 rounded-full animate-pulse" />
              </motion.div>
            )}
            
            {/* Loading Indicator */}
            <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.2, 
                  ease: "easeInOut" 
                }}
                className="w-full h-full bg-primary"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
