'use client';

import dynamic from 'next/dynamic';

const LiveActivityBar = dynamic(() => import('@/components/live-activity-bar'), { ssr: false });
const AISupportWidget = dynamic(() => import('@/components/ai-support-widget'), { ssr: false });
const WhatsAppWidget = dynamic(() => import('@/components/whatsapp-widget'), { ssr: false });

export default function DynamicClientWidgets() {
  return (
    <>
      <LiveActivityBar />
      <AISupportWidget />
      <WhatsAppWidget />
    </>
  );
}
