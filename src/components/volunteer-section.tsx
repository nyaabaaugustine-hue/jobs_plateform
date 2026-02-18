'use client';

import { DUMMY_OPPORTUNITIES } from '@/lib/data';
import SectionHeader from './shared/section-header';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export default function VolunteerSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Radial Glow Overlay for Midnight Theme */}
      <div className="absolute inset-0 bg-hero-radial opacity-50 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="font-headline text-[48px] font-black text-foreground leading-tight">Kickstart Your Career</h2>
            <p className="mt-4 text-[18px] text-muted-foreground font-medium font-headline tracking-wide max-w-2xl mx-auto uppercase tracking-[0.1em]">
                Elite paths for emerging talent and hand-on institutional growth.
            </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {DUMMY_OPPORTUNITIES.map((opportunity, index) => (
            <Link 
              key={index} 
              href={`/opportunities?type=${opportunity.filterValue}`}
              className="block group h-full"
            >
              <Card 
                className="relative h-full bg-card/40 backdrop-blur-md border border-border/50 shadow-lg group-hover:shadow-glow transition-all duration-500 hover:-translate-y-2 rounded-[2rem] p-8 overflow-hidden" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Subtle Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="items-center pb-2 relative z-10">
                  <div className={cn("flex h-24 w-24 items-center justify-center rounded-[1.5rem] shadow-inner bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500")}>
                    <opportunity.icon className={cn("h-12 w-12 text-primary")} />
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
        
        <div className="mt-20 text-center animate-in fade-in duration-1000 delay-500">
          <Button asChild size="lg" className="font-black px-12 shadow-2xl bg-primary hover:bg-primary/90 transition-all rounded-2xl h-16 text-sm uppercase tracking-widest">
            <Link href="/opportunities" className="flex items-center gap-3">
              View All Opportunities <ArrowUpRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}