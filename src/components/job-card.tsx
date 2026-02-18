
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
    <Card className="bg-[#151C2B] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 flex h-full flex-col overflow-hidden group hover:-translate-y-1 shadow-lg hover:shadow-xl relative">
      <CardHeader className="flex flex-row items-start justify-between p-0 mb-4">
        <div className="flex items-start gap-4">
          {companyLogo && (
            <div className="relative h-12 w-12 shrink-0 rounded-xl overflow-hidden bg-white p-1.5 shadow-md">
              <Image
                src={companyLogo.imageUrl}
                alt={`${job.company.name} logo`}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div>
            <CardTitle className="text-lg font-bold text-white mb-0.5 leading-tight">
              <Link href={`/jobs/${job.id}`} className="hover:text-primary transition-colors">
                {job.title}
              </Link>
            </CardTitle>
            <CardDescription className="flex flex-col gap-0.5 text-xs font-medium">
              <span className="text-white/70">{job.company.name}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" /> {job.location}
              </span>
            </CardDescription>
          </div>
        </div>
        {job.isUrgent && (
          <Badge variant="destructive" className="bg-red-500 text-white border-none px-2 py-0.5 text-[10px] uppercase font-black tracking-wider">
            <Zap className="h-3 w-3 mr-1 fill-white" /> Urgent
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="flex-grow p-0 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-none font-bold px-2 py-0.5">
            {matchScore}% Match
          </Badge>
          <Badge variant="outline" className="border-white/10 text-white/60 font-bold px-2 py-0.5 bg-white/5">
            {job.type}
          </Badge>
          <Badge variant="outline" className="border-white/10 text-white/60 font-bold px-2 py-0.5 bg-white/5">
            {job.experienceLevel}
          </Badge>
        </div>

        <p className="text-[#f6f4ee]/80 leading-relaxed line-clamp-2 text-[13px]">
          {job.description}
        </p>
        
        {job.skills && job.skills.length > 0 && (
          <div className="space-y-2 pt-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30">Top Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="bg-[#0B0F17] border border-white/5 text-white/70 text-[11px] font-bold px-3 py-1 rounded-md">
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
            <span className="text-[15px] font-black text-white">{job.salaryRange.split(' - ')[0]} - {job.salaryRange.split(' - ')[1]}</span>
            <span className="text-[11px] text-muted-foreground font-bold">/yearly</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground mt-1">
            <Clock className="h-3.5 w-3.5" />
            <ClientSideDate dateString={job.postedDate} />
          </div>
        </div>
        <Button asChild variant="default" size="sm" className="bg-[#1F2937] text-white hover:bg-primary transition-all font-bold rounded-xl px-5 h-10 border border-white/5">
          <Link href={`/jobs/${job.id}`}>
            Apply Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
