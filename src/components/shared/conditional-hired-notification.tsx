'use client';

import { usePathname } from 'next/navigation';
import HiredNotification from '@/components/hired-notification';

export default function ConditionalHiredNotification() {
  const pathname = usePathname();

  // Do not show on any dashboard pages
  const isDashboardPage =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/employer');

  if (isDashboardPage) {
    return null;
  }

  return <HiredNotification />;
}
