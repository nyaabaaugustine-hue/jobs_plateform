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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          role="status"
          aria-live="polite"
          aria-label="Loading Chapel Hill"
        >
          <div className="relative flex flex-col items-center gap-12">
            {logoImage && (
              <motion.div
                variants={logoVariants}
                className="relative"
              >
                <div className="relative z-10 bg-white p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-border/10">
                  <Image
                    src={logoImage.imageUrl}
                    alt="Chapel Hill Logo"
                    width={200}
                    height={68}
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Intense Pulsing Glow for High-End Feel */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -inset-16 bg-primary/25 blur-[70px] -z-10 rounded-full" 
                />
              </motion.div>
            )}
            
            <div className="flex flex-col items-center gap-5">
                <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 1.2, 
                            ease: "linear" 
                        }}
                        className="w-full h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                </div>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/80 animate-pulse">
                    Connecting Opportunities
                </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}