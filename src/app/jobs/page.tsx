import JobCard from '@/components/job-card';
import JobFilters from '@/components/job-filters';
import Header from '@/components/shared/header';
import { DUMMY_JOBS } from '@/lib/data';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function JobSearchPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-secondary">
      <Header />
      <main className="flex flex-1">
        <aside className="hidden w-80 border-r bg-background p-4 lg:block">
          <JobFilters />
        </aside>
        <div className="flex-1 p-4 lg:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="font-headline text-2xl font-bold">All Jobs</h1>
              <p className="text-muted-foreground">{DUMMY_JOBS.length} jobs found</p>
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
            {DUMMY_JOBS.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
