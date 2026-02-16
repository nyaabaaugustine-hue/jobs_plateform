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
    <div className="relative w-full overflow-hidden bg-background border-y">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex animate-marquee-rtl whitespace-nowrap">
        {/* Render items twice for seamless loop */}
        {[...activityItems, ...activityItems].map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={index} className="flex shrink-0 items-center gap-3 py-2 px-8">
              <div className={cn(
                  "rounded-lg p-1.5",
                  isEven ? "bg-muted text-foreground/80" : "bg-burgundy/10 text-burgundy"
              )}>
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <p className={cn(
                    "text-base font-bold",
                    isEven ? "text-foreground/80" : "text-burgundy"
                )}>{item.metric}</p>
                <p className="text-xs text-foreground/80">{item.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
