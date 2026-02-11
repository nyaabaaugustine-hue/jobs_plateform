'use client';

import { useState } from 'react';
import { DUMMY_JOBS, DUMMY_APPLICANTS } from '@/lib/data';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from '@/components/ui/card';
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
import { MoreHorizontal, PlusCircle, Eye, Save, FileText, ListChecks, MessageSquareQuote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function EmployerJobsPage() {
  // Demo employer is "Innovate Inc." which has id '1'
  const employerJobs = DUMMY_JOBS.filter(job => job.company.id === '1');
  
  const [jobs, setJobs] = useState<Job[]>(employerJobs);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="font-headline text-3xl font-bold">My Job Listings</h1>
          <p className="text-muted-foreground">Manage all jobs you have posted.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Post a New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl font-bold">Post a New Job</DialogTitle>
              <DialogDescription>
                Fill out the details below to find your next great hire.
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="details" className="w-full pt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details"><FileText className="mr-2" />Job Details</TabsTrigger>
                <TabsTrigger value="description"><ListChecks className="mr-2" />Description</TabsTrigger>
                <TabsTrigger value="screening"><MessageSquareQuote className="mr-2" />Screening</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="job-title">Job Title</Label>
                    <Input id="job-title" placeholder="e.g., Senior React Developer" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g., San Francisco, CA or Remote" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-type">Job Type</Label>
                      <Select>
                        <SelectTrigger id="job-type">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="salary-range">Salary Range</Label>
                      <Input id="salary-range" placeholder="e.g., GH₵120k - GH₵160k" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience-level">Experience Level</Label>
                      <Select>
                        <SelectTrigger id="experience-level">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry-level</SelectItem>
                          <SelectItem value="mid">Mid-level</SelectItem>
                          <SelectItem value="senior">Senior-level</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="description">
                <div className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea id="description" placeholder="Describe the role, responsibilities, and qualifications..." rows={10} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <Input id="skills" placeholder="e.g., React, TypeScript, Next.js (comma-separated)" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="screening">
                <div className="space-y-4 pt-6">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Label htmlFor="question1" className="flex-1">What is your expected salary?</Label>
                    <Checkbox id="question1" checked/>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Label htmlFor="question2" className="flex-1">Are you authorized to work in the specified location?</Label>
                    <Checkbox id="question2" checked/>
                  </div>
                  <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Custom Question</Button>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="justify-end gap-4 border-t pt-6 mt-6">
              <Button variant="outline"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
              <Button size="lg"><Save className="mr-2 h-4 w-4" /> Save & Publish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
           <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
             <Input 
                placeholder="Search by job title..." 
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
                <TableHead>Job Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applicants</TableHead>
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
                        <div className="text-sm text-muted-foreground">{job.location}</div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={status === 'Active' ? 'default' : 'secondary'}>{status}</Badge>
                    </TableCell>
                    <TableCell>
                        <Link href="/employer/applicants" className="hover:underline">
                            {applicantCount} applicant(s)
                        </Link>
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
                          <DropdownMenuItem asChild><Link href={`/jobs/${job.id}`}>View Listing</Link></DropdownMenuItem>
                          <DropdownMenuItem asChild><Link href="/employer/applicants">View Applicants</Link></DropdownMenuItem>
                          <DropdownMenuItem>Edit Job</DropdownMenuItem>
                           <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Archive Job</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )})}
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
