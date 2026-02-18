'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);

  return (
    <Card className="bg-card rounded-lg p-8 border-none hover:bg-white/[0.03] transition-all duration-300 flex h-full flex-col overflow-hidden group hover:-translate-y-1 shadow-sm">
      <CardHeader className="flex flex-row items-start gap-6 p-0 mb-6">
        {companyLogo && (
          <div className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden bg-white/5 p-1 border border-white/10">
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
            <Link href={`/jobs/${job.id}`} className="hover:text-primary transition-colors">
              {job.title}
            </Link>
          </CardTitle>
          <CardDescription className="flex items-center gap-4 text-sm font-medium">
            <span className="text-foreground">{job.company.name}</span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {job.location}
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-0 space-y-6">
        <p className="text-muted-foreground leading-relaxed line-clamp-2">
          {job.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-white/5 border-none text-foreground font-medium px-3 py-1">
            {job.type}
          </Badge>
          <Badge variant="secondary" className="bg-white/5 border-none text-foreground font-medium px-3 py-1">
            {job.experienceLevel}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-0 pt-8 mt-6 border-t border-white/5 flex items-center justify-between">
        <div className="text-[20px] font-bold text-foreground">
          {job.salaryRange.split(' - ')[0]}
        </div>
        <Link 
          href={`/jobs/${job.id}`}
          className="text-sm font-bold text-primary hover:underline"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}