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
    <div className="w-full max-w-4xl mx-auto bg-[#f6f4ee] rounded-xl p-1.5 flex flex-col sm:flex-row items-center gap-1 border border-slate-300 shadow-2xl">
      <div className="flex-1 flex items-center px-4">
        <Briefcase className="h-5 w-5 text-slate-900 shrink-0" />
        <Input
          placeholder="Role or keyword"
          className="h-12 w-full bg-transparent border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-0 text-base font-bold font-headline"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      
      <div className="hidden sm:block w-px h-8 bg-slate-300 mx-2" />

      <div className="flex-1 flex items-center px-4">
        <MapPin className="h-5 w-5 text-slate-900 shrink-0" />
        <Input
          placeholder="Location"
          className="h-12 w-full bg-transparent border-none text-slate-900 placeholder:text-slate-500 focus-visible:ring-0 text-base font-bold font-headline"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSearch}
        size="lg"
        className="h-12 w-full sm:w-auto bg-black text-white font-black font-headline rounded-lg px-10 hover:brightness-110 transition-all shadow-lg"
      >
        Find Jobs
      </Button>
    </div>
  );
}