
'use client';

import { useState, useEffect } from 'react';
import type { Review } from '@/lib/types';
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

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c1.61-3.39 2.54-7.31 2.54-11.09z" fill="#4285F4"/>
    <path d="M12 23c3.11 0 5.72-1.03 7.63-2.79l-3.57-2.77c-.99.66-2.23 1.06-4.06 1.06-3.53 0-6.52-2.39-7.59-5.6H.83v2.9C2.73 19.5 7.04 23 12 23z" fill="#34A853"/>
    <path d="M4.41 12.91c-.27-.81-.42-1.67-.42-2.56s.15-1.75.42-2.56V4.89H.83C.3 6.03 0 7.29 0 8.62s.3 2.59.83 3.73l3.58-2.82z" fill="#FBBC05"/>
    <path d="M12 4.41c1.69 0 3.21.58 4.41 1.71l3.31-3.31C17.71 1.03 15.1 0 12 0 7.04 0 2.73 3.5.83 7.29l3.58 2.82c1.07-3.21 4.06-5.6 7.59-5.6z" fill="#EA4335"/>
  </svg>
);

const allReviews: Review[] = [
  {
      id: '1',
      comment: "This platform helped me find my dream job in just two weeks!",
      rating: 5,
      user: { id: 'u1', name: 'Ama Mensah', professionalTitle: 'Software Developer', avatar: 'avatar-1', role: 'jobSeeker', email: '' }
  },
  {
      id: '2',
      comment: "The executive recruitment strategy is unmatched. Highly recommended.",
      rating: 5,
      user: { id: 'u2', name: 'Kofi Addo', professionalTitle: 'Product Manager', avatar: 'avatar-2', role: 'jobSeeker', email: '' }
  },
  {
      id: '3',
      comment: "A high-authority platform for professionals looking for serious growth.",
      rating: 5,
      user: { id: 'u3', name: 'Adwoa Owusu', professionalTitle: 'UX/UI Designer', avatar: 'avatar-3', role: 'jobSeeker', email: '' }
  },
  {
      id: '4',
      comment: "The AI matching accuracy is incredible. It saved me weeks of searching.",
      rating: 5,
      user: { id: 'u4', name: 'Yaw Adjei', professionalTitle: 'Data Scientist', avatar: 'avatar-4', role: 'jobSeeker', email: '' }
  },
  {
      id: '5',
      comment: "Professional, clean, and efficient. The best tool for corporate hiring.",
      rating: 5,
      user: { id: 'u5', name: 'Esi Serwaa', professionalTitle: 'Marketing Manager', avatar: 'avatar-5', role: 'jobSeeker', email: '' }
  },
  {
      id: '6',
      comment: "Seamless experience from profile creation to hiring. Five stars!",
      rating: 5,
      user: { id: 'u6', name: 'Kwame Boateng', professionalTitle: 'HR Specialist', avatar: 'avatar-7', role: 'jobSeeker', email: '' }
  }
];

const TestimonialCard = ({ review }: { review: Review }) => {
    const userAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
    return (
        <Card className="flex flex-col bg-card border border-border/50 p-6 rounded-2xl shadow-2xl transition-all hover:border-primary/20 h-full w-[360px] shrink-0">
            <CardContent className="p-0 mb-6 relative">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={5} />
                  <div className="flex items-center gap-2 px-2 py-1 rounded bg-secondary border border-border/50">
                    <GoogleLogo />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">Review</span>
                  </div>
                </div>
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/10 -z-10" />
                <div className="min-h-[80px]">
                  <p className="text-foreground italic leading-relaxed text-sm font-medium break-words whitespace-normal">
                    "{review.comment}"
                  </p>
                </div>
            </CardContent>
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/50">
                <Avatar className="h-10 w-10 border-2 border-border shadow-lg">
                    {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={review.user.name} />}
                    <AvatarFallback className="bg-primary/20 text-primary">{review.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground text-xs truncate">{review.user.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest truncate">{review.user.professionalTitle}</p>
                </div>
            </div>
        </Card>
    );
};

export default function Testimonials() {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const marqueeRow1 = [...allReviews, ...allReviews, ...allReviews];
  const marqueeRow2 = [...allReviews, ...allReviews, ...allReviews].reverse();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      setRating(5);
      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback. It will be live after a quick verification.",
        variant: 'vibrant'
      });
    }, 1500);
  };

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="font-headline text-[48px] font-black text-foreground leading-tight">What Our Users Say</h2>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-accent text-foreground hover:bg-accent/10 rounded-xl h-14 px-8 font-black text-sm shadow-2xl transition-all hover:scale-105 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      <GoogleLogo /> Add a review
                    </span>
                    <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors" />
                </Button>
              </DialogTrigger>
              {isMounted && (
                <DialogContent className="sm:max-w-[400px] bg-card border-border/50 text-foreground p-0 overflow-hidden rounded-3xl shadow-2xl">
                  <div className="bg-gradient-to-r from-primary/20 via-background to-accent/20 p-8 border-b border-border/50 relative">
                    <div className="absolute top-4 right-4 opacity-50">
                      <GoogleLogo />
                    </div>
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-black font-headline text-foreground flex items-center gap-3">
                        <GoogleLogo /> Share Your Experience
                      </DialogTitle>
                      <DialogDescription className="text-muted-foreground font-medium pt-2">
                        Help others discover the power of Chapel Hill with an authoritative review.
                      </DialogDescription>
                    </DialogHeader>
                  </div>
                  
                  <form onSubmit={handleSubmitReview} className="p-8 space-y-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Overall Rating</Label>
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
                                  : "text-muted/10 fill-muted/5"
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
                        <Label htmlFor="rev-name" className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <UserIcon className="h-3 w-3" /> Full Name
                        </Label>
                        <Input 
                          id="rev-name" 
                          placeholder="e.g. John Doe" 
                          required 
                          className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-12 rounded-xl focus:ring-primary transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rev-title" className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                          <Briefcase className="h-3 w-3" /> Job Title
                        </Label>
                        <Input 
                          id="rev-title" 
                          placeholder="e.g. Senior Developer" 
                          required 
                          className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground h-12 rounded-xl focus:ring-primary transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rev-text" className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <MessageSquare className="h-3 w-3" /> Your Review
                      </Label>
                      <Textarea 
                        id="rev-text" 
                        placeholder="Tell us how Chapel Hill helped your career..." 
                        className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground min-h-[140px] rounded-xl focus:ring-primary p-4 resize-none transition-all leading-relaxed"
                        required
                      />
                    </div>

                    <DialogFooter className="pt-4">
                      <DialogClose asChild>
                        <Button type="button" variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl h-12 px-6">Cancel</Button>
                      </DialogClose>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || rating === 0}
                        className="bg-primary text-primary-foreground font-black rounded-xl h-12 px-10 hover:brightness-110 shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5"
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
              )}
            </Dialog>
        </div>
      </div>

      <div className="space-y-8 relative">
        {isMounted && (
          <>
            <div className="flex w-full overflow-hidden">
                <div className="flex animate-marquee-rtl gap-8 py-4 whitespace-nowrap">
                    {marqueeRow1.map((review, idx) => (
                        <TestimonialCard key={`${review.id}-r1-${idx}`} review={review} />
                    ))}
                </div>
            </div>

            <div className="flex w-full overflow-hidden">
                <div className="flex animate-marquee-ltr gap-8 py-4 whitespace-nowrap">
                    {marqueeRow2.map((review, idx) => (
                        <TestimonialCard key={`${review.id}-r2-${idx}`} review={review} />
                    ))}
                </div>
            </div>
          </>
        )}

        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </section>
  );
}
