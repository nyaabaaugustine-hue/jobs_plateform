'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Clock, MapPin, Briefcase, Zap, Wallet, BarChart } from 'lucide-react';
import { useState, useEffect } from 'react';

import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);

  const isHourly = job.salaryRange.includes('/hr');
  const salary = isHourly ? job.salaryRange.replace('/hr', '') : job.salaryRange;
  const period = isHourly ? 'Hourly' : 'yearly';
  
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [postedAt, setPostedAt] = useState('');

  useEffect(() => {
    // Generate random score and formatted date on the client after mount to prevent hydration errors
    setMatchScore(Math.floor(Math.random() * (98 - 75 + 1)) + 75);
    setPostedAt(formatDistanceToNow(new Date(job.postedDate), { addSuffix: true }));
  }, [job.postedDate]);

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 border-t-4 border-primary/10 hover:border-primary">
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        {companyLogo && (
          <Link href={`/companies/${job.company.id}`} className="block">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-background p-2 border shadow-sm">
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
          <CardTitle className="text-lg mb-1">
            <Link href={`/jobs/${job.id}`} className="hover:text-primary leading-tight">
              {job.title}
            </Link>
          </CardTitle>
          <CardDescription>
            <Link href={`/companies/${job.company.id}`} className="hover:underline">
              {job.company.name}
            </Link>
          </CardDescription>
        </div>
         {job.isUrgent && (
          <Badge variant="destructive" className="flex shrink-0 items-center gap-1">
            <Zap size={14} /> Urgent
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0 space-y-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary/70" /> <span>{job.location}</span></div>
            <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary/70" /> <span>{job.type}</span></div>
            <div className="flex items-center gap-2"><BarChart className="h-4 w-4 text-primary/70" /> <span>{job.experienceLevel}</span></div>
            {matchScore && <div className="flex items-center gap-2 font-medium text-accent"><BarChart className="h-4 w-4 text-accent" /> <span>{matchScore}% Match</span></div>}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 pt-4 border-t">{job.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex items-end justify-between bg-secondary/50">
        <div className="flex flex-col text-left">
           <div className="flex items-baseline gap-1.5 text-primary font-bold text-lg">
            <span>{salary}</span>
            <span className="text-xs text-muted-foreground font-normal">/{period}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3" />
            {postedAt && <span>{postedAt}</span>}
          </div>
        </div>
        <Button asChild className="rounded-lg bg-accent-gradient text-primary-foreground font-semibold shadow-lg transform transition-transform hover:scale-105">
          <Link href={`/jobs/${job.id}`}>
            Apply Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
