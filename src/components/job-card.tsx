import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-4">
            {companyLogo && (
              <Image
                src={companyLogo.imageUrl}
                alt={`${job.company.name} logo`}
                width={40}
                height={40}
                className="rounded-md"
              />
            )}
            <div>
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <CardDescription>{job.company.name}</CardDescription>
            </div>
          </div>
          {job.isUrgent && (
            <Badge variant="destructive" className="flex shrink-0 items-center gap-1">
              <Zap size={14} /> Urgent
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="secondary">{job.type}</Badge>
          <Badge variant="secondary">{job.location}</Badge>
          <Badge variant="secondary">{job.experienceLevel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-2">{job.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="font-semibold text-primary">{job.salaryRange}</p>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/jobs/${job.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
