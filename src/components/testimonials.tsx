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
        <Card className="flex flex-col bg-card border-none p-8 rounded-lg min-w-[320px] max-w-[400px]">
            <CardContent className="p-0 mb-8">
                <p className="text-foreground italic leading-relaxed text-[17px]">"{review.comment}"</p>
            </CardContent>
            <div className="flex items-center gap-4 mt-auto">
                <Avatar className="h-10 w-10">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={review.user.name} />}
                    <AvatarFallback>{review.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold text-sm">{review.user.name}</p>
                    <p className="text-xs text-muted-foreground">{review.user.professionalTitle}</p>
                </div>
            </div>
        </Card>
    );
};

export default function Testimonials() {
  const reviews = DUMMY_REVIEWS.slice(0, 3);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeader title="Success Stories" subtitle="Join thousands of professionals who have advanced their careers through Chapel Hill." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {reviews.map((review) => (
                <TestimonialCard review={review} key={review.id} />
            ))}
        </div>
      </div>
    </section>
  );
}