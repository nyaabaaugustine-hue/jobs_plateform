'use client';

import { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';

import JobCard from '@/components/job-card';
import JobFilters from '@/components/job-filters';
import Header from '@/components/shared/header';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import PageHero from '@/components/shared/page-hero';
import Footer from '@/components/shared/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Job } from '@/lib/types';


const JobCardSkeleton = () => (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="flex flex-row items-start gap-4 bg-secondary/30 p-4">
        <Skeleton className="h-16 w-16 shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-3 w-1/4" />
            <div className="flex flex-wrap gap-1">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-full" />
            </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-4 flex items-center justify-between bg-secondary/30">
        <div className="space-y-1">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-10 w-28 rounded-lg" />
      </CardFooter>
    </Card>
);

type JobDocument = Omit<Job, 'company'> & {
  companyId: string;
  companyName: string;
  companyLogo: string;
};

export default function JobSearchPage() {
  const firestore = useFirestore();

  const jobsQuery = useMemoFirebase(() => {
    return query(collection(firestore, 'jobs'), orderBy('postedDate', 'desc'));
  }, [firestore]);

  const { data: jobDocs, isLoading, error } = useCollection<JobDocument>(jobsQuery);
  
  const jobs: Job[] | undefined = useMemo(() => 
    jobDocs?.map(doc => ({
        ...doc,
        company: {
            id: doc.companyId,
            name: doc.companyName,
            logo: doc.companyLogo,
            // The following fields are not available in the flattened 'jobs' collection
            // but are part of the 'Company' type. They are not used by JobCard, so empty strings are safe.
            industry: '',
            location: doc.location, // location is on the job doc
            description: '',
            website: '',
            employerId: doc.employerId || ''
        }
    }))
  , [jobDocs]);

  const jobCount = jobs?.length ?? 0;

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
      <main className="flex flex-1">
        <aside className="hidden w-80 border-r bg-background p-4 lg:block">
          <JobFilters />
        </aside>
        <div className="flex-1 p-4 lg:p-6">
          <div className="mb-4 flex items-center justify-between">
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
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
             {isLoading ? (
              Array.from({ length: 9 }).map((_, i) => <JobCardSkeleton key={i} />)
            ) : error ? (
                <div className="md:col-span-2 xl:col-span-3 text-center text-destructive p-8 bg-destructive/10 rounded-lg">
                    <p className="font-bold">An error occurred while loading jobs.</p>
                    <p className="text-sm">{error.message}</p>
                </div>
            ) : (
              jobs?.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            )}
            {!isLoading && !error && jobs?.length === 0 && (
                <div className="md:col-span-2 xl:col-span-3 text-center text-muted-foreground p-8 bg-secondary rounded-lg">
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
