'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppReady } from '@/context/loading-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function GlobalLoader() {
  const { isReady } = useAppReady();
  const logoImage = PlaceHolderImages.find((p) => p.id === 'main-logo');

  // Faster animation orchestration
  const containerVariants = {
    exit: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const contentVariants = {
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const tvScreenVariants = {
    exit: {
      scaleY: 0,
      transition: { duration: 0.4, delay: 0.1, ease: [0.76, 0, 0.24, 1] },
    },
  };
  
  const whiteLineVariants = {
      exit: {
        opacity: [0, 1, 0],
        transition: { times: [0, 0.2, 0.8], duration: 0.5, delay: 0.05 }
      }
  }

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loader"
          variants={containerVariants}
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          role="status"
          aria-live="polite"
          aria-label="Loading page"
        >
          {/* Main content that fades out */}
          <motion.div
            variants={contentVariants}
            className="relative flex flex-col items-center justify-center"
          >
            <div className="relative w-64 h-40">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-accent/40 to-primary/40 rounded-full animate-pulse blur-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                    {logoImage && (
                        <Image
                          src={logoImage.imageUrl}
                          alt="Chapel Hill Logo"
                          width={180}
                          height={60}
                          className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                          priority
                        />
                    )}
                </div>
            </div>
          </motion.div>

          {/* The TV screen effect that collapses */}
          <motion.div
            className="absolute inset-0 bg-black origin-center"
            variants={tvScreenVariants}
          />
          
          {/* The bright white line that flashes */}
          <motion.div
            className="absolute h-[2px] w-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            variants={whiteLineVariants}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
