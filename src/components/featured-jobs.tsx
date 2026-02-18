'use client';

import { useState } from 'react';
import type { Job } from '@/lib/types';
import JobCard from './job-card';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import SectionHeader from './shared/section-header';

export default function FeaturedJobs({ jobs, categories }: { jobs: Job[], categories: string[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const featuredJobs = jobs.filter(job => {
    if (selectedCategory === 'All') return true;
    return job.category === selectedCategory;
  }).slice(0, 9);

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader 
          title="Featured Jobs"
          subtitle="Explore the latest roles from top-tier tech companies."
        />

        <div className="mb-12 flex justify-center flex-wrap gap-3 max-w-5xl mx-auto">
            {['All', ...categories].map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                        "rounded-full px-5 h-10 text-[11px] font-black uppercase tracking-widest transition-all duration-300 border shadow-sm ring-2 ring-gold/60",
                        "hover:scale-105 hover:shadow-xl hover:ring-gold",
                        selectedCategory === category
                            ? "bg-primary text-primary-foreground border-primary shadow-xl scale-105 ring-gold"
                            : "bg-secondary/80 backdrop-blur-sm text-foreground/70 hover:bg-secondary border-border"
                    )}
                >
                    {category}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job, index) => (
            <div key={job.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="rounded-xl border-border text-foreground bg-background/50 backdrop-blur-sm hover:bg-gold hover:text-black hover:border-gold font-black px-12 h-14 text-sm group transition-all duration-300 shadow-lg hover:shadow-gold/20"
          >
            <Link href="/jobs" className="flex items-center gap-3">
              View All Jobs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
