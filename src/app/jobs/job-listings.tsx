'use client';

import { useState, useEffect } from 'react';
import JobCard from '@/components/job-card';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { Job } from '@/lib/types';
import JobFilters from '@/components/job-filters';
import { Skeleton } from '@/components/ui/skeleton';
import EmptyState from '@/components/shared/empty-state';

export default function JobListings({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [isLoading, setIsLoading] = useState(true);
  const jobCount = jobs.length;

  useEffect(() => {
    // Simulate initial loading for UX demo
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold">All Jobs</h1>
          <p className="text-muted-foreground">{isLoading ? 'Finding the best roles...' : `${jobCount} jobs found`}</p>
        </div>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sr-only">Open job filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Job Filters</SheetTitle>
                <SheetDescription>
                  Refine your search to find the perfect job.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <JobFilters />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4 p-6 border rounded-2xl bg-card">
              <div className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-20 w-full rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
          ))}
          {jobs.length === 0 && (
              <div className="md:col-span-2 xl:grid-cols-3">
                <EmptyState 
                  title="No matching jobs"
                  description="We couldn't find any roles matching your current filters. Try adjusting your search criteria."
                  actionLabel="Reset Filters"
                  actionHref="/jobs"
                />
              </div>
          )}
        </div>
      )}
    </>
  );
}
