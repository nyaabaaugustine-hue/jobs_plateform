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
      transition: { duration: 0.3, ease: "easeInOut" }
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
        ease: "easeOut" 
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
          aria-label="Loading"
        >
          <div className="relative flex flex-col items-center gap-8">
            {logoImage && (
              <motion.div
                variants={logoVariants}
                className="relative"
              >
                <div className="relative z-10 bg-white p-6 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.1)]">
                  <Image
                    src={logoImage.imageUrl}
                    alt="Logo"
                    width={180}
                    height={60}
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Glow Animation */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-10 bg-primary/20 blur-3xl -z-10 rounded-full" 
                />
              </motion.div>
            )}
            
            <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.2, 
                  ease: "easeInOut" 
                }}
                className="w-full h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}