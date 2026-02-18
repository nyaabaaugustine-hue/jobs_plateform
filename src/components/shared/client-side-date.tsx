'use client';

import { useState, useEffect } from 'react';
import { format, formatDistanceToNow, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

type ClientSideDateProps = {
  dateString: string;
  formatType?: 'distance' | 'long' | 'deadline';
  className?: string;
};

export default function ClientSideDate({
  dateString,
  formatType = 'distance',
  className,
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

  // Use a stable span fallback during hydration to prevent mismatches.
  // Standardizing to <span> prevents ChunkLoadError related to invalid DOM nesting.
  if (!formattedDate) {
    return <span className={cn("animate-pulse bg-muted rounded inline-block min-w-[80px]", className)}>&nbsp;</span>;
  }

  return <span className={className}>{formattedDate}</span>;
}
