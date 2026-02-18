
'use client';

import PageHero from '@/components/shared/page-hero';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

const internalJobs = [
  {
    id: 'ch-1',
    title: 'Senior AI Engineer',
    location: 'Remote / Accra',
    type: 'Full-time',
    description: 'Lead the development and scaling of Abena AI, our core career intelligence and matching engine.'
  },
  {
    id: 'ch-2',
    title: 'Lead Product Designer',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design the future of professional networking through innovative, accessible, and high-authority interfaces.'
  },
  {
    id: 'ch-3',
    title: 'Senior Backend Developer (Node.js)',
    location: 'Accra / Hybrid',
    type: 'Full-time',
    description: 'Build robust, scalable infrastructure and integrate secure high-volume payment and notification systems.'
  }
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Join Our Team"
        subtitle="Help us build the future of professional networking and job discovery."
      />
      <main className="flex-1 py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-6">
            {internalJobs.map((job) => (
              <Card key={job.id} className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary overflow-hidden">
                <CardContent className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-headline">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.type}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Posted today</span>
                    </div>
                    <p className="text-muted-foreground mt-4 max-w-2xl">{job.description}</p>
                  </div>
                  <Button asChild className="shrink-0 bg-primary font-black uppercase tracking-widest px-8">
                    <Link href="/contacts">Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-16 bg-card/50 backdrop-blur-sm border-dashed border-2">
            <CardContent className="p-10 text-center">
              <h2 className="font-headline text-2xl font-bold">Don't see a perfect fit?</h2>
              <p className="mt-4 text-muted-foreground">
                We are always on the lookout for passionate and talented individuals. 
                If you believe you have what it takes to contribute to our mission, feel free to send your resume to our team.
              </p>
              <Button variant="outline" size="lg" className="mt-6 font-bold" asChild>
                <Link href="/contacts">General Application</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
