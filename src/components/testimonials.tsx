'use client';

import { DUMMY_REVIEWS } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import StarRating from './shared/star-rating';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import React from 'react';
import Image from 'next/image';

export default function Testimonials() {

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
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
        <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-white">What Our Users Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
                Discover how we've helped professionals and companies achieve their goals.
            </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="relative px-4"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-4">
            {DUMMY_REVIEWS.map((review) => {
              const userAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
              return (
                <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex h-full flex-col justify-between bg-card/80 backdrop-blur-sm border-white/20 text-white">
                      <CardContent className="p-6">
                        <StarRating rating={review.rating} />
                        <p className="mt-4 text-gray-300 italic">"{review.comment}"</p>
                      </CardContent>
                      <div className="flex items-center gap-4 border-t border-white/10 bg-white/5 p-6">
                        <Avatar>
                          {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={review.user.name} />}
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review.user.name}</p>
                          <p className="text-sm text-gray-400">{review.user.role}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2 hidden md:flex bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-primary" />
          <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2 hidden md:flex bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-primary" />
        </Carousel>
      </div>
    </section>
  );
}
