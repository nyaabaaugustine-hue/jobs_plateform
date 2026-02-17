
'use client';

import { useState } from 'react';
import type { Job } from '@/lib/types';
import JobCard from './job-card';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function FeaturedJobs({ jobs, categories }: { jobs: Job[], categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const bgImage = PlaceHolderImages.find((p) => p.id === 'featured-jobs-bg');

  const featuredJobs = jobs.filter(job => {
    if (selectedCategory === 'All') return true;
    return job.category === selectedCategory;
  }).slice(0, 9);

  return (
    <section className="relative py-20">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover z-0 opacity-80"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/95 z-10" />
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Featured Jobs</h2>
        </div>

        <div className="mb-8 flex justify-center flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '150ms' }}>
            {categories.map(category => (
                <Button
                    key={category}
                    variant="ghost"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                        selectedCategory === category
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-card/70 backdrop-blur-sm text-foreground ring-1 ring-border/50 hover:bg-primary/10 hover:ring-primary/50 hover:text-primary"
                    )}
                >
                    {category}
                </Button>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job, index) => (
            <div key={job.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${300 + index * 75}ms` }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
        
        {featuredJobs.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No jobs found for this category.</p>
        )}

        <div className="mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '500ms' }}>
          <Button asChild variant="outline" size="lg">
            <Link href="/jobs">
              View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
