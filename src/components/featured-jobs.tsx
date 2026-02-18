'use client';

import { useState } from 'react';
import type { Job } from '@/lib/types';
import JobCard from './job-card';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function FeaturedJobs({ jobs, categories }: { jobs: Job[], categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const bgImageUrl = "https://res.cloudinary.com/dwsl2ktt2/image/upload/v1771012629/Acca_jgvugd.jpg";

  const featuredJobs = jobs.filter(job => {
    if (selectedCategory === 'All') return true;
    return job.category === selectedCategory;
  }).slice(0, 9);

  return (
    <section className="relative py-20 bg-background">
      {/* Background Image at 20% Opacity */}
      <Image
        src={bgImageUrl}
        alt="Accra Background"
        fill
        className="object-cover z-0 opacity-20"
        data-ai-hint="Accra city"
        priority
      />
      <div className="absolute inset-0 bg-background/80 z-10" />
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">Featured Jobs</h2>
        </div>

        <div className="mb-8 flex justify-center flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '150ms' }}>
            {categories.map(category => (
                <Button
                    key={category}
                    variant="ghost"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                        "rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 font-headline",
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
            <p className="text-center text-muted-foreground mt-8 font-bold">No jobs found for this category.</p>
        )}

        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '500ms' }}>
          <Button asChild variant="outline" size="lg" className="rounded-xl px-8 shadow-sm hover:bg-primary/5 hover:text-primary border-primary/20 transition-all font-black font-headline">
            <Link href="/jobs">
              View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}