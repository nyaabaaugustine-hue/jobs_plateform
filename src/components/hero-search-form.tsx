
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
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
    <div className="w-full">
      <form 
        onSubmit={handleSearch} 
        className="flex flex-col sm:flex-row gap-4 w-full items-stretch"
      >
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 transition-colors group-focus-within:text-primary" />
          <Input
            id="job-title"
            type="search"
            placeholder="Job title, keyword"
            className="h-14 w-full bg-white dark:bg-card border-border rounded-xl pl-12 pr-4 text-foreground font-medium text-lg shadow-sm focus-visible:ring-primary"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        
        <div className="flex-1 relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 transition-colors group-focus-within:text-primary" />
          <Input
            id="location"
            type="search"
            placeholder="City or zip code"
            className="h-14 w-full bg-white dark:bg-card border-border rounded-xl pl-12 pr-4 text-foreground font-medium text-lg shadow-sm focus-visible:ring-primary"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-14 bg-primary text-white font-bold text-lg rounded-xl px-10 hover:bg-primary/90 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          Find Jobs
        </Button>
      </form>
    </div>
  );
}
