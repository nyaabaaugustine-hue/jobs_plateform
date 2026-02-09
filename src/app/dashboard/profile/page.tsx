import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, PlusCircle, Linkedin, Trash2 } from "lucide-react"

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
                  <Input id="email" type="email" defaultValue="john.doe@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input id="headline" placeholder="e.g., Senior React Developer at Innovate Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea id="summary" placeholder="Write a brief summary about yourself..." rows={5} />
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
              {/* Experience Item */}
              <div className="flex gap-4 rounded-md border p-4">
                  <div className="flex-1 space-y-1">
                      <h4 className="font-semibold">Senior React Developer</h4>
                      <p className="text-sm">Innovate Inc. · Full-time</p>
                      <p className="text-xs text-muted-foreground">Jan 2021 - Present · 3 yrs 5 mos</p>
                      <p className="text-sm text-muted-foreground mt-2">Led the development of a new client-facing dashboard using Next.js and TypeScript.</p>
                  </div>
                   <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
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
               <div className="flex gap-4 rounded-md border p-4">
                  <div className="flex-1 space-y-1">
                      <h4 className="font-semibold">University of Technology</h4>
                      <p className="text-sm">Bachelor of Science, Computer Science</p>
                      <p className="text-xs text-muted-foreground">2014 - 2018</p>
                  </div>
                   <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Highlight your key skills.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Add a skill (e.g., TypeScript) and press Enter" />
                <div className="flex flex-wrap gap-2">
                    <Badge>React <Button variant="ghost" size="icon" className="h-4 w-4 ml-1"><Trash2 className="h-3 w-3"/></Button></Badge>
                    <Badge>TypeScript <Button variant="ghost" size="icon" className="h-4 w-4 ml-1"><Trash2 className="h-3 w-3"/></Button></Badge>
                    <Badge>Next.js <Button variant="ghost" size="icon" className="h-4 w-4 ml-1"><Trash2 className="h-3 w-3"/></Button></Badge>
                    <Badge>Node.js <Button variant="ghost" size="icon" className="h-4 w-4 ml-1"><Trash2 className="h-3 w-3"/></Button></Badge>
                    <Badge>GraphQL <Button variant="ghost" size="icon" className="h-4 w-4 ml-1"><Trash2 className="h-3 w-3"/></Button></Badge>
                </div>
            </CardContent>
          </Card>

        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Resume</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button className="w-full"><Upload className="mr-2 h-4 w-4"/> Upload Resume</Button>
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
             <Card>
                <CardHeader>
                    <CardTitle>Save Changes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" size="lg">Save Profile</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
