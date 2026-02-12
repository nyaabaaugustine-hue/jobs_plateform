'use client';

import { useState, useEffect } from 'react';
import JobCard from '@/components/job-card';
import JobFilters from '@/components/job-filters';
import Header from '@/components/shared/header';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import PageHero from '@/components/shared/page-hero';
import Footer from '@/components/shared/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Job } from '@/lib/types';
import { DUMMY_JOBS } from '@/lib/data';

const JobCardSkeleton = () => (
    <Card className="flex h-full flex-col overflow-hidden border-t-4 border-primary/10">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Skeleton className="h-16 w-16 shrink-0 rounded-xl border p-2" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0 space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-28" />
        </div>
        <div className="space-y-2 pt-4 border-t">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
      </CardContent>
      <CardFooter className="p-4 flex items-end justify-between bg-secondary/50">
        <div className="space-y-1">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-10 w-28 rounded-lg" />
      </CardFooter>
    </Card>
);

export default function JobSearchPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading demo data
    setTimeout(() => {
      setJobs(DUMMY_JOBS);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const jobCount = jobs.length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <PageHero
        title="Find Your Next Opportunity"
        subtitle={
          isLoading 
            ? 'Searching for the best opportunities...' 
            : `Browse through ${jobCount} open positions to find your perfect match.`
        }
      />
      <main className="flex flex-1 bg-secondary/30">
        <aside className="hidden w-80 border-r bg-background p-4 lg:block">
          <div className="sticky top-24">
            <JobFilters />
          </div>
        </aside>
        <div className="flex-1 p-4 lg:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-headline text-2xl font-bold">All Jobs</h1>
              {isLoading ? (
                <Skeleton className="h-5 w-24 mt-1" />
              ) : (
                <p className="text-muted-foreground">{jobCount} jobs found</p>
              )}
            </div>
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
             {isLoading ? (
              Array.from({ length: 9 }).map((_, i) => <JobCardSkeleton key={i} />)
            ) : (
              jobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            )}
            {!isLoading && jobs?.length === 0 && (
                <div className="md:col-span-2 xl:grid-cols-3 text-center text-muted-foreground p-8 bg-secondary rounded-lg">
                    <p>No jobs found.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
