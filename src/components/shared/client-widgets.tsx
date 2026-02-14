'use client';

import dynamic from 'next/dynamic';

// Dynamically import client components that should not be server-side rendered
const HiredNotification = dynamic(() => import('@/components/hired-notification'), { ssr: false });
const AISupportWidget = dynamic(() => import('@/components/ai-support-widget'), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <HiredNotification />
      <AISupportWidget />
    </>
  );
}
