'use client';

import { DUMMY_OPPORTUNITIES } from '@/lib/data';
import SectionHeader from './shared/section-header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function VolunteerSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0B0F17]">
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          title="Start Your Next Chapter."
          subtitle="Explore volunteer and attachment opportunities designed for growth."
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {DUMMY_OPPORTUNITIES.map((opportunity, index) => (
            <Card 
              key={index} 
              className="text-center bg-[#151C2B] border border-white/5 shadow-2xl hover:shadow-primary/5 transition-all hover:-translate-y-1 rounded-2xl p-6" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="items-center pb-2">
                <div className={cn("flex h-20 w-20 items-center justify-center rounded-2xl shadow-inner", opportunity.iconBg)}>
                  <opportunity.icon className={cn("h-10 w-10", opportunity.iconColor)} />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardTitle className="mb-3 text-2xl font-bold text-white">{opportunity.title}</CardTitle>
                <p className="text-muted-foreground leading-relaxed font-medium text-sm">{opportunity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="font-bold px-10 shadow-xl bg-primary hover:brightness-110 transition-all rounded-xl">
            <Link href="/opportunities">Explore Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}