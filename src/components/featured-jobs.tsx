'use client';

import { useState } from 'react';
import { DUMMY_JOBS, JOB_CATEGORIES } from '@/lib/data';
import JobCard from './job-card';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FeaturedJobs() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...JOB_CATEGORIES.map((c) => c.name)];

  const featuredJobs = DUMMY_JOBS.filter(job => {
    if (selectedCategory === 'All') return true;
    return job.category === selectedCategory;
  }).slice(0, 9);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Featured Jobs</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Get the most exciting jobs from all around the world and grow your career.
          </p>
        </div>

        <div className="mb-8 flex justify-center flex-wrap gap-3">
            {categories.map(category => (
                <Button
                    key={category}
                    variant="ghost"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                        selectedCategory === category
                            ? "bg-accent-gradient text-primary-foreground shadow-lg ring-2 ring-offset-background ring-offset-2 ring-accent"
                            : "bg-card text-foreground border border-border/50 hover:bg-primary/10 hover:border-primary/20 hover:text-primary hover:shadow-md"
                    )}
                >
                    {category}
                </Button>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        
        {featuredJobs.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No jobs found for this category.</p>
        )}

        <div className="mt-10 text-center">
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
