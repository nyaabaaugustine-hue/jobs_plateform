
'use client';

import { DUMMY_OPPORTUNITIES } from '@/lib/data';
import SectionHeader from './shared/section-header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function VolunteerSection() {
  return (
    <section className="py-24 bg-[#f6f4ee] dark:bg-secondary/10">
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          title="Kickstart Your Career"
          subtitle="Explore volunteer and attachment opportunities designed for students to gain hands-on experience and make a difference."
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {DUMMY_OPPORTUNITIES.map((opportunity, index) => (
            <Card key={index} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 bg-card border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1" style={{ animationDelay: `${200 + index * 100}ms` }}>
              <CardHeader className="items-center pb-2">
                <div className={cn("flex h-20 w-20 items-center justify-center rounded-2xl shadow-inner", opportunity.iconBg)}>
                  <opportunity.icon className={cn("h-10 w-10", opportunity.iconColor)} />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="mb-3 text-2xl font-bold">{opportunity.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed font-medium">{opportunity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '500ms' }}>
          <Button asChild size="lg" variant="outline" className="font-bold px-10 shadow-lg scale-110 border-gold text-gold hover:bg-gold/10 hover:text-gold transition-all duration-300">
            <Link href="/opportunities">Explore Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
