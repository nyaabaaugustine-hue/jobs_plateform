
import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DUMMY_REVIEWS } from '@/lib/data';
import StarRating from './shared/star-rating';
import Image from 'next/image';

const TestimonialCard = ({ review }: { review: Review }) => {
    const userAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
    return (
        <div className="mx-2 flex-shrink-0 w-[380px]">
            <Card className="flex h-full flex-col justify-between">
                <CardContent className="p-6">
                    <StarRating rating={review.rating} />
                    <p className="mt-4 text-muted-foreground italic">"{review.comment}"</p>
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
        </div>
    );
};

export default function Testimonials() {
  const reviews: Review[] = DUMMY_REVIEWS;
  const bgImage = PlaceHolderImages.find((p) => p.id === 'hero-main');
  
  if (!reviews || reviews.length === 0) {
    return null;
  }
  
  const firstRowReviews = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRowReviews = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="relative py-16 md:py-24">
       {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover z-0"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/90 z-10" />
      <div className="relative z-20 container mx-auto max-w-7xl px-0">
        <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 px-6 lg:px-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">What Our Users Say</h2>
        </div>

        <div className="relative w-full overflow-hidden space-y-2">
            <div className="flex animate-marquee-ltr whitespace-nowrap py-4">
                {[...firstRowReviews, ...firstRowReviews].filter(review => review.user).map((review, index) => (
                    <TestimonialCard key={`${review.id}-1-${index}`} review={review} />
                ))}
            </div>
            <div className="flex animate-marquee-rtl whitespace-nowrap py-4">
                {[...secondRowReviews, ...secondRowReviews].filter(review => review.user).map((review, index) => (
                    <TestimonialCard key={`${review.id}-2-${index}`} review={review} />
                ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
