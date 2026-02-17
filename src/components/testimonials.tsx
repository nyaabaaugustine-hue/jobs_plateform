'use client';

import type { Review } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DUMMY_REVIEWS } from '@/lib/data';
import StarRating from './shared/star-rating';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PenLine, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Google Icon Component
const GoogleIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2">
        <title>Google</title>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
);

// Interactive Star Rating Component for the dialog
const InteractiveStarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-6 w-6 cursor-pointer',
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'
          )}
          onClick={() => setRating(i + 1)}
        />
      ))}
    </div>
  );
};


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
  const { toast } = useToast();
  const [reviews] = useState<Review[]>(DUMMY_REVIEWS.filter(review => review.user));
  
  // State for the dialog
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment || !position) {
        toast({
            title: 'Incomplete Review',
            description: 'Please fill out all fields.',
            variant: 'destructive',
        });
        return;
    }

    toast({
        title: 'Review Submitted!',
        description: 'Thank you for your feedback.',
        variant: 'vibrant',
    });
    setOpen(false); // Close the dialog
    // Reset form
    setName('');
    setPosition('');
    setComment('');
    setRating(5);
  };
  
  if (!reviews || reviews.length === 0) {
    return null;
  }
  
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center">
                <GoogleIcon />
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">What Our Users Say</h2>
            </div>
             <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-4 md:mt-0 border-gold text-gold hover:bg-gold/10 hover:text-gold">
                    <PenLine className="mr-2 h-4 w-4" /> Add a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                  <DialogDescription>Share your experience with our platform. Your feedback helps us improve.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitReview} className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="e.g., John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Your Position</Label>
                    <Input id="position" placeholder="e.g., Software Engineer" value={position} onChange={(e) => setPosition(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Your Rating</Label>
                    <InteractiveStarRating rating={rating} setRating={setRating} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment">Your Review</Label>
                    <Textarea id="comment" placeholder="What did you like or dislike?" value={comment} onChange={(e) => setComment(e.target.value)} required rows={5}/>
                  </div>
                   <DialogFooter className="pt-4">
                    <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
                    <Button type="submit">Submit Review</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
