'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppReady } from '@/context/loading-provider';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function GlobalLoader() {
  const { isReady } = useAppReady();
  const logoImage = PlaceHolderImages.find((p) => p.id === 'main-logo');

  // Animation variants
  const containerVariants = {
    exit: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8, y: 10 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } 
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const bgVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          role="status"
          aria-live="polite"
          aria-label="Loading platform"
        >
          {/* Background Gradient Pulse */}
          <motion.div 
            variants={bgVariants}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="h-64 w-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          </motion.div>

          {/* Logo Content */}
          <motion.div
            variants={logoVariants}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            {logoImage && (
              <div className="relative">
                <Image
                  src={logoImage.imageUrl}
                  alt="Chapel Hill Logo"
                  width={200}
                  height={60}
                  className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  priority
                />
                {/* Shine effect passing through logo */}
                <motion.div 
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '200%', opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                />
              </div>
            )}
            
            {/* Minimal loading bar */}
            <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
