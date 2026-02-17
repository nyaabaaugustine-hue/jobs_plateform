
'use client';

import React from 'react';
import ClientWidgets from '@/components/shared/client-widgets';
import ScrollToTopButton from './scroll-to-top-button';
import AdSlider from './ad-slider';

export default function DynamicWidgetsWrapper() {
  return (
    <>
      <ClientWidgets />
      <ScrollToTopButton />
      <AdSlider />
    </>
  );
}
