'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppReady } from '@/context/loading-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function GlobalLoader() {
  const { isReady } = useAppReady();
  const logoImage = PlaceHolderImages.find((p) => p.id === 'main-logo');

  // Variants for the animation orchestration
  const containerVariants = {
    exit: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const contentVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const tvScreenVariants = {
    exit: {
      scaleY: 0,
      transition: { duration: 0.6, delay: 0.2, ease: [0.76, 0, 0.24, 1] },
    },
  };
  
  const whiteLineVariants = {
      exit: {
        opacity: [0, 1, 0],
        transition: { times: [0, 0.2, 0.8], duration: 0.8, delay: 0.1 }
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
            <div className="relative w-48 h-32">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/50 via-emerald-500/50 to-sky-500/50 rounded-full animate-pulse blur-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                    {logoImage && (
                        <Image
                          src={logoImage.imageUrl}
                          alt="Chapel Hill Logo"
                          width={122}
                          height={40}
                          className="object-contain"
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
            className="absolute h-px w-full bg-white"
            variants={whiteLineVariants}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
