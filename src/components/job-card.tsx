'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Zap } from 'lucide-react';
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
  const matchScore = job.aiPriorityScore || 85;

  return (
    <Card className="bg-[#151C2B] rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 flex h-full flex-col overflow-hidden group hover:-translate-y-1 shadow-xl relative">
      <CardHeader className="flex flex-row items-start justify-between p-0 mb-4">
        {companyLogo && (
          <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-white p-1">
            <Image
              src={companyLogo.imageUrl}
              alt={`${job.company.name} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        {job.isUrgent && (
          <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20 px-2 py-0.5 text-[10px] uppercase font-black">
            <Zap className="h-3 w-3 mr-1" fill="currentColor" /> Urgent
          </Badge>
        )}
      </CardHeader>
      
      <div className="mb-4">
        <CardTitle className="text-lg font-bold text-white mb-1">
          <Link href={`/jobs/${job.id}`} className="hover:text-primary transition-colors">
            {job.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="text-white/60">{job.company.name}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {job.location}
          </span>
        </CardDescription>
      </div>

      <CardContent className="flex-grow p-0 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold">
            {matchScore}% Match
          </Badge>
          <Badge variant="outline" className="border-white/10 text-white/60 font-medium">
            {job.type}
          </Badge>
          <Badge variant="outline" className="border-white/10 text-white/60 font-medium">
            {job.experienceLevel}
          </Badge>
        </div>

        <p className="text-muted-foreground leading-relaxed line-clamp-2 text-xs">
          {job.description}
        </p>
        
        {job.skills && job.skills.length > 0 && (
          <div className="space-y-2 pt-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30">Top Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="bg-white/5 border-none text-white/70 text-[10px] font-bold px-2 py-0.5">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-0 pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-white">{job.salaryRange.split(' - ')[0]}</span>
            <span className="text-[10px] text-muted-foreground font-bold">/yearly</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase mt-0.5">
            <Clock className="h-3 w-3" />
            <ClientSideDate dateString={job.postedDate} />
          </div>
        </div>
        <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white font-black rounded-lg h-9">
          <Link href={`/jobs/${job.id}`}>
            Apply Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}