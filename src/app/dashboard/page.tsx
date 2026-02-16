
'use client';

import { useState, useEffect } from 'react';
import { DUMMY_JOBS, DUMMY_APPLICATIONS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import JobRecommendations from '@/components/job-recommendations';
import KpiCard, { KpiCardSkeleton } from './components/KpiCard';
import { FileText, Bookmark, Eye, Search, UserCheck } from 'lucide-react';
import ApplicationStatusTracker from './components/ApplicationStatusTracker';
import ProfileCompletion from './components/ProfileCompletion';
import SavedJobsSummary from './components/SavedJobsSummary';

export default function JobSeekerDashboard() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const savedJobs = DUMMY_JOBS.filter((job, index) => [3, 4, 6, 8, 10].includes(index));
  const interviewsScheduled = DUMMY_APPLICATIONS.filter((a) => a.status === 'INTERVIEW').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold">Welcome Back, John!</h1>
            <p className="text-muted-foreground">Here is your job search dashboard.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button asChild variant="outline"><Link href="/dashboard/profile">Edit Profile</Link></Button>
            <Button asChild className="bg-primary"><Link href="/jobs"><Search className="mr-2"/> Find a Job</Link></Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {!isClient ? (
          <>
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
          </>
        ) : (
          <>
            <KpiCard
              title="Applications Sent"
              value={DUMMY_APPLICATIONS.length.toString()}
              trend={`+${DUMMY_APPLICATIONS.filter(a => a.status === "APPLIED").length} this month`}
              icon={<FileText />}
            />
            <KpiCard
              title="Interviews"
              value={interviewsScheduled.toString()}
              trend="+2 this week"
              icon={<UserCheck />}
            />
            <KpiCard
              title="Profile Views"
              value="42"
              trend="+15% this week"
              icon={<Eye />}
            />
            <KpiCard
              title="Saved Jobs"
              value={savedJobs.length.toString()}
              trend="1 new today"
              icon={<Bookmark />}
              trendDirection="down"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
            <ApplicationStatusTracker />
            <JobRecommendations />
        </div>
        <div className="lg:col-span-5 space-y-6">
            <ProfileCompletion />
            <SavedJobsSummary />
        </div>
      </div>
    </div>
  );
}
