'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HeroSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [jobTitle, setJobTitle] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('loc') || '');

  const avatars = ['avatar-1', 'avatar-3', 'avatar-7'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (jobTitle) query.set('q', jobTitle);
    if (location) query.set('loc', location);
    router.push(`/jobs?${query.toString()}`);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <form 
        onSubmit={handleSearch} 
        className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row items-center gap-2 shadow-2xl"
      >
        <div className="flex-1 flex items-center relative group px-4">
          <Briefcase className="h-5 w-5 text-white/70 shrink-0" />
          <Input
            id="job-title"
            type="search"
            placeholder="Job title, keyword"
            className="h-12 w-full bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0 text-base font-bold font-headline"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        
        <div className="hidden sm:block w-px h-8 bg-white/10" />

        <div className="flex-1 flex items-center relative group px-4">
          <MapPin className="h-5 w-5 text-white/70 shrink-0" />
          <Input
            id="location"
            type="search"
            placeholder="City or zip code"
            className="h-12 w-full bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0 text-base font-bold font-headline"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full sm:w-auto bg-white text-black font-headline font-black text-base rounded-xl px-8 hover:bg-white/90 transition-all shadow-lg border-none"
        >
          Find Jobs
        </Button>
      </form>

      {/* Social Proof Section */}
      <div className="flex items-center gap-3 animate-in fade-in duration-1000 delay-500">
        <div className="flex -space-x-3">
          {avatars.map((id, i) => {
            const img = PlaceHolderImages.find(p => p.id === id);
            return (
              <Avatar key={id} className="h-8 w-8 border-2 border-background ring-2 ring-black/20">
                {img && <AvatarImage src={img.imageUrl} alt="User" />}
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )
          })}
        </div>
        <p className="text-white/90 text-sm font-black tracking-tight font-headline">
          <span className="text-white">1,500+</span> <span className="text-white/70">people got jobs</span>
        </p>
      </div>
    </div>
  );
}
