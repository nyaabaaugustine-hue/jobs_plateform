
'use client';

import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
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
      </div>
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
