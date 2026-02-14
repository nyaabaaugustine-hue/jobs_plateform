
'use client';

import React, { useState, useEffect } from 'react';
import { DUMMY_JOBS, DUMMY_USERS } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Clock, Wallet, MapPin, Zap, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import type { Application, Applicant, User } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SocialShareButtons from '@/components/shared/social-share-buttons';

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = React.use(params);
  const job = DUMMY_JOBS.find((j) => j.id === id);

  const { toast } = useToast();
  const [isApplied, setIsApplied] = useState(false);
  const [postedAt, setPostedAt] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const currentUser: User = {
    id: 'user-john-doe',
    name: 'John Doe',
    email: 'john.doe@email.com',
    avatar: 'avatar-13',
    role: 'jobSeeker',
    professionalTitle: 'Senior React Developer'
  };

  useEffect(() => {
    if (!job) return;
    
    setPostedAt(formatDistanceToNow(new Date(job.postedDate), { addSuffix: true }));

    try {
      const applications: Application[] = JSON.parse(localStorage.getItem('job-applications') || '[]');
      const hasApplied = applications.some(app => app.job.id === job.id && app.user.id === currentUser.id);
      setIsApplied(hasApplied);
    } catch (error) {
      console.error("Failed to parse applications from localStorage", error);
    }
  }, [job, currentUser.id]);

  if (!job) {
    notFound();
  }

  const handleApply = () => {
    // Create new application for candidate dashboard
    const newApplication: Application = {
        id: `app-${Date.now()}`,
        job: job,
        user: currentUser,
        status: 'APPLIED',
        appliedDate: new Date().toISOString(),
        coverLetter: coverLetter,
    };
    
    // Create new applicant record for employer dashboard
    const newApplicant: Applicant = {
        id: `applicant-${Date.now()}`,
        userId: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        avatar: currentUser.avatar,
        jobId: job.id,
        skillMatch: Math.floor(Math.random() * (98 - 75 + 1)) + 75, // Random score
        experience: 5, // Dummy experience
        status: 'New',
        coverLetter: coverLetter,
    };

    try {
        const applications: Application[] = JSON.parse(localStorage.getItem('job-applications') || '[]');
        localStorage.setItem('job-applications', JSON.stringify([...applications, newApplication]));
        
        const applicants: Applicant[] = JSON.parse(localStorage.getItem('job-applicants-data') || '[]');
        localStorage.setItem('job-applicants-data', JSON.stringify([...applicants, newApplicant]));
    } catch(error) {
        console.error("Failed to save application to localStorage", error);
        toast({
            title: "Application Failed",
            description: "Could not save your application. Please try again.",
            variant: 'destructive',
        });
        return;
    }

    setIsApplied(true);
    setIsDialogOpen(false);
    setCoverLetter('');
    toast({
        title: "Application Submitted!",
        description: `You have successfully applied for the ${job.title} position.`,
        variant: 'vibrant',
    });
  };

  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);

  return (
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {companyLogo && (
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-background p-2 border shadow-sm">
                            <Image
                                src={companyLogo.imageUrl}
                                alt={`${job.company.name} logo`}
                                width={64}
                                height={64}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                          <h1 className="font-headline text-3xl font-bold">{job.title}</h1>
                          {job.isUrgent && (
                            <Badge variant="destructive" className="flex shrink-0 items-center gap-1">
                                <Zap size={14} /> Urgent
                            </Badge>
                          )}
                      </div>
                      <Link href={`/companies/${job.company.id}`} className="text-lg font-semibold text-muted-foreground hover:text-primary">
                        {job.company.name}
                      </Link>
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {postedAt && <span>Posted {postedAt}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                    <Separator className="my-6" />
                    <h2 className="font-headline text-xl font-bold mb-4">Job Description</h2>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
                        <p>{job.description}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <h3 className="font-semibold text-foreground">Responsibilities:</h3>
                        <ul className="list-disc list-inside">
                            <li>Develop and maintain web applications using React and Next.js.</li>
                            <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
                            <li>Ensure the performance, quality, and responsiveness of applications.</li>
                            <li>Identify and correct bottlenecks and fix bugs.</li>
                        </ul>
                         <h3 className="font-semibold text-foreground">Qualifications:</h3>
                         <ul className="list-disc list-inside">
                            <li>Proven experience as a React Developer.</li>
                            <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.</li>
                            <li>Thorough understanding of React.js and its core principles.</li>
                             <li>Experience with popular React.js workflows (such as Flux or Redux).</li>
                        </ul>
                    </div>
                     <Separator className="my-6" />
                     <h2 className="font-headline text-xl font-bold mb-4">Required Skills</h2>
                     <div className="flex flex-wrap gap-2">
                        {job.skills.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                     </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6 lg:sticky lg:top-24 self-start">
                <Card>
                    <CardHeader>
                        <CardTitle>Job Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground flex items-center gap-2"><Briefcase /> Job Type</span>
                            <span className="font-semibold">{job.type}</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="text-muted-foreground flex items-center gap-2"><Briefcase /> Experience</span>
                            <span className="font-semibold">{job.experienceLevel}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground flex items-center gap-2"><Wallet /> Salary</span>
                            <span className="font-semibold text-primary">{job.salaryRange}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Apply Now</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button disabled={isApplied} className="w-full bg-accent-gradient" size="lg">
                                    {isApplied ? 'Applied' : 'Apply Now'}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>Apply to {job.title}</DialogTitle>
                                    <DialogDescription>
                                        Your profile will be submitted to {job.company.name}. You can add an optional cover letter below.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid w-full gap-2">
                                        <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
                                        <Textarea
                                            id="cover-letter"
                                            placeholder="Briefly explain why you're a great fit for this role..."
                                            rows={8}
                                            value={coverLetter}
                                            onChange={(e) => setCoverLetter(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="outline">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="button" onClick={handleApply}>Submit Application</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <p className="text-xs text-center text-muted-foreground mt-2">Your profile will be shared with {job.company.name}.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <SocialShareButtons title={job.title} />
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
  );
}
