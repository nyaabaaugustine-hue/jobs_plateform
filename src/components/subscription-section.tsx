"use client"

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SubscriptionSection() {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    
    const bgImage = PlaceHolderImages.find(p => p.id === 'african-pattern-bg');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        toast({
            title: 'Subscription Successful!',
            description: `Thank you for subscribing to job alerts at ${email}.`,
            variant: 'vibrant',
        });
        setEmail('');
    };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative rounded-[3rem] p-12 md:p-16 text-center overflow-hidden border-none ring-2 ring-primary shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-slate-900">
          {bgImage && (
            <>
              <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                fill
                className="object-cover z-0 opacity-60"
                sizes="(max-width: 768px) 100vw, 1200px"
                data-ai-hint={bgImage.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
            </>
          )}
          
          <div className="relative z-20 max-w-3xl mx-auto">
            <h2 className="font-headline text-[40px] md:text-[48px] font-black text-white leading-tight drop-shadow-md">
              Get Job Alerts
            </h2>
             <p className="mt-4 text-xl font-bold text-slate-100 drop-shadow-sm">
              Subscribe to our newsletter to receive the latest job postings and career insights.
            </p>
            
            <div className="mt-10">
                <form 
                  onSubmit={handleSubscribe} 
                  className={cn(
                    "transition-all duration-700",
                    isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                >
                    <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-xl p-2.5 rounded-2xl border border-white/20 focus-within:border-primary transition-all shadow-2xl">
                        <Button type="submit" size="lg" className="w-full sm:w-auto rounded-xl bg-primary text-black font-black font-headline px-10 h-14 hover:brightness-110 shadow-lg">
                            Subscribe
                        </Button>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white font-bold placeholder:text-slate-300 h-14"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <Mail className="hidden sm:block h-6 w-6 text-primary mr-4 shrink-0" />
                    </div>
                     <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gold bg-black/40 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
                       We respect your privacy. Unsubscribe anytime.
                     </p>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
