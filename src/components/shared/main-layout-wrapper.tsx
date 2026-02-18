
'use client';

import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import LiveActivityBar from '@/components/shared/live-activity-bar';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

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

  // To prevent hydration errors, we must ensure the server-rendered HTML
  // matches the initial client-side render perfectly.
  return (
    <>
      <div className={(!mounted || isDashboardPage) ? 'hidden' : 'sticky top-0 z-50'}>
        <Header />
        <LiveActivityBar />
      </div>
      <div className="flex-1">{children}</div>
      <div className={(!mounted || isDashboardPage) ? 'hidden' : 'block'}>
        <Footer />
      </div>
    </>
  );
}
