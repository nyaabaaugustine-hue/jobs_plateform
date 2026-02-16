'use client';

import React, { useState, useEffect } from 'react';
import { DUMMY_USERS, DUMMY_APPLICANTS } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building, Calendar, GraduationCap, Globe, Mail, MapPin, Phone, Star, Wand2, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const mockExperience = [
    { id: 1, title: 'Senior React Developer', company: 'Innovate Inc.', period: 'Jan 2021 - Present', description: 'Led the development of a new client-facing dashboard using Next.js and TypeScript, improving performance by 30%.' },
    { id: 2, title: 'Frontend Developer', company: 'Synergy Corp', period: 'Jun 2018 - Dec 2020', description: 'Developed and maintained UI components for a large-scale e-commerce platform using React and Redux.' }
];

const mockEducation = [
    { id: 1, institution: 'University of Ghana', degree: 'BSc. in Computer Science', period: '2014 - 2018' }
];

const mockSkills = ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'JavaScript', 'Redux', 'Tailwind CSS', 'Figma', 'CI/CD'];

const CandidateProfileSkeleton = () => (
    <main className="flex-1 bg-background bg-hero-glow py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <aside className="space-y-6 lg:order-last lg:sticky lg:top-24 self-start">
                    <Card className="text-center">
                        <CardContent className="p-6">
                            <Skeleton className="h-32 w-32 rounded-full mx-auto mb-4" />
                            <Skeleton className="h-7 w-48 mx-auto" />
                            <Skeleton className="h-4 w-56 mx-auto mt-2" />
                            <Skeleton className="h-4 w-32 mx-auto mt-2" />
                        </CardContent>
                        <CardContent className="border-t p-6 space-y-3">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
                        <CardContent className="space-y-6">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                        </CardContent>
                    </Card>
                </aside>
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader><Skeleton className="h-7 w-32" /></CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><Skeleton className="h-7 w-48" /></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex gap-4">
                                <Skeleton className="h-12 w-12 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-1/3" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Skeleton className="h-12 w-12 rounded-lg" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-1/3" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </main>
);

interface CandidateProfilePageProps {
  params: { id: string };
}

export default function CandidateProfilePage({ params }: CandidateProfilePageProps) {
  const { id } = params;
  const { toast } = useToast();

  const [user, setUser] = useState<(typeof DUMMY_USERS)[0] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let foundUser = DUMMY_USERS.find((u) => u.id === id);

    if (!foundUser) {
      // The provided ID might be an applicant ID. Let's try to find the user that way.
      const applicant = DUMMY_APPLICANTS.find(a => a.id === id || a.userId === id);
      if (applicant) {
        foundUser = DUMMY_USERS.find(u => u.id === applicant.userId);
      }
    }

    // A short delay to simulate network loading
    setTimeout(() => {
      setUser(foundUser);
      setIsLoading(false);
    }, 300);

  }, [id]);

  const handleAction = (title: string) => {
    toast({
        title: title,
        description: "This feature is for demonstration purposes.",
        variant: 'vibrant'
    });
  };

  if (isLoading) {
    return <CandidateProfileSkeleton />;
  }

  if (!user) {
    notFound();
  }

  const userAvatar = PlaceHolderImages.find((img) => img.id === user.avatar);

  return (
      <main className="flex-1 bg-background bg-hero-glow py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Right Sidebar */}
            <aside className="space-y-6 lg:order-last lg:sticky lg:top-24 self-start">
                <Card className="text-center">
                    <CardContent className="p-6">
                        <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary/50 shadow-lg">
                            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.name} />}
                            <AvatarFallback className="text-4xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <h1 className="font-headline text-2xl font-bold">{user.name}</h1>
                        <p className="text-muted-foreground">{user.professionalTitle}</p>
                         <div className="flex justify-center items-center gap-1 text-muted-foreground text-sm mt-2">
                            <MapPin className="h-4 w-4" />
                            <span>Accra, Ghana</span>
                        </div>
                    </CardContent>
                    <CardContent className="border-t p-6">
                        <div className="flex w-full gap-3">
                            <Button className="flex-1 bg-accent-gradient" onClick={() => handleAction('Invitation Sent!')}><Send className="mr-2" /> Invite</Button>
                            <Button variant="outline" className="flex-1" onClick={() => handleAction('Message Sent!')}>
                                <Mail className="mr-2" /> Message
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Experience</span>
                            <span className="font-semibold">5+ Years</span>
                        </div>
                        <Separator />
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Availability</span>
                            <span className="font-semibold text-emerald-500">Open to offers</span>
                        </div>
                         <Separator />
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Preferred Role</span>
                            <span className="font-semibold">Full-time</span>
                        </div>
                         <Separator />
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Salary Expectation</span>
                            <span className="font-semibold">GH₵15k+/month</span>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Resume</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full" onClick={() => handleAction('Downloading CV...')}>
                            <FileText className="mr-2" /> Download CV
                        </Button>
                    </CardContent>
                </Card>
            </aside>
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Highly-motivated and results-oriented Senior React Developer with over 5 years of experience in building and maintaining scalable web applications. Proficient in modern frontend technologies including TypeScript, Next.js, and GraphQL. Passionate about creating seamless user experiences and writing clean, efficient code. A collaborative team player with a knack for problem-solving and leadership.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Briefcase /> Work Experience</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {mockExperience.map(exp => (
                            <div key={exp.id} className="flex gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary shrink-0">
                                    <Building className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h4 className="font-semibold">{exp.title}</h4>
                                    <p className="text-sm text-primary">{exp.company}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-3 w-3"/>
                                        {exp.period}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><GraduationCap /> Education</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {mockEducation.map(edu => (
                            <div key={edu.id} className="flex gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary shrink-0">
                                    <GraduationCap className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h4 className="font-semibold">{edu.institution}</h4>
                                    <p className="text-sm">{edu.degree}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-3 w-3"/>
                                        {edu.period}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Wand2 /> Skills</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        {mockSkills.map(skill => (
                            <Badge key={skill} variant="secondary" className="text-base py-1 px-3">{skill}</Badge>
                        ))}
                    </CardContent>
                </Card>
            </div>

          </div>
        </div>
      </main>
  );
}
