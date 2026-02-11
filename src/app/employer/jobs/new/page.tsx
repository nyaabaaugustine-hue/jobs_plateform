import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, PlusCircle, Save, FileText, ListChecks, MessageSquareQuote } from "lucide-react"

export default function NewJobPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Post a New Job</h1>
        <p className="text-muted-foreground">Fill out the details below to find your next great hire.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText />Job Details</CardTitle>
          <CardDescription>Provide the fundamental details about the job opening to attract the right candidates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><ListChecks />Description & Skills</CardTitle>
            <CardDescription>Be detailed and clear to attract the best talent for the role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Full Job Description</Label>
            <Textarea id="description" placeholder="Describe the role, responsibilities, and qualifications..." rows={10} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">Required Skills</Label>
            <Input id="skills" placeholder="e.g., React, TypeScript, Next.js (comma-separated)" />
            <p className="text-xs text-muted-foreground">Separate skills with a comma.</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquareQuote />Screening Questions</CardTitle>
            <CardDescription>Add questions to help you filter and qualify applicants automatically.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-secondary/50">
            <div className="flex-1 space-y-1">
                <Label htmlFor="question1">What is your expected salary?</Label>
                <p className="text-xs text-muted-foreground">Helps filter candidates based on budget.</p>
            </div>
            <Checkbox id="question1" checked/>
          </div>
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-secondary/50">
              <div className="flex-1 space-y-1">
                <Label htmlFor="question2">Are you authorized to work in the specified location?</Label>
                <p className="text-xs text-muted-foreground">Important for legal and logistical reasons.</p>
            </div>
            <Checkbox id="question2" checked/>
          </div>
          <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" /> Add Custom Question</Button>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" size="lg"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
          <Button size="lg" className="bg-accent-gradient"><Save className="mr-2 h-4 w-4" /> Save & Publish</Button>
      </div>
    </div>
  )
}
