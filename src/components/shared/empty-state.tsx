'use client';

import { SearchX, FileQuestion, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: 'search' | 'file' | 'alert';
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon = 'search',
  actionLabel,
  actionHref,
  className
}: EmptyStateProps) {
  const icons = {
    search: SearchX,
    file: FileQuestion,
    alert: AlertCircle,
  };

  const Icon = icons[icon];

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-12 rounded-[2rem] border-2 border-dashed bg-secondary/20",
      className
    )}>
      <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-muted-foreground/50" />
      </div>
      <h3 className="font-headline text-2xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-8">{description}</p>
      {actionLabel && actionHref && (
        <Button asChild size="lg" className="rounded-xl font-bold">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
