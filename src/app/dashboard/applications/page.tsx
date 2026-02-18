'use client';

import React, { useState, useEffect } from 'react';
import { DUMMY_APPLICATIONS } from '@/lib/data';
import type { Application, ApplicationStatus } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Eye, MessageSquare, Award, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the UI columns and their properties in a single config object.
const statusColumnConfig = [
    { id: 'APPLIED', label: 'Applied', icon: FileText, textColor: 'text-primary dark:text-primary', bgColor: 'bg-primary/5', borderColor: 'border-primary/20' },
    { id: 'SCREENING', label: 'Screening', icon: Eye, textColor: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-500/5', borderColor: 'border-yellow-500/20' },
    { id: 'INTERVIEW', label: 'Interview', icon: MessageSquare, textColor: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-500/5', borderColor: 'border-purple-500/20' },
    { id: 'OFFER', label: 'Offer', icon: Award, textColor: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-500/5', borderColor: 'border-orange-500/20' },
    { id: 'HIRED', label: 'Hired', icon: CheckCircle, textColor: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-500/5', borderColor: 'border-emerald-500/20' },
    { id: 'REJECTED', label: 'Rejected', icon: XCircle, textColor: 'text-destructive', bgColor: 'bg-destructive/5', borderColor: 'border-destructive/20' },
] as const;

type StatusColumnLabel = typeof statusColumnConfig[number]['label'];

// A helper function to map data model status to UI column label
const getStatusColumnLabel = (appStatus: ApplicationStatus): StatusColumnLabel => {
    switch (appStatus) {
        case 'APPLIED':
            return 'Applied';
        case 'UNDER_REVIEW':
        case 'SHORTLISTED':
            return 'Screening';
        case 'INTERVIEW':
            return 'Interview';
        case 'OFFER':
            return 'Offer';
        case 'HIRED':
            return 'Hired';
        case 'REJECTED':
            return 'Rejected';
        default:
            return 'Applied'; // Fallback
    }
};


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

  // Group applications into the correct UI columns
  const applicationsByStatus = applications.reduce((acc, app) => {
      const columnLabel = getStatusColumnLabel(app.status);
      if (!acc[columnLabel]) {
          acc[columnLabel] = [];
      }
      acc[columnLabel].push(app);
      return acc;
  }, {} as Record<StatusColumnLabel, Application[]>);

  if (isLoading) {
    return (
       <div className="space-y-8">
        <div>
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {statusColumnConfig.map((config) => (
            <div key={config.id} className="w-80 shrink-0">
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
        {statusColumnConfig.map((config) => {
          const Icon = config.icon;
          const appsInStatus = applicationsByStatus[config.label] || [];
          return (
            <div key={config.id} className="w-80 shrink-0">
              <h2 className={cn("font-semibold mb-4 px-1 flex items-center gap-2", config.textColor)}>
                <Icon className="h-5 w-5" />
                {config.label} ({appsInStatus.length})
              </h2>
              <div className={cn("space-y-4 p-2 rounded-lg h-full border-t-4", config.bgColor, config.borderColor)}>
                {appsInStatus.map((app) => (
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
                {appsInStatus.length === 0 && (
                  <div className="flex h-32 items-center justify-center rounded-lg border-dashed border-2 text-sm text-muted-foreground">
                      No applications
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
