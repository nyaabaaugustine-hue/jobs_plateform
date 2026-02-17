
'use client';

import { Newspaper, Briefcase, GraduationCap, Trophy, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const activityItems = [
  { 
    category: 'BREAKING', 
    text: 'AI Matchmaking V2.0 is now live for all Pro members', 
    icon: Newspaper,
    color: 'text-primary'
  },
  { 
    category: 'NEW LISTINGS', 
    text: 'Over 120 Senior React roles added in the last 12 hours', 
    icon: Briefcase,
    color: 'text-burgundy'
  },
  { 
    category: 'STUDENT PROGRAM', 
    text: 'Applications open for the "Code for Ghana" Summer Internship', 
    icon: GraduationCap,
    color: 'text-emerald-600'
  },
  { 
    category: 'MILESTONE', 
    text: 'Proudly supporting over 5,000+ local tech careers', 
    icon: Trophy,
    color: 'text-gold'
  },
];

export default function LiveActivityBar() {
  return (
    <div className="relative w-full overflow-hidden bg-background/80 border-y border-border/50 backdrop-blur-md z-40 h-12 flex items-center">
      {/* Gradients for fading edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex animate-marquee-rtl whitespace-nowrap items-center">
        {/* Render items multiple times for a seamless loop */}
        {[...activityItems, ...activityItems, ...activityItems].map((item, index) => (
          <div key={index} className="flex shrink-0 items-center gap-4 px-12 group">
            {/* Category Label */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", item.color === 'text-primary' ? 'bg-primary' : 'bg-burgundy')}></span>
                <span className={cn("relative inline-flex h-2 w-2 rounded-full", item.color === 'text-primary' ? 'bg-primary' : 'bg-burgundy')}></span>
              </span>
              <span className={cn(
                "font-headline text-[11px] font-black tracking-widest uppercase",
                item.color
              )}>
                {item.category}
              </span>
            </div>
            
            {/* Visual Separator */}
            <div className="h-4 w-px bg-border/60 mx-1" />

            {/* Announcement Text */}
            <span className="text-sm font-medium text-foreground/90 tracking-tight">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
