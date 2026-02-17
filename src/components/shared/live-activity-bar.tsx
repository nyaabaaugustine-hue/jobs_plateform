'use client';

import { Award, Briefcase, Building, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const activityItems = [
  { icon: Briefcase, metric: '12,430', label: 'Jobs Available' },
  { icon: Building, metric: '4,500', label: 'Companies Hiring' },
  { icon: CheckCircle, metric: '98%', label: 'Candidate Satisfaction' },
  { icon: Award, metric: '320', label: 'Hires This Week' },
];

export default function LiveActivityBar() {
  return (
    <div className="relative w-full overflow-hidden bg-primary/5 border-y border-primary/10 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background/80 to-transparent" />

      <div className="flex animate-marquee-rtl whitespace-nowrap py-2.5">
        {/* Render items multiple times for a continuous loop */}
        {[...activityItems, ...activityItems, ...activityItems, ...activityItems].map((item, index) => (
          <div key={index} className="flex shrink-0 items-center gap-3 px-12">
            <div className="rounded-lg p-1.5 bg-primary/10 text-primary">
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{item.metric}</p>
              <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
