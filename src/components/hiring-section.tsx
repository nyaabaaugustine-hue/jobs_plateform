'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';

export default function HiringSection() {
  const hiringImage = PlaceHolderImages.find((p) => p.id === 'hiring-main');
  
  const benefits = [
    'Explore a vast pool of qualified candidates.',
    'Post job openings quickly and easily.',
    'Utilize AI to match with the perfect hire.',
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-background">
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="flex flex-col space-y-8 animate-in fade-in slide-in-from-left duration-700">
                <h2 className="text-4xl font-extrabold tracking-tight !leading-tight text-foreground sm:text-5xl lg:text-6xl">
                  Hire Senior React Developers. Fast.
                </h2>
                <p className="text-lg font-medium text-muted-foreground max-w-xl">
                  Discover qualified professionals ready to bring your projects to life. Over 4,500+ employers trust our platform to find the best developers in the ecosystem.
                </p>
                <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-4 group">
                            <CheckCircle className="h-6 w-6 text-accent shrink-0 transition-transform group-hover:scale-110" />
                            <span className="font-bold text-foreground/90">{benefit}</span>
                        </li>
                    ))}
                </ul>
                <div className="pt-6 flex flex-wrap items-center gap-4">
                    <Button 
                      asChild 
                      size="lg" 
                      className="bg-primary text-primary-foreground font-black hover:brightness-110 transition-all rounded-xl px-8"
                    >
                      <Link href="/employer/jobs/new">Post a Job</Link>
                    </Button>
                    <Button 
                      asChild 
                      size="lg" 
                      variant="outline" 
                      className="bg-transparent text-foreground border-border hover:bg-secondary transition-all rounded-xl px-8"
                    >
                      <Link href="/pricing">View Pricing</Link>
                    </Button>
                </div>
            </div>
            
            <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-right duration-1000">
                {hiringImage && (
                  <div className="relative w-full max-w-[550px]">
                    <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/10">
                      <Image
                          src={hiringImage.imageUrl}
                          alt={hiringImage.description}
                          width={600}
                          height={750}
                          className="object-cover w-full aspect-[4/5]"
                          data-ai-hint={hiringImage.imageHint}
                      />
                    </div>
                    <div className="absolute -inset-10 bg-primary/10 blur-[100px] -z-10 rounded-full opacity-40" />
                  </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
}