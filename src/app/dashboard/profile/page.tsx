'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, PlusCircle, Linkedin, Trash2, Save } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Keep your profile updated to attract the best opportunities.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>This information will be visible to employers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@email.com" readOnly disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input id="headline" placeholder="e.g., Senior React Developer at Innovate Inc." defaultValue="Senior React Developer at Innovate Inc."/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea id="summary" placeholder="Write a brief summary about yourself..." rows={5} defaultValue="Experienced React developer with 5 years in frontend development, specializing in TypeScript, Next.js, and state management with Redux. Proven ability to lead small teams and deliver high-quality web applications."/>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Detail your professional journey.</CardDescription>
              </div>
              <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 rounded-md border p-4 relative group">
                  <div className="flex-1 space-y-1">
                      <h4 className="font-semibold">Senior React Developer</h4>
                      <p className="text-sm">Innovate Inc. · Full-time</p>
                      <p className="text-xs text-muted-foreground">Jan 2021 - Present · 3 yrs 5 mos</p>
                      <p className="text-sm text-muted-foreground mt-2">Led the development of a new client-facing dashboard using Next.js and TypeScript.</p>
                  </div>
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Education</CardTitle>
                <CardDescription>Your educational background.</CardDescription>
              </div>
              <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex gap-4 rounded-md border p-4 relative group">
                  <div className="flex-1 space-y-1">
                      <h4 className="font-semibold">University of Technology</h4>
                      <p className="text-sm">Bachelor of Science, Computer Science</p>
                      <p className="text-xs text-muted-foreground">2014 - 2018</p>
                  </div>
                   <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Highlight your key skills to stand out.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Add a skill (e.g., TypeScript) and press Enter" />
                <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'JavaScript', 'Redux'].map(skill => (
                      <Badge key={skill} variant="secondary" className="group relative pr-7">
                        {skill} 
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-muted-foreground/20 hover:bg-muted-foreground/40">
                          <X className="h-3 w-3 text-muted-foreground"/>
                        </button>
                      </Badge>
                    ))}
                </div>
            </CardContent>
          </Card>

        </div>
        <div className="space-y-8 lg:sticky lg:top-24 self-start">
            <Card>
                <CardHeader>
                    <CardTitle>Resume</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drag & drop or</p>
                    <Button variant="link" className="p-0 h-auto">click to upload</Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Current: my_resume_final.pdf</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Import Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full"><Linkedin className="mr-2 h-4 w-4"/> Import from LinkedIn</Button>
                </CardContent>
            </Card>
             <div className="lg:col-span-3">
                <Button size="lg" className="w-full bg-accent-gradient">
                  <Save className="mr-2 h-4 w-4" /> Save Profile
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
