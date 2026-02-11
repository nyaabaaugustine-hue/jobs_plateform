'use client';

import { useState, useEffect } from 'react';
import { DUMMY_APPLICATIONS } from '@/lib/data';
import type { Application } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const statusColumns = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'] as const;

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Safely parse from localStorage
    let storedApps: Application[] = [];
    try {
      const storedData = localStorage.getItem('job-applications');
      if (storedData) {
        storedApps = JSON.parse(storedData);
      }
    } catch (error) {
      console.error("Failed to parse applications from localStorage", error);
    }
    
    // Combine dummy data with locally stored applications, avoiding duplicates
    const combinedApps = [...DUMMY_APPLICATIONS];
    if (storedApps.length > 0) {
      storedApps.forEach((storedApp) => {
        if (!combinedApps.some(app => app.id === storedApp.id)) {
            combinedApps.push(storedApp);
        }
      });
    }
    setApplications(combinedApps.sort((a,b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()));
    setIsLoading(false);
  }, []);

  const applicationsByStatus = statusColumns.reduce((acc, status) => {
    acc[status] = applications.filter((app) => app.status === status);
    return acc;
  }, {} as Record<typeof statusColumns[number], Application[]>);

  if (isLoading) {
    return (
       <div className="space-y-8">
        <div>
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {statusColumns.map((status) => (
            <div key={status} className="w-80 shrink-0">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-4 bg-secondary p-2 rounded-lg h-full">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">Track your job applications from start to finish.</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
        {statusColumns.map((status) => (
          <div key={status} className="w-80 shrink-0">
            <h2 className="font-semibold mb-4 px-1">{status} ({applicationsByStatus[status].length})</h2>
            <div className="space-y-4 bg-secondary p-2 rounded-lg h-full">
              {applicationsByStatus[status].map((app) => (
                <Card key={app.id} className="w-full shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">{app.job.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium">{app.job.company.name}</p>
                    <p className="text-xs text-muted-foreground">Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                    <Badge variant="outline" className="mt-2">{app.job.location}</Badge>
                  </CardContent>
                </Card>
              ))}
               {applicationsByStatus[status].length === 0 && (
                <div className="flex h-32 items-center justify-center rounded-lg border-dashed border-2 text-sm text-muted-foreground">
                    No applications
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
