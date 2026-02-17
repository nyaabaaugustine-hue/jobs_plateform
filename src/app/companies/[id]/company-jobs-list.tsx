'use client';

import JobCard from '@/components/job-card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { DUMMY_APPLICANTS } from '@/lib/data';
import type { Job } from '@/lib/types';

export default function CompanyJobsList({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No open positions at the moment.</p>;
  }

  return (
    <div className="space-y-8">
      {jobs.map(job => {
        const hiredCount = DUMMY_APPLICANTS.filter(a => a.jobId === job.id && a.status === 'Hired').length;
        return (
          <div key={job.id}>
            <JobCard job={job} />
            {hiredCount > 0 && (
              <div className="mt-2 flex items-center justify-center">
                <Badge variant="secondary" className="bg-emerald-100 border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400">
                  <Users className="mr-2 h-4 w-4" />
                  {hiredCount} {hiredCount > 1 ? 'people' : 'person'} hired for this role
                </Badge>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
