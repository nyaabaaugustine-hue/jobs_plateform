'use client';

import { useState } from 'react';
import type { Review } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { DUMMY_REVIEWS } from '@/lib/data';
import StarRating from './shared/star-rating';
import { Button } from './ui/button';
import { PlusCircle, Star, MessageSquare, User, Briefcase, Loader2 } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';

const TestimonialCard = ({ review }: { review: Review }) => {
    const userAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
    return (
        <Card className="flex flex-col bg-[#151C2B] border border-white/5 p-8 rounded-2xl shadow-2xl transition-all hover:border-white/10 h-full">
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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Use 6 reviews for the grid
  const reviews = DUMMY_REVIEWS.slice(0, 6);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      setRating(0);
      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback. It will be live after a quick verification.",
        variant: 'vibrant'
      });
    }, 1500);
  };

  return (
    <section className="py-24 bg-[#0B0F17]">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <h2 className="font-headline text-[48px] font-black text-white leading-tight">What Our Users Say</h2>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl h-12 px-6 font-bold shadow-lg transition-all hover:scale-105">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add a review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-[#111827] border-white/5 text-white p-0 overflow-hidden rounded-3xl shadow-2xl">
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-8 border-b border-white/5">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black font-headline">Share Your Experience</DialogTitle>
                    <DialogDescription className="text-white/60 font-medium">
                      Help others discover the power of Chapel Hill with your honest review.
                    </DialogDescription>
                  </DialogHeader>
                </div>
                
                <form onSubmit={handleSubmitReview} className="p-8 space-y-6">
                  {/* Rating Section */}
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-white/40">Overall Rating</Label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="transition-transform hover:scale-110 active:scale-95"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        >
                          <Star 
                            className={cn(
                              "h-10 w-10 transition-colors",
                              (hoverRating || rating) >= star 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-white/10 fill-white/5"
                            )}
                          />
                        </button>
                      ))}
                      <span className="ml-4 font-black text-xl text-yellow-400">
                        {rating > 0 ? rating.toFixed(1) : ''}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rev-name" className="text-xs font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                        <User className="h-3 w-3" /> Full Name
                      </Label>
                      <Input 
                        id="rev-name" 
                        placeholder="e.g. John Doe" 
                        required 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rev-title" className="text-xs font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                        <Briefcase className="h-3 w-3" /> Job Title
                      </Label>
                      <Input 
                        id="rev-title" 
                        placeholder="e.g. Senior Developer" 
                        required 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rev-text" className="text-xs font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                      <MessageSquare className="h-3 w-3" /> Your Review
                    </Label>
                    <Textarea 
                      id="rev-text" 
                      placeholder="Tell us how Chapel Hill helped your career..." 
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 min-h-[120px] rounded-xl focus:ring-primary p-4 resize-none"
                      required
                    />
                  </div>

                  <DialogFooter className="pt-4">
                    <DialogClose asChild>
                      <Button type="button" variant="ghost" className="text-white/40 hover:text-white hover:bg-white/5">Cancel</Button>
                    </DialogClose>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || rating === 0}
                      className="bg-primary text-white font-black rounded-xl h-12 px-10 hover:brightness-110 shadow-xl shadow-primary/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                        </>
                      ) : 'Post Review'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full relative px-4 md:px-12"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <TestimonialCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 bg-[#151C2B] border-white/10 hover:bg-[#1F2937] text-white" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 bg-[#151C2B] border-white/10 hover:bg-[#1F2937] text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
