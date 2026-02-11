'use client';

import { useState, useEffect } from 'react';
import { DUMMY_JOBS, DUMMY_APPLICANTS } from '@/lib/data';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
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

  if (status === null || postedAt === null) {
    return (
      <TableRow>
        <TableCell>
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-32 mt-2" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-20" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-6 w-16 rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-24" />
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end">
            <Skeleton className="h-8 w-8" />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{job.title}</div>
        <div className="text-sm text-muted-foreground">{job.company.name} • {job.location}</div>
      </TableCell>
      <TableCell>
        {applicantCount} applicant(s)
      </TableCell>
      <TableCell>
        <Badge variant={status === 'Active' ? 'default' : 'secondary'}>{status}</Badge>
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
            <DropdownMenuItem asChild><Link href={`/jobs/${job.id}`}>View Job</Link></DropdownMenuItem>
            <DropdownMenuItem>Edit Job</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Delete Job</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default function AdminJobsPage() {
  const [jobs] = useState<Job[]>(DUMMY_JOBS);
  const [searchTerm, setSearchTerm] = useState('');

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
        <Button asChild>
          <Link href="/employer/jobs/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Job
          </Link>
        </Button>
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
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Posted</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
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
