'use client';

import React, { useState, useEffect } from 'react';
import ClientWidgets from '@/components/shared/client-widgets';
import ScrollToTopButton from './scroll-to-top-button';
import AdSlider from './ad-slider';

export default function DynamicWidgetsWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <ClientWidgets />
      <ScrollToTopButton />
      <AdSlider />
    </>
  );
}
