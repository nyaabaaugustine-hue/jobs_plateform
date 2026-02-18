
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black z-10 transition-transform group-focus-within:scale-110" />
          <Input
            id="job-title"
            type="search"
            placeholder="Job title, keyword"
            className="h-14 w-full bg-white border-2 border-black rounded-xl pl-12 pr-4 text-black font-bold text-lg placeholder:text-black/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-black transition-all shadow-lg"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        
        <div className="flex-1 relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black z-10 transition-transform group-focus-within:scale-110" />
          <Input
            id="location"
            type="search"
            placeholder="City or zip code"
            className="h-14 w-full bg-white border-2 border-black rounded-xl pl-12 pr-4 text-black font-bold text-lg placeholder:text-black/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-black transition-all shadow-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-14 bg-black text-white border-2 border-black font-black text-base uppercase tracking-widest rounded-xl px-10 hover:bg-black/90 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Find Jobs
        </Button>
      </form>
    </div>
  );
}
