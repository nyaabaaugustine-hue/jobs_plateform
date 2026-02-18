'use client';

import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DUMMY_REVIEWS } from '@/lib/data';
import SectionHeader from './shared/section-header';

const TestimonialCard = ({ review }: { review: Review }) => {
    const userAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
    return (
        <Card className="flex flex-col bg-[#151C2B] border border-white/5 p-10 rounded-2xl shadow-2xl">
            <CardContent className="p-0 mb-8">
                <p className="text-[#F3F4F6] italic leading-relaxed text-lg font-medium">"{review.comment}"</p>
            </CardContent>
            <div className="flex items-center gap-4 mt-auto">
                <Avatar className="h-12 w-12 border-2 border-white/10">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={review.user.name} />}
                    <AvatarFallback>{review.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold text-white">{review.user.name}</p>
                    <p className="text-sm text-muted-foreground">{review.user.professionalTitle}</p>
                </div>
            </div>
        </Card>
    );
};

export default function Testimonials() {
  const reviews = DUMMY_REVIEWS.slice(0, 3);

  return (
    <section className="py-24 bg-[#0B0F17]">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader title="Success Stories" subtitle="Join thousands of professionals who have advanced their careers." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {reviews.map((review) => (
                <TestimonialCard review={review} key={review.id} />
            ))}
        </div>
      </div>
    </section>
  );
}