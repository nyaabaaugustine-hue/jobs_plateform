'use client';

import { useState } from 'react';
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

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(DUMMY_JOBS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs
    .filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getApplicantCount = (jobId: string) => {
    return DUMMY_APPLICANTS.filter(app => app.jobId === jobId).length;
  }

  const getJobStatus = (postedDate: string) => {
      const daysSincePosted = (new Date().getTime() - new Date(postedDate).getTime()) / (1000 * 3600 * 24);
      return daysSincePosted > 30 ? 'Expired' : 'Active';
  }

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
              {filteredJobs.map((job) => {
                const applicantCount = getApplicantCount(job.id);
                const status = getJobStatus(job.postedDate);
                return (
                  <TableRow key={job.id}>
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
                    <TableCell>{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</TableCell>
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
              })}
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
