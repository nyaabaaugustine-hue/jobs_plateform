"use client"

import { DUMMY_OPPORTUNITIES } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './shared/section-header';

export default function VolunteerSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader 
          title="Kickstart Your Career"
          subtitle="Explore volunteer and attachment opportunities designed for growth and hands-on experience."
        />
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {DUMMY_OPPORTUNITIES.map((opportunity, index) => (
            <Link 
              key={index} 
              href={`/opportunities?type=${opportunity.filterValue}`}
              className="block group h-full"
            >
              <Card 
                className="relative h-full bg-card/40 backdrop-blur-md border-none ring-2 ring-primary shadow-lg group-hover:shadow-glow group-hover:ring-gold transition-all duration-500 hover:-translate-y-2 rounded-[2.5rem] p-8 overflow-hidden" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="items-center pb-2 relative z-10">
                  <div className={cn("flex h-20 w-20 items-center justify-center rounded-[1.5rem] shadow-inner bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500")}>
                    <opportunity.icon className={cn("h-10 w-10 text-primary")} />
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6 text-center relative z-10">
                  <CardTitle className="mb-4 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {opportunity.title}
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed font-medium text-sm">
                    {opportunity.description}
                  </p>
                  
                  <div className="mt-8 flex items-center justify-center gap-2 text-primary font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    Explore Now <ArrowUpRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <Button asChild size="lg" className="font-black px-12 shadow-2xl bg-primary text-primary-foreground border-2 border-gold hover:bg-gold hover:text-black transition-all rounded-2xl h-16 text-sm uppercase tracking-widest group">
            <Link href="/opportunities" className="flex items-center gap-3">
              View All Opportunities <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
