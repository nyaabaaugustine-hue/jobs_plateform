
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
    initial: { opacity: 0, scale: 0.7, y: 30 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          role="status"
          aria-live="polite"
          aria-label="Loading Chapel Hill"
        >
          <div className="relative flex flex-col items-center gap-10">
            {logoImage && (
              <motion.div
                variants={logoVariants}
                className="relative"
              >
                <div className="relative z-10 bg-white p-8 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                  <Image
                    src={logoImage.imageUrl}
                    alt="Chapel Hill Logo"
                    width={220}
                    height={75}
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Intense Pulsing Glow */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-12 bg-primary/30 blur-[60px] -z-10 rounded-full" 
                />
              </motion.div>
            )}
            
            <div className="flex flex-col items-center gap-4">
                <div className="w-56 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 1, 
                            ease: "easeInOut" 
                        }}
                        className="w-full h-full bg-primary"
                    />
                </div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground animate-pulse">
                    Initializing Platform
                </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
