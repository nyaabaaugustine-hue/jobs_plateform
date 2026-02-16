'use client';

import AISupportWidget from '@/components/ai-support-widget';
import ConditionalHiredNotification from '@/components/shared/conditional-hired-notification';

export default function ClientWidgets() {
  return (
    <>
      <AISupportWidget />
      <ConditionalHiredNotification />
    </>
  );
}
