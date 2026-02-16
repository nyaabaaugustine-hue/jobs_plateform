
'use client';

import { useState } from 'react';
import type { Job } from '@/lib/types';
import SectionHeader from '@/components/shared/section-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DUMMY_OPPORTUNITIES, DUMMY_JOBS } from '@/lib/data';
import JobCard from '@/components/job-card';
import PageHero from '@/components/shared/page-hero';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function OpportunitiesPage() {
  const [filter, setFilter] = useState<'all' | 'internship' | 'volunteer'>('all');
  const bgImage = PlaceHolderImages.find((p) => p.id === 'contact-form-bg');

  const allOpportunityJobs = DUMMY_JOBS.filter(
    (job) => job.type === 'Internship' || job.type === 'Volunteer'
  );

  const filteredJobs =
    filter === 'all'
      ? allOpportunityJobs
      : allOpportunityJobs.filter((job) => job.type.toLowerCase() === filter);


  const getSectionTitle = () => {
    switch (filter) {
      case 'internship':
        return 'Featured Internships';
      case 'volunteer':
        return 'Featured Volunteer Roles';
      default:
        return 'Featured Opportunities';
    }
  };
  
   const getSectionSubtitle = () => {
    switch (filter) {
      case 'internship':
        return 'Browse some of the latest internship roles available.';
      case 'volunteer':
        return 'Browse some of the latest volunteer roles available.';
      default:
        return 'Browse some of the latest internship and volunteer roles available.';
    }
  };

  return (
    <>
      <PageHero
        title="Kickstart Your Career"
        subtitle="Explore volunteer and attachment opportunities designed for students to gain hands-on experience and make a difference."
      />
      <main className="relative flex-1 py-16 md:py-24">
        {bgImage && (
            <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                fill
                className="object-cover z-0"
                data-ai-hint={bgImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {DUMMY_OPPORTUNITIES.map((opportunity, index) => (
              <Card
                key={index}
                onClick={() => setFilter(opportunity.filterValue as any)}
                className={cn(
                    "text-center h-full transition-all duration-300 cursor-pointer group",
                    filter === opportunity.filterValue 
                        ? 'ring-2 ring-primary shadow-xl -translate-y-1' 
                        : 'hover:shadow-xl hover:-translate-y-1',
                    filter !== 'all' && filter !== opportunity.filterValue && 'opacity-60 scale-95'
                )}
              >
                <CardHeader className="items-center">
                  <div className={cn("flex h-16 w-16 items-center justify-center rounded-full transition-colors", opportunity.iconBg, filter === opportunity.filterValue && 'bg-primary/20')}>
                    <opportunity.icon className={cn("h-8 w-8 transition-colors", opportunity.iconColor, filter === opportunity.filterValue && 'text-primary')} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className={cn("mb-2 text-xl transition-colors", filter === opportunity.filterValue && 'text-primary')}>{opportunity.title}</CardTitle>
                  <p className="text-muted-foreground">{opportunity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 md:mt-24">
            <SectionHeader
              title={getSectionTitle()}
              subtitle={getSectionSubtitle()}
            />
             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div key={job.id} className="animate-in fade-in-50 duration-500">
                    <JobCard job={job} />
                  </div>
                ))
              ) : (
                <div className="md:col-span-3 text-center text-muted-foreground p-8 bg-secondary rounded-lg">
                    <p>No {filter} opportunities found at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
