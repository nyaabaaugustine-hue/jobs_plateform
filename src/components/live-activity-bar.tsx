
'use client';

import { Award, Briefcase, Building, CheckCircle } from 'lucide-react';

const activityItems = [
  { icon: Briefcase, metric: '12,430', label: 'Jobs Available' },
  { icon: Building, metric: '4,500', label: 'Companies Hiring' },
  { icon: CheckCircle, metric: '98%', label: 'Candidate Satisfaction' },
  { icon: Award, metric: '320', label: 'Hires This Week' },
];

export default function LiveActivityBar() {
  return (
    <div className="relative w-full overflow-hidden bg-muted/50 border-y">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-muted/50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-muted/50 to-transparent" />

      <div className="flex animate-marquee-rtl whitespace-nowrap">
        {/* Render items twice for seamless loop */}
        {[...activityItems, ...activityItems].map((item, index) => (
          <div key={index} className="flex shrink-0 items-center gap-3 py-2 px-8 text-foreground">
            <div className="rounded-lg bg-burgundy/10 p-1.5 text-burgundy">
              <item.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-base font-bold text-burgundy">{item.metric}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
