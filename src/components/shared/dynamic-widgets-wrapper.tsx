'use client';

import dynamic from 'next/dynamic';

const HiredNotification = dynamic(() => import('@/components/hired-notification'), {
  ssr: false,
});

const AISupportWidget = dynamic(() => import('@/components/ai-support-widget'), {
  ssr: false,
});


export default function DynamicWidgetsWrapper() {
  return (
    <>
        <HiredNotification />
        <AISupportWidget />
    </>
  );
}
