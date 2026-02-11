import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, PlusCircle, Save, FileText, ListChecks, MessageSquareQuote } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewJobPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Post a New Job</h1>
        <p className="text-muted-foreground">Fill out the details below to find your next great hire.</p>
      </div>

      <Card>
        <Tabs defaultValue="details" className="w-full">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details"><FileText className="mr-2" />Job Details</TabsTrigger>
              <TabsTrigger value="description"><ListChecks className="mr-2" />Description</TabsTrigger>
              <TabsTrigger value="screening"><MessageSquareQuote className="mr-2" />Screening</TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="details">
            <CardContent className="space-y-6">
              <CardDescription>Provide the core information about the job opening.</CardDescription>
              <div className="space-y-2 pt-4">
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
          </TabsContent>
          <TabsContent value="description">
            <CardContent className="space-y-6">
              <CardDescription>Be detailed to attract the right candidates.</CardDescription>
              <div className="space-y-2 pt-4">
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" placeholder="Describe the role, responsibilities, and qualifications..." rows={10} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <Input id="skills" placeholder="e.g., React, TypeScript, Next.js (comma-separated)" />
              </div>
            </CardContent>
          </TabsContent>
          <TabsContent value="screening">
            <CardContent className="space-y-4">
              <CardDescription>Add questions to help filter applicants.</CardDescription>
              <div className="pt-4 space-y-4">
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
            </CardContent>
          </TabsContent>
        </Tabs>
        <CardFooter className="justify-end gap-4 border-t pt-6">
          <Button variant="outline"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
          <Button size="lg"><Save className="mr-2 h-4 w-4" /> Save & Publish</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
