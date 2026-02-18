'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import ClientSideDate from '@/components/shared/client-side-date';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  useEffect(() => {
    // Consistent match score based on ID for demo purposes
    const score = 75 + (parseInt(job.id.split('-')[1]) * 7) % 24;
    setMatchScore(score);
  }, [job.id]);

  return (
    <Card className="bg-[#151C2B] rounded-lg p-8 border border-white/5 hover:border-white/10 transition-all duration-300 flex h-full flex-col overflow-hidden group hover:-translate-y-1 shadow-xl">
      <CardHeader className="flex flex-row items-start gap-6 p-0 mb-6">
        {companyLogo && (
          <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden bg-white p-1 border border-white/10">
            <Image
              src={companyLogo.imageUrl}
              alt={`${job.company.name} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="flex-1">
          <CardTitle className="text-xl font-bold mb-1">
            <Link href={`/jobs/${job.id}`} className="hover:text-primary transition-colors text-white">
              {job.title}
            </Link>
          </CardTitle>
          <CardDescription className="flex items-center gap-4 text-sm font-medium">
            <span className="text-white/80">{job.company.name}</span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {job.location}
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-0 space-y-6">
        <div className="flex flex-wrap gap-2">
          {job.isUrgent && (
            <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20 px-3 py-1">
              <Zap className="h-3 w-3 mr-1" fill="currentColor" /> Urgent
            </Badge>
          )}
          {matchScore && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bold px-3 py-1">
              {matchScore}% Match
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/5 border-none text-white font-medium px-3 py-1">
            {job.type}
          </Badge>
          <Badge variant="secondary" className="bg-white/5 border-none text-white font-medium px-3 py-1">
            {job.experienceLevel}
          </Badge>
        </div>

        <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm">
          {job.description}
        </p>
        
        {job.skills && job.skills.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-headline text-xs font-black uppercase tracking-widest text-white/40">Top Skills</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map(skill => (
                <Badge key={skill} variant="outline" className="bg-transparent border-white/10 text-white/70 text-[10px] font-bold uppercase">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-0 pt-8 mt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-black text-white">{job.salaryRange.split(' - ')[0]}</span>
            <span className="text-xs text-muted-foreground font-bold">/yearly</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-1">
            <Clock className="h-3 w-3" />
            <ClientSideDate dateString={job.postedDate} />
          </div>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white font-black rounded-lg px-6 h-11 shadow-lg transition-all hover:scale-105">
          <Link href={`/jobs/${job.id}`}>
            Apply Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}