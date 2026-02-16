'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type KpiCardProps = {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  trendDirection?: 'up' | 'down';
};

export default function KpiCard({ title, value, trend, icon, trendDirection = 'up' }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <p className={cn(
              "flex items-center gap-1",
              trendDirection === 'up' ? 'text-emerald-500' : 'text-rose-500'
          )}>
            {trendDirection === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function KpiCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-2/4" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-3 w-3/5 mt-2" />
      </CardContent>
    </Card>
  );
}
