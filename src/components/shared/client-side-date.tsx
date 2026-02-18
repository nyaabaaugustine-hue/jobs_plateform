
'use client';

import { useState, useEffect } from 'react';
import { format, formatDistanceToNow, addDays } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

type ClientSideDateProps = {
  dateString: string;
  formatType?: 'distance' | 'long' | 'deadline';
  className?: string;
  skeletonClassName?: string;
};

export default function ClientSideDate({
  dateString,
  formatType = 'distance',
  className,
  skeletonClassName = "h-4 w-24 inline-block",
}: ClientSideDateProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    if (!dateString) return;
    try {
      const date = new Date(dateString);
      let newFormattedDate = '';
      if (formatType === 'distance') {
        newFormattedDate = formatDistanceToNow(date, { addSuffix: true });
      } else if (formatType === 'long') {
        newFormattedDate = format(date, 'MMMM dd, yyyy');
      } else if (formatType === 'deadline') {
        newFormattedDate = format(addDays(date, 30), 'MMMM dd, yyyy');
      }
      setFormattedDate(newFormattedDate);
    } catch (error) {
      console.error("Failed to format date:", dateString, error);
      setFormattedDate('Invalid Date');
    }
  }, [dateString, formatType]);

  // Use a span for the skeleton to prevent block vs inline hydration errors
  if (!formattedDate) {
    return <span className={skeletonClassName}><Skeleton className="h-full w-full" /></span>;
  }

  return <span className={className}>{formattedDate}</span>;
}
