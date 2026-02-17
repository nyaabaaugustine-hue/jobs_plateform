
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, Briefcase, Zap, Wallet } from 'lucide-react';
import { useState, useEffect } from 'react';

import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import ClientSideDate from './shared/client-side-date';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);

  const isHourly = job.salaryRange.includes('/hr');
  const salary = isHourly ? job.salaryRange.replace('/hr', '') : job.salaryRange;
  const period = isHourly ? 'Hourly' : 'yearly';
  
  const [matchScore, setMatchScore] = useState<number | null>(null);

  useEffect(() => {
    // Generate random score on the client after mount to prevent hydration errors
    setMatchScore(Math.floor(Math.random() * (98 - 75 + 1)) + 75);
  }, []);

  return (
    <Card className="bg-card rounded-2xl p-6 border border-border/20 hover:border-primary/50 transition-all duration-300 flex h-full flex-col overflow-hidden group">
      <CardHeader className="flex flex-row items-start gap-4 p-0">
        {companyLogo && (
          <Link href={`/companies/${job.company.id}`} className="block">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl p-2 border bg-white shadow-sm">
              <Image
                src={companyLogo.imageUrl}
                alt={`${job.company.name} logo`}
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
          </Link>
        )}
        <div className="flex-1">
          <CardTitle className="text-base mb-1">
            <Link href={`/jobs/${job.id}`} className="hover:text-primary leading-tight">
              {job.title}
            </Link>
          </CardTitle>
          <CardDescription className="flex flex-col gap-1 text-xs">
            <Link href={`/companies/${job.company.id}`} className="hover:underline text-sm">
              {job.company.name}
            </Link>
            <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3 w-3" /> {job.location}</span>
          </CardDescription>
        </div>
         {job.isUrgent && (
          <Badge variant="destructive" className="flex shrink-0 items-center gap-1">
            <Zap size={14} /> Urgent
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-0 pt-4 space-y-4">
        <div className="flex flex-wrap gap-2">
            {matchScore && <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 font-semibold">{matchScore}% Match</Badge>}
            <Badge variant="outline">{job.type}</Badge>
            <Badge variant="outline">{job.experienceLevel}</Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
        
        {job.skills && job.skills.length > 0 && (
             <div className="space-y-2 pt-2 border-t">
                <h4 className="font-semibold text-xs text-muted-foreground">Top Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                    {job.skills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                </div>
            </div>
        )}
      </CardContent>
      <CardFooter className="p-0 pt-4 flex items-end justify-between">
        <div className="flex flex-col text-left">
           <div className="flex items-baseline gap-1">
            <span className="font-headline text-lg font-bold text-foreground">{salary}</span>
            <span className="text-sm text-foreground/80">/{period}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3" />
            <ClientSideDate dateString={job.postedDate} />
          </div>
        </div>
        <Button asChild variant="secondary" className="rounded-lg font-semibold shadow-lg transform transition-transform hover:scale-105">
          <Link href={`/jobs/${job.id}`}>
            Apply Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
