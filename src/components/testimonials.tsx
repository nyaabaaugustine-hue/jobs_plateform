'use client';

import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DUMMY_REVIEWS } from '@/lib/data';
import StarRating from './shared/star-rating';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import React, { useState, useEffect, useRef } from 'react';

export default function Testimonials() {
  const [isMounted, setIsMounted] = useState(false);
  const reviews: Review[] = DUMMY_REVIEWS;

  const plugin = useRef<ReturnType<typeof Autoplay> | null>(null);

  useEffect(() => {
    plugin.current = Autoplay({ delay: 5000, stopOnInteraction: true });
    setIsMounted(true);
  }, []);
  
  if (!reviews || reviews.length === 0) {
    return null;
  }
  
  if (!isMounted) {
    // Render a static placeholder or skeleton on the server and before hydration
    return (
      <section className="relative py-16 md:py-24 bg-secondary">
        <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">What Our Users Say</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Discover how we've helped professionals and companies achieve their goals.
              </p>
          </div>
          <div className="text-center text-muted-foreground">Loading testimonials...</div>
        </div>
      </section>
    )
  }
  
  return (
    <section className="relative py-16 md:py-24 bg-secondary">
      <div className="relative z-20 container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">What Our Users Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Discover how we've helped professionals and companies achieve their goals.
            </p>
        </div>

        <Carousel
          plugins={plugin.current ? [plugin.current] : []}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="relative px-4 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}
          onMouseEnter={() => plugin.current?.stop()}
          onMouseLeave={() => plugin.current?.reset()}
        >
          <CarouselContent className="-ml-4">
            {reviews.filter(review => review.user).map((review) => {
              const userAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
              return (
                <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex h-full flex-col justify-between">
                      <CardContent className="p-6">
                        <StarRating rating={review.rating} />
                        <p className="mt-4 text-muted-foreground italic">"{review.comment}"</p>
                      </CardContent>
                      <div className="flex items-center gap-4 border-t p-6">
                        <Avatar>
                          {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={review.user.name} />}
                          <AvatarFallback>{review.user.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review.user.name}</p>
                          <p className="text-sm text-muted-foreground">{review.user.role}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2 hidden md:flex" />
          <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2 hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
