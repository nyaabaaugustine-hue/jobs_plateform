'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, PlusCircle, Linkedin, Trash2, Save, X, UserCircle, Briefcase, GraduationCap, Wand2, FileText, Loader2 } from "lucide-react"
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';


// Mock data types for state
type Experience = { id: number; title: string; company: string; period: string; description: string; };
type Education = { id: number; institution: string; degree: string; period: string; };

export default function ProfilePage() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState('John Doe');
  const [headline, setHeadline] = useState('Senior React Developer at Innovate Inc.');
  const [summary, setSummary] = useState('Experienced React developer with 5 years in frontend development, specializing in TypeScript, Next.js, and state management with Redux. Proven ability to lead small teams and deliver high-quality web applications.');
  
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'JavaScript', 'Redux']);
  const [skillInput, setSkillInput] = useState('');

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1, title: 'Senior React Developer', company: 'Innovate Inc. · Full-time', period: 'Jan 2021 - Present · 3 yrs 5 mos', description: 'Led the development of a new client-facing dashboard using Next.js and TypeScript.' }
  ]);
  
  const [educations, setEducations] = useState<Education[]>([
    { id: 1, institution: 'University of Technology', degree: 'Bachelor of Science, Computer Science', period: '2014 - 2018' }
  ]);

  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('my_resume_final.pdf');
  const resumePreviewUrl = PlaceHolderImages.find(p => p.id === 'resume-doc')?.imageUrl;

  const handleResumeUpload = () => {
    setIsUploadingResume(true);
    setTimeout(() => {
        const newFileName = `john_doe_resume_${new Date().getFullYear()}.pdf`;
        setResumeFileName(newFileName);
        setIsUploadingResume(false);
        toast({
            title: "Resume Uploaded",
            description: `${newFileName} has been saved to your profile.`,
            variant: "vibrant"
        });
    }, 1500);
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() !== '' && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const handleSaveProfile = () => {
    console.log('Saving profile:', {
      fullName,
      headline,
      summary,
      skills,
      experiences,
      educations,
    });
    toast({
        title: "Profile Saved!",
        description: "Your changes have been successfully saved.",
        variant: "vibrant"
    });
  };

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
              <CardTitle className="flex items-center gap-2"><UserCircle /> Personal Information</CardTitle>
              <CardDescription>This information will be visible to employers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@email.com" readOnly disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input id="headline" placeholder="e.g., Senior React Developer at Innovate Inc." value={headline} onChange={(e) => setHeadline(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea id="summary" placeholder="Write a brief summary about yourself..." rows={5} value={summary} onChange={(e) => setSummary(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><Briefcase /> Work Experience</CardTitle>
                <CardDescription>Detail your professional journey.</CardDescription>
              </div>
              <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {experiences.map(exp => (
                <div key={exp.id} className="flex gap-4 rounded-md border p-4 relative group">
                    <div className="flex-1 space-y-1">
                        <h4 className="font-semibold">{exp.title}</h4>
                        <p className="text-sm">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">{exp.period}</p>
                        <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                    </div>
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>

           <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2"><GraduationCap /> Education</CardTitle>
                <CardDescription>Your educational background.</CardDescription>
              </div>
              <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {educations.map(edu => (
                <div key={edu.id} className="flex gap-4 rounded-md border p-4 relative group">
                    <div className="flex-1 space-y-1">
                        <h4 className="font-semibold">{edu.institution}</h4>
                        <p className="text-sm">{edu.degree}</p>
                        <p className="text-xs text-muted-foreground">{edu.period}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Wand2 /> Skills</CardTitle>
              <CardDescription>Highlight your key skills to stand out.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input 
                  placeholder="Add a skill (e.g., TypeScript) and press Enter" 
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                />
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="group relative pr-7">
                        {skill} 
                        <button 
                          onClick={() => handleRemoveSkill(skill)}
                          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-muted-foreground/20 hover:bg-muted-foreground/40"
                        >
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
                    <CardTitle className="flex items-center gap-2"><FileText /> Resume</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {resumePreviewUrl && !isUploadingResume && (
                    <div className="flex justify-center border rounded-lg p-2 bg-secondary/30">
                        <Image src={resumePreviewUrl} alt="Resume Preview" width={200} height={283} className="rounded-md" />
                    </div>
                  )}
                  <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg">
                    {isUploadingResume ? (
                      <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                    ): (
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    )}
                    <p className="mt-2 text-sm text-muted-foreground">Drag & drop or</p>
                    <Button variant="link" className="p-0 h-auto" onClick={handleResumeUpload} disabled={isUploadingResume}>click to upload</Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Current: {resumeFileName}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Linkedin /> Import Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full">Import from LinkedIn</Button>
                </CardContent>
            </Card>
             <div className="lg:col-span-3">
                <Button size="lg" className="w-full bg-accent-gradient" onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" /> Save Profile
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
