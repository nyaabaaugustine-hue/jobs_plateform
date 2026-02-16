'use client';

import React from 'react';
import ClientWidgets from '@/components/shared/client-widgets';
import ScrollToTopButton from './scroll-to-top-button';

export default function DynamicWidgetsWrapper() {
  return (
    <>
      <ClientWidgets />
      <ScrollToTopButton />
    </>
  );
}
