'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { JOB_CATEGORIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function JobCategories() {
    const categoryGroups = [];
    // This creates pairs of categories, e.g., [[cat1, cat2], [cat3, cat4], ...]
    for (let i = 0; i < JOB_CATEGORIES.length; i += 2) {
        categoryGroups.push(JOB_CATEGORIES.slice(i, i + 2));
    }

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Browse by Category
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Find the job that’s perfect for you. Over 800+ new jobs posted every day.
          </p>
        </div>
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {categoryGroups.map((group, index) => (
                <CarouselItem key={index} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                  <div className="space-y-4">
                    {group.map((category) => (
                       <Link
                        href="#"
                        key={category.name}
                        className="group rounded-lg border bg-card p-6 flex items-center gap-4 text-left transition-all duration-300 hover:bg-primary/10 hover:border-primary hover:-translate-y-1 hover:shadow-md"
                      >
                        <div className={cn('h-12 w-12 flex items-center justify-center rounded-md shrink-0', category.iconBgColor)}>
                          <category.icon className={cn('h-7 w-7', category.color)} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary leading-tight">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{category.jobCount.replace('Available', '')}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
