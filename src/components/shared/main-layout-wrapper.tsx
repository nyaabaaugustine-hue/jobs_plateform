'use client';

import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import ConditionalLiveActivityBar from '@/components/shared/conditional-live-activity-bar';
import React from 'react';

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
        <ConditionalLiveActivityBar />
      </div>
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
