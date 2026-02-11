import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Clock, MapPin, Briefcase, Zap, Wallet } from 'lucide-react';

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

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-start gap-4 bg-secondary/30 p-4">
        {companyLogo && (
          <Link href={`/companies/${job.company.id}`} className="block">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-background p-2 border shadow-sm">
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
          <CardTitle className="text-xl">
            <Link href={`/jobs/${job.id}`} className="hover:text-primary">
              {job.title}
            </Link>
          </CardTitle>
          <CardDescription className="mt-1">
            <Link href={`/companies/${job.company.id}`} className="hover:underline">
              {job.company.name}
            </Link>
          </CardDescription>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{job.location}</span>
          </div>
        </div>
        {job.isUrgent && (
          <Badge variant="destructive" className="flex shrink-0 items-center gap-1">
            <Zap size={14} /> Urgent
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-4">
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="outline" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" /> {job.type}
          </Badge>
          <Badge variant="outline">{job.experienceLevel}</Badge>
          {job.location.toLowerCase() === 'remote' && <Badge variant="secondary">Remote</Badge>}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
        
        <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">Top Skills</p>
             <div className="flex flex-wrap gap-1">
                {job.skills.slice(0, 4).map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
            </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-4 flex items-center justify-between bg-secondary/30">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 text-primary font-bold">
            <Wallet className="h-4 w-4" />
            <span>{salary}</span>
            <span className="text-xs text-muted-foreground font-normal">/{period}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
          </div>
        </div>
        <Button asChild className="rounded-lg">
          <Link href={`/jobs/${job.id}`}>
            Apply Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
