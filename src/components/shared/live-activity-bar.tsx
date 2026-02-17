'use client';

import { Newspaper, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const activityItems = [
  { 
    category: 'LATEST NEWS', 
    text: 'AI-Powered Career Matching is Now Live for all members', 
    icon: Newspaper,
    color: 'text-primary'
  },
  { 
    category: 'JOBS POSTED', 
    text: '150+ New React & Next.js Roles Added in the Last 24 Hours', 
    icon: Briefcase,
    color: 'text-burgundy'
  },
  { 
    category: 'STUDENT ATTACHMENTS', 
    text: '45+ Professional Internship Programs Open for Summer Applications', 
    icon: GraduationCap,
    color: 'text-emerald-600'
  },
  { 
    category: 'VERIFIED FIRMS', 
    text: 'Proudly supporting 4,500+ local tech companies actively hiring', 
    icon: Trophy,
    color: 'text-gold'
  },
];

export default function LiveActivityBar() {
  return (
    <div className="relative w-full overflow-hidden bg-background border-y border-border/50 z-40 h-12 flex items-center">
      {/* Gradients for fading edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex animate-marquee-rtl whitespace-nowrap items-center">
        {/* Render items multiple times for a seamless loop */}
        {[...activityItems, ...activityItems, ...activityItems].map((item, index) => (
          <div key={index} className="flex shrink-0 items-center gap-4 px-12 group">
            {/* Professional Status Badge */}
            <div className="flex items-center gap-2 bg-secondary/80 px-3 py-1 rounded-full border border-border/50 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", item.color === 'text-primary' ? 'bg-primary' : 'bg-burgundy')}></span>
                <span className={cn("relative inline-flex h-2 w-2 rounded-full", item.color === 'text-primary' ? 'bg-primary' : 'bg-burgundy')}></span>
              </span>
              <span className={cn(
                "font-headline text-[10px] font-black tracking-wider uppercase",
                item.color
              )}>
                {item.category}
              </span>
            </div>
            
            {/* Announcement Text in Deep Charcoal */}
            <span className="text-sm font-bold text-foreground tracking-tight font-body">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}