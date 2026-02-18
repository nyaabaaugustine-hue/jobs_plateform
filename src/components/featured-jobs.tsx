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
    <section className="relative py-24 bg-[#0B0F17]">
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader 
          title="Featured Jobs"
        />

        <div className="mb-12 flex justify-center flex-wrap gap-3">
            {['All', ...categories].map(category => (
                <Button
                    key={category}
                    variant="ghost"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                        "rounded-full px-6 py-2 text-xs font-bold tracking-wide transition-all duration-300 h-10",
                        selectedCategory === category
                            ? "bg-primary text-white shadow-xl scale-105"
                            : "bg-[#151C2B] text-muted-foreground hover:bg-[#1F2937] hover:text-white border border-white/5"
                    )}
                >
                    {category}
                </Button>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job, index) => (
            <div key={job.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-xl bg-[#151C2B] border border-white/10 hover:bg-[#1F2937] text-white font-black px-12 h-14 text-sm group transition-all">
            <Link href="/jobs" className="flex items-center gap-3">
              View All Jobs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
