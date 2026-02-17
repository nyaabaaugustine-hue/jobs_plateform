
'use client';

import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DUMMY_REVIEWS } from '@/lib/data';
import StarRating from './shared/star-rating';
import React from 'react';

const TestimonialCard = ({ review }: { review: Review }) => {
    const userAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
    return (
        <Card className="flex h-full flex-col justify-between w-[350px] md:w-[400px] bg-card">
            <CardContent className="p-6 flex-grow">
                <StarRating rating={review.rating} />
                <p className="mt-4 text-muted-foreground italic break-words">"{review.comment}"</p>
            </CardContent>
            <div className="flex items-center gap-4 border-t p-6 bg-secondary/30">
                <Avatar>
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={review.user.name} />}
                    <AvatarFallback>{review.user.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{review.user.name}</p>
                    <p className="text-sm text-muted-foreground">{review.user.professionalTitle}</p>
                </div>
            </div>
        </Card>
    );
};

export default function Testimonials() {
  const reviews: Review[] = DUMMY_REVIEWS.filter(review => review.user);
  
  if (!reviews || reviews.length === 0) {
    return null;
  }
  
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="py-28 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">What Our Users Say</h2>
        </div>
        
        <div className="relative mt-12 flex h-[450px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl">
            <div className="animate-marquee-rtl flex min-w-full shrink-0 items-center justify-around gap-8">
                {[...firstRow, ...firstRow].map((review, index) => (
                    <TestimonialCard review={review} key={`${review.id}-1-${index}`} />
                ))}
            </div>
             <div className="animate-marquee-ltr flex min-w-full shrink-0 items-center justify-around gap-8">
                {[...secondRow, ...secondRow].map((review, index) => (
                    <TestimonialCard review={review} key={`${review.id}-2-${index}`} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
