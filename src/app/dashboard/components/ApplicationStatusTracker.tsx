
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Eye, MessageSquare, Award, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { DUMMY_APPLICATIONS } from '@/lib/data';
import type { Application, ApplicationStatus } from '@/lib/types';
import React from 'react';
import { cn } from '@/lib/utils';

// Define the UI labels for the statuses
type StatusLabel = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';

// Config object keyed by the UI label
const statusConfig: Record<StatusLabel, { icon: React.ReactNode, color: string }> = {
    'Applied': { icon: <FileText className="h-4 w-4" />, color: 'bg-blue-500/10 text-blue-500' },
    'Screening': { icon: <Eye className="h-4 w-4" />, color: 'bg-yellow-500/10 text-yellow-600' },
    'Interview': { icon: <MessageSquare className="h-4 w-4" />, color: 'bg-purple-500/10 text-purple-500' },
    'Offer': { icon: <Award className="h-4 w-4" />, color: 'bg-orange-500/10 text-orange-500' },
    'Hired': { icon: <CheckCircle className="h-4 w-4" />, color: 'bg-emerald-500/10 text-emerald-600' },
    'Rejected': { icon: <XCircle className="h-4 w-4" />, color: 'bg-destructive/10 text-destructive' },
};


export default function ApplicationStatusTracker() {
  const getStatusLabel = (status: ApplicationStatus): StatusLabel => {
    switch (status) {
      case 'APPLIED': return 'Applied';
      case 'UNDER_REVIEW':
      case 'SHORTLISTED': return 'Screening';
      case 'INTERVIEW': return 'Interview';
      case 'OFFER': return 'Offer';
      case 'HIRED': return 'Hired';
      case 'REJECTED': return 'Rejected';
      default: return 'Applied';
    }
  };

  const statusCounts = DUMMY_APPLICATIONS.reduce((acc, app) => {
    const label = getStatusLabel(app.status);
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {} as Record<StatusLabel, number>);

  const statuses: StatusLabel[] = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

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
                  {config.icon}
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
