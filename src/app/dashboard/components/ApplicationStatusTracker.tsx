'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Eye, MessageSquare, Award, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { DUMMY_APPLICATIONS } from '@/lib/data';
import type { Application } from '@/lib/types';
import React from 'react';
import { cn } from '@/lib/utils';

const statusConfig: Record<Application['status'], { icon: React.ReactElement, color: string }> = {
    Applied: { icon: <FileText />, color: 'bg-blue-500/10 text-blue-500' },
    Screening: { icon: <Eye />, color: 'bg-yellow-500/10 text-yellow-600' },
    Interview: { icon: <MessageSquare />, color: 'bg-purple-500/10 text-purple-500' },
    Offer: { icon: <Award />, color: 'bg-orange-500/10 text-orange-500' },
    Hired: { icon: <CheckCircle />, color: 'bg-emerald-500/10 text-emerald-600' },
    Rejected: { icon: <XCircle />, color: 'bg-destructive/10 text-destructive' },
};


export default function ApplicationStatusTracker() {
  const statusCounts = DUMMY_APPLICATIONS.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<Application['status'], number>);

  const statuses: Application['status'][] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Application Pipeline</CardTitle>
            <CardDescription>A summary of your current application statuses.</CardDescription>
          </div>
           <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/applications">View Board <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {statuses.map(status => {
            const count = statusCounts[status] || 0;
            if (count === 0) return null;
            
            const config = statusConfig[status];
            
            return (
              <div key={status} className={cn('p-3 rounded-lg', config.color)}>
                <div className="flex items-center gap-2 mb-1">
                  {React.cloneElement(config.icon, { className: "h-4 w-4" })}
                  <p className="text-xs font-medium text-foreground/80">{status}</p>
                </div>
                <p className="text-xl font-bold text-foreground">{count}</p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  );
}
