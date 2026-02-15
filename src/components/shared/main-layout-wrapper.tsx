'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import ConditionalLiveActivityBar from '@/components/shared/conditional-live-activity-bar';
import React from 'react';

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employer');

  if (isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
        <ConditionalLiveActivityBar />
      </div>
      {children}
      <Footer />
    </>
  );
}
