'use client';

import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DUMMY_REVIEWS, DUMMY_USERS } from '@/lib/data';
import SectionHeader from './shared/section-header';
import StarRating from './shared/star-rating';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';

const TestimonialCard = ({ review }: { review: Review }) => {
    const userAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
    return (
        <Card className="flex flex-col bg-[#151C2B] border border-white/5 p-8 rounded-2xl shadow-2xl transition-all hover:-translate-y-1">
            <CardContent className="p-0 mb-6">
                <StarRating rating={5} className="mb-4" />
                <p className="text-[#F3F4F6] italic leading-relaxed text-base font-medium line-clamp-4">"{review.comment}"</p>
            </CardContent>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                <Avatar className="h-10 w-10 border-2 border-white/10">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={review.user.name} />}
                    <AvatarFallback>{review.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold text-white text-sm">{review.user.name}</p>
                    <p className="text-[11px] text-muted-foreground uppercase font-black tracking-widest">{review.user.professionalTitle}</p>
                </div>
            </div>
        </Card>
    );
};

export default function Testimonials() {
  // Use 6 reviews for the grid
  const reviews = DUMMY_REVIEWS.slice(0, 6);

  return (
    <section className="py-24 bg-[#0B0F17]">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex items-center justify-between mb-12">
            <h2 className="font-headline text-[48px] font-black text-white leading-tight">What Our Users Say</h2>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl h-12">
                <PlusCircle className="mr-2 h-4 w-4" /> Add a review
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
                <TestimonialCard review={review} key={review.id} />
            ))}
        </div>
      </div>
    </section>
  );
}
