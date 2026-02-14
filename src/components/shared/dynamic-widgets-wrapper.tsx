
'use client';

import dynamic from 'next/dynamic';

const ClientWidgets = dynamic(() => import('@/components/shared/client-widgets'), {
  ssr: false,
});

export default function DynamicWidgetsWrapper() {
  return <ClientWidgets />;
}
