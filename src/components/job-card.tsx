import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Zap } from 'lucide-react';

import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);

  const isHourly = job.salaryRange.includes('/hr');
  const salary = isHourly ? job.salaryRange.replace('/hr', '') : job.salaryRange;
  const period = isHourly ? 'Hourly' : 'yearly';

  return (
    <Card className="flex h-full flex-col p-6 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border">
      <CardHeader className="flex flex-row items-start gap-4 p-0">
          {companyLogo && (
              <Link href={`/companies/${job.company.id}`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary p-1 border">
                      <Image
                          src={companyLogo.imageUrl}
                          alt={`${job.company.name} logo`}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                      />
                  </div>
              </Link>
          )}
          <div className="flex-1">
              <Link href={`/companies/${job.company.id}`} className="hover:text-primary font-semibold text-lg">
                {job.company.name}
              </Link>
              <p className="text-sm text-muted-foreground">{job.location}</p>
          </div>
          {job.isUrgent && (
            <Badge variant="destructive" className="flex shrink-0 items-center gap-1">
                <Zap size={14} /> Urgent
            </Badge>
          )}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-0 mt-4">
            <Link href={`/jobs/${job.id}`} className="group">
              <h3 className="font-semibold text-foreground group-hover:text-primary text-xl leading-tight">{job.title}</h3>
            </Link>
            
            <div className="mt-2 flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">{job.type}</Badge>
                <Badge variant="outline">{job.experienceLevel}</Badge>
                {job.location.toLowerCase() === 'remote' && <Badge variant="secondary">Remote</Badge>}
            </div>

            <p className="text-sm text-muted-foreground mt-3 line-clamp-2 flex-grow">{job.description}</p>

            <div className="mt-4 flex flex-wrap gap-1">
                {job.skills.slice(0, 4).map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
            </div>
      </CardContent>
       <CardFooter className="p-0 mt-4 flex items-center justify-between">
             <div className="flex flex-col text-left">
                 <div className="text-lg">
                    <span className="font-bold text-primary">{salary}</span>
                    <span className="text-sm text-muted-foreground font-normal">/{period}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
                </div>
            </div>
            <Button asChild className="rounded-lg transform transition-transform hover:scale-105">
                <Link href={`/jobs/${job.id}`}>
                  Apply
                </Link>
            </Button>
        </CardFooter>
    </Card>
  );
}
