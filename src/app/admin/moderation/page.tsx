'use client';

import React, { useState } from 'react';
import { DUMMY_JOBS } from '@/lib/data';
import type { Job } from '@/lib/types';
import ModerationCard from '@/app/admin/components/moderation-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSearch, ShieldCheck, ShieldX, ShieldQuestion, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

type JobListProps = {
  jobs: Job[];
  selectedJob: Job | null;
  onSelectJob: (job: Job) => void;
  title: string;
};

const JobList = ({ jobs, selectedJob, onSelectJob, title }: JobListProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{title} ({jobs.length})</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <ScrollArea className="h-[600px]">
        <div className="space-y-1 p-2">
          {jobs.map(job => (
            <button
              key={job.id}
              onClick={() => onSelectJob(job)}
              className={cn(
                "w-full text-left p-3 rounded-lg hover:bg-muted transition-colors border-l-4 border-transparent",
                selectedJob?.id === job.id && "bg-primary/10 border-primary"
              )}
            >
              <p className="font-semibold truncate">{job.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building className="h-3 w-3" />
                <span>{job.company.name}</span>
              </div>
            </button>
          ))}
          {jobs.length === 0 && <p className="p-4 text-sm text-center text-muted-foreground">No jobs in this category.</p>}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);

export default function ModerationPage() {
    const pendingJobs = DUMMY_JOBS.slice(0, 5);
    const flaggedJobs = DUMMY_JOBS.slice(5, 7);
    const approvedJobs = DUMMY_JOBS.slice(7, 10);
    const rejectedJobs = DUMMY_JOBS.slice(10, 12);
    
    const [selectedPendingJob, setSelectedPendingJob] = useState<Job | null>(pendingJobs[0] || null);
    const [selectedFlaggedJob, setSelectedFlaggedJob] = useState<Job | null>(flaggedJobs[0] || null);
    const [selectedApprovedJob, setSelectedApprovedJob] = useState<Job | null>(approvedJobs[0] || null);
    const [selectedRejectedJob, setSelectedRejectedJob] = useState<Job | null>(rejectedJobs[0] || null);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Job Moderation</h1>
        <p className="text-muted-foreground">Review and manage job posts to ensure quality and safety.</p>
      </div>
      
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="pending"><ShieldQuestion className="mr-2"/> Pending Review</TabsTrigger>
            <TabsTrigger value="flagged"><FileSearch className="mr-2"/> AI Flagged</TabsTrigger>
            <TabsTrigger value="approved"><ShieldCheck className="mr-2"/> Approved</TabsTrigger>
            <TabsTrigger value="rejected"><ShieldX className="mr-2"/> Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <JobList jobs={pendingJobs} selectedJob={selectedPendingJob} onSelectJob={setSelectedPendingJob} title="Pending Queue" />
                </div>
                <div className="lg:col-span-2">
                    {selectedPendingJob ? (
                         <ModerationCard key={selectedPendingJob.id} job={selectedPendingJob} />
                    ) : (
                        <Card className="h-full flex items-center justify-center min-h-[600px]">
                            <p className="text-muted-foreground">Select a job to review.</p>
                        </Card>
                    )}
                </div>
            </div>
        </TabsContent>
         <TabsContent value="flagged">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                     <JobList jobs={flaggedJobs} selectedJob={selectedFlaggedJob} onSelectJob={setSelectedFlaggedJob} title="Flagged Queue" />
                </div>
                <div className="lg:col-span-2">
                    {selectedFlaggedJob ? (
                        <ModerationCard key={selectedFlaggedJob.id} job={selectedFlaggedJob} aiFlagged />
                    ) : (
                         <Card className="h-full flex items-center justify-center min-h-[600px]">
                            <p className="text-muted-foreground">No flagged jobs to review.</p>
                        </Card>
                    )}
                </div>
            </div>
        </TabsContent>
        <TabsContent value="approved">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                     <JobList jobs={approvedJobs} selectedJob={selectedApprovedJob} onSelectJob={setSelectedApprovedJob} title="Approved Jobs" />
                </div>
                <div className="lg:col-span-2">
                    {selectedApprovedJob ? (
                        <ModerationCard key={selectedApprovedJob.id} job={selectedApprovedJob} />
                    ) : (
                         <Card className="h-full flex items-center justify-center min-h-[600px]">
                            <p className="text-muted-foreground">No approved jobs to display.</p>
                        </Card>
                    )}
                </div>
            </div>
        </TabsContent>
        <TabsContent value="rejected">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <JobList jobs={rejectedJobs} selectedJob={selectedRejectedJob} onSelectJob={setSelectedRejectedJob} title="Rejected Jobs" />
                </div>
                <div className="lg:col-span-2">
                     {selectedRejectedJob ? (
                        <ModerationCard key={selectedRejectedJob.id} job={selectedRejectedJob} />
                    ) : (
                         <Card className="h-full flex items-center justify-center min-h-[600px]">
                            <p className="text-muted-foreground">No rejected jobs to display.</p>
                        </Card>
                    )}
                </div>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
