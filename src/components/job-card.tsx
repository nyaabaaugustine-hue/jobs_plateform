import Image from 'next/image';
import Link from 'next/link';
import type { Job } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);

  return (
    <Card className="flex h-full flex-col p-6 rounded-lg shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-0">
          <div className="flex items-start gap-4">
              {companyLogo && (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary p-1 border">
                      <Image
                          src={companyLogo.imageUrl}
                          alt={`${job.company.name} logo`}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                      />
                  </div>
              )}
              <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{job.company.name}</p>
                   <Link href={`/jobs/${job.id}`} className="group">
                    <h3 className="font-semibold text-foreground group-hover:text-primary text-lg">{job.title}</h3>
                  </Link>
              </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2 flex-grow">{job.description}</p>

          <div className="my-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-transparent">{job.location}</Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-transparent">{job.type}</Badge>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-transparent">{job.experienceLevel}</Badge>
          </div>

          <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="font-bold text-lg text-primary">{job.salaryRange}</p>
                <p className="text-xs text-muted-foreground">per year</p>
              </div>
              <Button asChild className="transform transition-transform hover:scale-105">
                  <Link href={`/jobs/${job.id}`}>
                    Apply Now
                  </Link>
              </Button>
          </div>
      </CardContent>
    </Card>
  );
}
