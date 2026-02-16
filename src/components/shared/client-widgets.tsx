'use client';

import AISupportWidget from '@/components/ai-support-widget';
import HiredNotification from '@/components/hired-notification';

export default function ClientWidgets() {
  // Logic to conditionally render has been moved into the child components
  // to comply with the Rules of Hooks.
  return (
    <>
      <AISupportWidget />
      <HiredNotification />
    </>
  );
}
