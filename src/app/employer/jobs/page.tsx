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
import { MoreHorizontal, PlusCircle, Users, Clock, BarChart, Briefcase, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import KpiCard from '@/app/employer/components/kpi-card';

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
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
);

const EmployerJobCard = ({ job, onDelete }: { job: Job; onDelete: (jobId: string) => void; }) => {
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
            <span className="text-muted-foreground flex items-center gap-2"><Users className="h-4 w-4" /> Total Applicants</span>
            <span className="font-semibold">{applicantCount}</span>
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
              <DropdownMenuItem asChild><Link href={`/jobs/${job.id}`}>View Listing</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/employer/applicants">View Applicants</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/employer/analytics"><BarChart className="mr-2" /> View Analytics</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast({ title: "Feature not implemented" })}>Edit Job</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete(job.id)}>Archive Job</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default function EmployerJobsPage() {
  const { toast } = useToast();
  // Demo employer is "Innovate Inc." which has id '1'
  const employerJobs = DUMMY_JOBS.filter(job => job.company.id === '1');
  
  const [jobs, setJobs] = useState<Job[]>(employerJobs);
  const [searchTerm, setSearchTerm] = useState('');

  const employerJobIds = jobs.map(j => j.id);
  const totalApplicants = DUMMY_APPLICANTS.filter(a => employerJobIds.includes(a.jobId)).length;

  const expiringSoonCount = jobs.filter(job => {
      // Create new Date objects to avoid mutating original data
      const posted = new Date(job.postedDate);
      const expires = new Date(posted.getTime());
      expires.setDate(posted.getDate() + 30); // Assuming 30-day expiration

      const daysUntilExpiry = (expires.getTime() - new Date().getTime()) / (1000 * 3600 * 24);
      return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
  }).length;

  const handleDelete = (jobId: string) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    toast({
        title: "Job Archived",
        description: "The job has been moved to your archives.",
        variant: "destructive"
    });
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-headline text-3xl font-bold">My Job Listings</h1>
                <p className="text-muted-foreground">Manage all jobs you have posted.</p>
            </div>
            <Button asChild className="w-full md:w-auto bg-accent-gradient">
                <Link href="/employer/jobs/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Post Job
                </Link>
            </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <KpiCard
                title="Total Job Listings"
                value={jobs.length.toString()}
                icon={<Briefcase />}
            />
            <KpiCard
                title="Total Applicants"
                value={totalApplicants.toString()}
                icon={<Users />}
            />
            <KpiCard
                title="New Applicants (7d)"
                value="23"
                trend="+5 this week"
                icon={<UserPlus />}
            />
            <KpiCard
                title="Expiring Soon"
                value={expiringSoonCount.toString()}
                trend="Renew to keep active"
                icon={<Clock />}
            />
        </div>

        <Card>
            <CardHeader>
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <Input 
                        placeholder="Search by job title..." 
                        className="w-full md:max-w-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
                <EmployerJobCard key={job.id} job={job} onDelete={handleDelete} />
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
