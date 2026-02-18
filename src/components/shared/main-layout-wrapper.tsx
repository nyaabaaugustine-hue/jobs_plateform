'use client';

import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import LiveActivityBar from '@/components/shared/live-activity-bar';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employer') ||
    pathname === '/hilladmin';

  return (
    <>
      <div className={(!mounted || isDashboardPage) ? 'hidden' : 'sticky top-0 z-50'}>
        <Header />
        <LiveActivityBar />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <div className={(!mounted || isDashboardPage) ? 'hidden' : 'block'}>
        <Footer />
      </div>
    </>
  );
}
