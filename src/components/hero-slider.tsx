
'use client';

import * as React from 'react';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSlider() {
  const heroBanners = PlaceHolderImages.filter(
    (img) => img.id.startsWith('hero-banner-')
  );

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-lg"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {heroBanners.map((banner, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
                {banner && (
                  <Image
                    src={banner.imageUrl}
                    alt={banner.description}
                    width={600}
                    height={600}
                    className="rounded-xl object-cover shadow-lg w-full aspect-square"
                    data-ai-hint={banner.imageHint}
                    priority={index === 0}
                  />
                )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
