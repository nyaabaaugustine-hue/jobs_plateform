'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { JOB_CATEGORIES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function JobCategories() {
    const categoryGroups = [];
    // This creates pairs of categories, e.g., [[cat1, cat2], [cat3, cat4], ...]
    for (let i = 0; i < JOB_CATEGORIES.length; i += 2) {
        categoryGroups.push(JOB_CATEGORIES.slice(i, i + 2));
    }

    const bgImage = PlaceHolderImages.find((p) => p.id === 'category-bg');

  return (
    <section className="relative py-16 md:py-24">
      {bgImage && (
        <>
            <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                fill
                className="object-cover z-0"
                data-ai-hint={bgImage.imageHint}
            />
            <div className="absolute inset-0 bg-black/70 z-10" />
        </>
      )}
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-headline">
            Browse by Category
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
            Find the job that’s perfect for you. Over 800+ new jobs posted every day.
          </p>
        </div>
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
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
                        className="group rounded-lg border border-white/10 bg-white/5 p-4 flex items-center gap-3 text-left transition-all duration-300 hover:bg-white/10 hover:border-primary hover:-translate-y-1 hover:shadow-md"
                      >
                        <div className={cn('h-12 w-12 flex items-center justify-center rounded-md shrink-0', category.iconBgColor)}>
                          <category.icon className={cn('h-6 w-6', category.color)} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-primary leading-tight">
                            {category.name}
                          </h3>
                          <p className="text-xs text-gray-300">{category.jobCount}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-primary" />
            <CarouselNext className="hidden md:flex bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-primary" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
