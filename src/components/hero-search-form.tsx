'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function HeroSearchForm() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (jobTitle) query.set('q', jobTitle);
    if (location) query.set('loc', location);
    router.push(`/jobs?${query.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-surface rounded-xl p-1.5 flex flex-col sm:flex-row items-center gap-1">
      <div className="flex-1 flex items-center px-4">
        <Briefcase className="h-4 w-4 text-muted-foreground shrink-0" />
        <Input
          placeholder="Role or keyword"
          className="h-12 w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 text-base font-medium"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      
      <div className="hidden sm:block w-px h-6 bg-white/10" />

      <div className="flex-1 flex items-center px-4">
        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
        <Input
          placeholder="Location"
          className="h-12 w-full bg-transparent border-none text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 text-base font-medium"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSearch}
        size="lg"
        className="h-12 w-full sm:w-auto bg-primary text-white font-bold rounded-lg px-8 hover:bg-primary/90 transition-all"
      >
        Search
      </Button>
    </div>
  );
}