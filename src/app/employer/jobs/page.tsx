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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const JobTableRow = ({ job }: { job: Job }) => {
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

  const statusBadgeClass = status === 'Active' 
    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
    : 'bg-destructive/10 text-destructive border-destructive/20';
    
  if (status === null || postedAt === null) {
      return (
          <TableRow>
              <TableCell colSpan={5} className="p-2">
                  <Skeleton className="h-12 w-full" />
              </TableCell>
          </TableRow>
      );
  }

  return (
     <TableRow>
        <TableCell>
            <div className="font-bold hover:text-primary"><Link href={`/jobs/${job.id}`}>{job.title}</Link></div>
            <div className="text-sm text-muted-foreground">{job.company.name}</div>
        </TableCell>
        <TableCell>
            <Badge variant="outline" className={cn('font-semibold', statusBadgeClass)}>{status}</Badge>
        </TableCell>
        <TableCell className="text-center">
             <Badge variant="secondary" className="text-base">{applicantCount}</Badge>
        </TableCell>
        <TableCell>{postedAt}</TableCell>
        <TableCell className="text-right">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild><Link href={`/jobs/${job.id}`}>View Listing</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/employer/applicants">View Applicants</Link></DropdownMenuItem>
                  <DropdownMenuItem>Edit Job</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Archive Job</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>
  );
};

export default function EmployerJobsPage() {
  // Demo employer is "Innovate Inc." which has id '1'
  const employerJobs = DUMMY_JOBS.filter(job => job.company.id === '1');
  
  const [jobs] = useState<Job[]>(employerJobs);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
     <div className="space-y-8">
        <div>
            <h1 className="font-headline text-3xl font-bold">My Job Listings</h1>
            <p className="text-muted-foreground">Manage all jobs you have posted.</p>
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
                    <Button asChild className="w-full md:w-auto bg-accent-gradient">
                        <Link href="/employer/jobs/new">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Post Job
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[40%]">Job Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Applicants</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredJobs.map((job) => (
                    <JobTableRow key={job.id} job={job} />
                    ))}
                    {filteredJobs.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                        No jobs found.
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
