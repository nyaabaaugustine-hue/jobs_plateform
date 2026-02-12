'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, PlusCircle, Save, FileText, ListChecks, MessageSquareQuote, Loader2, ArrowLeft } from "lucide-react"
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import Link from 'next/link';

export default function NewJobPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAction = (title: string, description?: string) => {
    toast({
      title: title,
      description: description || "This feature is for demonstration purposes.",
      variant: 'vibrant',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    handleAction("Publishing Job...", "Your job is being submitted for review.");

    setTimeout(() => {
        setIsSubmitting(false);
        handleAction("Job Published!", "Your new job is now live.");
        router.push('/employer/jobs');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center gap-4">
         <Button asChild variant="outline" size="icon" className="shrink-0">
          <Link href="/employer/jobs"><ArrowLeft /></Link>
        </Button>
        <div>
            <h1 className="font-headline text-3xl font-bold">Post a New Job</h1>
            <p className="text-muted-foreground">Fill out the details below to find your next great hire.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Main form content */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><FileText className="h-6 w-6 text-primary" /> Job Details</CardTitle>
              <CardDescription>Provide the fundamental details about the job opening.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="e.g., Senior React Developer" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Accra, Ghana or Remote" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-type">Job Type</Label>
                  <Select required>
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
                  <Input id="salary-range" placeholder="e.g., GH₵12k - GH₵16k /month" required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience-level">Experience Level</Label>
                  <Select required>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><ListChecks className="h-6 w-6 text-primary" /> Description & Skills</CardTitle>
              <CardDescription>Be detailed and clear to attract the best talent for the role.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Full Job Description</Label>
                <Textarea id="description" placeholder="Describe the role, responsibilities, and qualifications..." rows={10} required/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Input id="skills" placeholder="e.g., React, TypeScript, Next.js (comma-separated)" required/>
                <p className="text-xs text-muted-foreground">Separate skills with a comma.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Actions and extra info */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><MessageSquareQuote className="h-6 w-6 text-primary" /> Screening Questions</CardTitle>
                    <CardDescription>Add questions to help you filter applicants.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-3 border rounded-lg bg-secondary/30">
                        <Checkbox id="question1" checked className="mt-1" />
                        <div className="flex-1 space-y-0.5">
                            <Label htmlFor="question1" className="font-semibold">What is your expected salary?</Label>
                            <p className="text-xs text-muted-foreground">Helps filter candidates based on budget.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3 p-3 border rounded-lg bg-secondary/30">
                        <Checkbox id="question2" checked className="mt-1"/>
                        <div className="flex-1 space-y-0.5">
                            <Label htmlFor="question2" className="font-semibold">Are you authorized to work in the specified location?</Label>
                            <p className="text-xs text-muted-foreground">Important for legal and logistical reasons.</p>
                        </div>
                    </div>
                    <Button variant="outline" type="button" className="w-full" onClick={() => handleAction('Feature not implemented', 'This would open a dialog to add a custom question.')}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Custom Question
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Button variant="outline" size="lg" type="button" className="w-full" onClick={() => handleAction('Generating Preview...', 'This would open the job details in a new tab.')}>
                        <Eye className="mr-2 h-4 w-4" /> Preview
                    </Button>
                    <Button type="submit" size="lg" className="w-full bg-accent-gradient" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {isSubmitting ? 'Publishing...' : 'Save & Publish'}
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </form>
  );
}
