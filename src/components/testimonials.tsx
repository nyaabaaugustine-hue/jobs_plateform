'use client';

import { DUMMY_REVIEWS } from '@/lib/data';
import SectionHeader from '@/components/shared/section-header';
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

export default function Testimonials() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader
          title="What Our Users Say"
          subtitle="Discover how we've helped professionals and companies achieve their goals."
        />

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="relative px-4"
        >
          <CarouselContent className="-ml-4">
            {DUMMY_REVIEWS.map((review) => {
              const userAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
              return (
                <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex h-full flex-col justify-between">
                      <CardContent className="p-6">
                        <StarRating rating={review.rating} />
                        <p className="mt-4 text-muted-foreground italic">"{review.comment}"</p>
                      </CardContent>
                      <div className="flex items-center gap-4 border-t bg-muted/50 p-6">
                        <Avatar>
                          {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={review.user.name} />}
                          <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
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
