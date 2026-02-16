
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppReady } from '@/context/loading-provider';
import Logo from '@/components/shared/logo';
import { cn } from '@/lib/utils';

export default function GlobalLoader() {
  const { isReady } = useAppReady();

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } }}
          exit={{ scaleY: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black origin-center"
        >
          {/* TV Line effect on exit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: [0, 1, 0], transition: { times: [0, 0.1, 0.2], duration: 0.2 } }}
            className="absolute h-px w-full bg-white"
          />
          
          {/* Pulsing element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="relative"
          >
            <div className="relative flex items-center justify-center w-32 h-32">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-300 via-green-300 to-sky-300 rounded-full animate-pulse blur-2xl opacity-70" />
                <div className="relative">
                    <Logo />
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
