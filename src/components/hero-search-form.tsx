'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Briefcase, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function HeroSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobTitle, setJobTitle] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('loc') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (jobTitle) query.set('q', jobTitle);
    if (location) query.set('loc', location);
    router.push(`/jobs?${query.toString()}`);
  };

  return (
    <div className="rounded-2xl bg-black/30 p-2 border border-white/20 backdrop-blur-lg shadow-2xl shadow-black/30">
      <form 
        onSubmit={handleSearch} 
        className="flex items-center flex-col sm:flex-row gap-2"
      >
        <div className="flex w-full items-center">
          <Briefcase className="h-5 w-5 text-white/90 mx-3" />
          <Input
            id="job-title"
            type="search"
            placeholder="Job title, keyword"
            className="border-none focus-visible:ring-0 text-base h-12 bg-transparent text-white placeholder:text-white/70"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <Separator orientation="vertical" className="h-8 hidden sm:block bg-white/20" />
        <div className="flex w-full items-center">
          <MapPin className="h-5 w-5 text-white/90 mx-3" />
          <Input
            id="location"
            type="search"
            placeholder="City or zip code"
            className="border-none focus-visible:ring-0 text-base h-12 bg-transparent text-white placeholder:text-white/70"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="bg-accent-gradient font-semibold text-base w-full sm:w-auto h-12 rounded-xl"
        >
          Find Jobs
        </Button>
      </form>
    </div>
  );
}
