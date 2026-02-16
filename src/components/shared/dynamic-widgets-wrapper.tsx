'use client';

import React from 'react';
import ClientWidgets from '@/components/shared/client-widgets';

export default function DynamicWidgetsWrapper() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ClientWidgets />;
}
