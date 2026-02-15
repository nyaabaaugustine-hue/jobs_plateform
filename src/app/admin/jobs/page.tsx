'use client';

import { useState, useEffect } from 'react';
import { DUMMY_JOBS, DUMMY_APPLICANTS } from '@/lib/data';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Users, MapPin, Clock, Upload, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const CardSkeleton = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <Separator />
        <div className="flex justify-between items-center pt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-8" />
        </div>
         <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
        </div>
         <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
);

const AdminJobCard = ({ job, onDelete }: { job: Job; onDelete: (jobId: string) => void }) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<string | null>(null);
  const [postedAt, setPostedAt] = useState<string | null>(null);
  const applicantCount = DUMMY_APPLICANTS.filter(app => app.jobId === job.id).length;

  useEffect(() => {
    const getJobStatus = (postedDate: string) => {
      const daysSincePosted = (new Date().getTime() - new Date(postedDate).getTime()) / (1000 * 3600 * 24);
      return daysSincePosted > 30 ? 'Expired' : 'Active';
    };
    
    setStatus(getJobStatus(job.postedDate));
    setPostedAt(formatDistanceToNow(new Date(job.postedDate), { addSuffix: true }));
  }, [job.postedDate]);

  if (status === null || postedAt === null) {
    return <CardSkeleton />;
  }

  const statusBadgeClass = status === 'Active' 
    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
    : 'bg-destructive/10 text-destructive border-destructive/20';

  return (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-lg leading-tight hover:text-primary"><Link href={`/jobs/${job.id}`}>{job.title}</Link></CardTitle>
                <CardDescription className="pt-1">{job.company.name}</CardDescription>
            </div>
            <Badge variant="outline" className={cn('font-semibold', statusBadgeClass)}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3 pt-0">
        <Separator />
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4" /> Applicants</span>
            <span className="font-semibold">{applicantCount}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</span>
            <span className="font-semibold">{job.location}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4" /> Posted</span>
            <span className="font-semibold">{postedAt}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild><Link href={`/jobs/${job.id}`}>View Job</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast({ title: 'Feature not implemented', description: 'This would open an editor for the job.' })}>Edit Job</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete(job.id)}>Delete Job</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default function AdminJobsPage() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(DUMMY_JOBS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteJob = (jobId: string) => {
    setJobs(prevJobs => prevJobs.filter(j => j.id !== jobId));
    toast({
      title: 'Job Deleted',
      description: 'The job has been removed from the platform.',
      variant: 'destructive',
    });
  };

  const filteredJobs = jobs
    .filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Job Management</h1>
          <p className="text-muted-foreground">Manage all jobs on the platform.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => toast({ title: 'Exporting Jobs...', description: 'This would trigger a CSV download.' })}><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button variant="outline" onClick={() => toast({ title: 'Importing Jobs...', description: 'This would open a file upload dialog.' })}><Upload className="mr-2 h-4 w-4" /> Import</Button>
            <Button asChild>
            <Link href="/employer/jobs/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Job
            </Link>
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input 
                placeholder="Search by job title or company..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <AdminJobCard key={job.id} job={job} onDelete={handleDeleteJob} />
        ))}
        {filteredJobs.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3">
              <CardContent className="h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">No jobs found.</p>
              </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
