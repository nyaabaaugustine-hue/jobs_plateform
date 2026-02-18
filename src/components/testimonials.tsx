'use client';

import { useState } from 'react';
import type { Review, User } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import StarRating from './shared/star-rating';
import { Button } from './ui/button';
import { PlusCircle, Star, MessageSquare, User as UserIcon, Briefcase, Loader2, Quote } from 'lucide-react';
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
import { cn } from '@/lib/utils';

const TestimonialCard = ({ review }: { review: Review }) => {
    const userAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
    return (
        <Card className="flex flex-col bg-[#151C2B] border border-white/5 p-8 rounded-2xl shadow-2xl transition-all hover:border-white/10 h-full w-[450px] shrink-0">
            <CardContent className="p-0 mb-6 relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/10 -z-10" />
                <StarRating rating={5} className="mb-4" />
                <p className="text-[#F3F4F6] italic leading-relaxed text-base font-medium">"{review.comment}"</p>
            </CardContent>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                <Avatar className="h-12 w-12 border-2 border-white/10 shadow-lg">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={review.user.name} />}
                    <AvatarFallback className="bg-primary/20 text-primary">{review.user.name?.charAt(0)}</AvatarFallback>
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

  // Manual list to match user request exactly
  const allReviews: Review[] = [
    {
        id: '1',
        comment: "This platform helped me find my dream job in just two weeks!",
        rating: 5,
        user: { id: 'u1', name: 'Ama Mensah', professionalTitle: 'Software Developer', avatar: 'avatar-1', role: 'jobSeeker', email: '' }
    },
    {
        id: '2',
        comment: "This platform helped me find my dream job in just two weeks!",
        rating: 5,
        user: { id: 'u2', name: 'Kofi Addo', professionalTitle: 'Product Manager', avatar: 'avatar-2', role: 'jobSeeker', email: '' }
    },
    {
        id: '3',
        comment: "This platform helped me find my dream job in just two weeks!",
        rating: 5,
        user: { id: 'u3', name: 'Adwoa Owusu', professionalTitle: 'UX/UI Designer', avatar: 'avatar-3', role: 'jobSeeker', email: '' }
    },
    {
        id: '4',
        comment: "This platform helped me find my dream job in just two weeks!",
        rating: 5,
        user: { id: 'u4', name: 'Yaw Adjei', professionalTitle: 'Data Scientist', avatar: 'avatar-4', role: 'jobSeeker', email: '' }
    },
    {
        id: '5',
        comment: "This platform helped me find my dream job in just two weeks!",
        rating: 5,
        user: { id: 'u5', name: 'Esi Serwaa', professionalTitle: 'Marketing Manager', avatar: 'avatar-5', role: 'jobSeeker', email: '' }
    },
    {
        id: '6',
        comment: "This platform helped me find my dream job in just two weeks!",
        rating: 5,
        user: { id: 'u6', name: 'Kwame Boateng', professionalTitle: 'HR Specialist', avatar: 'avatar-7', role: 'jobSeeker', email: '' }
    }
  ];

  // Split into two rows for the marquee
  const row1 = allReviews.slice(0, 3);
  const row2 = allReviews.slice(3, 6);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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
    <section className="py-24 bg-[#0B0F17] overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
                    <DialogTitle className="text-2xl font-black font-headline text-white">Share Your Experience</DialogTitle>
                    <DialogDescription className="text-white/60 font-medium">
                      Help others discover the power of Chapel Hill with your honest review.
                    </DialogDescription>
                  </DialogHeader>
                </div>
                
                <form onSubmit={handleSubmitReview} className="p-8 space-y-6">
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
                        <UserIcon className="h-3 w-3" /> Full Name
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
      </div>

      <div className="space-y-8 relative">
        {/* Row 1: Left-to-Right Marquee */}
        <div className="flex w-full overflow-hidden">
            <div className="flex animate-marquee-rtl gap-8 py-4 whitespace-nowrap">
                {[...row1, ...row1, ...row1].map((review, idx) => (
                    <TestimonialCard key={`${review.id}-r1-${idx}`} review={review} />
                ))}
            </div>
        </div>

        {/* Row 2: Right-to-Left Marquee */}
        <div className="flex w-full overflow-hidden">
            <div className="flex animate-marquee-ltr gap-8 py-4 whitespace-nowrap">
                {[...row2, ...row2, ...row2].map((review, idx) => (
                    <TestimonialCard key={`${review.id}-r2-${idx}`} review={review} />
                ))}
            </div>
        </div>

        {/* Gradient Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B0F17] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B0F17] to-transparent z-10" />
      </div>
    </section>
  );
}
