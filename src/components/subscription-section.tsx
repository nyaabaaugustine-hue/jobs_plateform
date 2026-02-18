
'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function SubscriptionSection() {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const bgImage = PlaceHolderImages.find((p) => p.id === 'featured-jobs-bg');
    
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
    <section className="py-20 bg-secondary/50 relative overflow-hidden">
      {/* Background Image at 20% Opacity */}
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover z-0 opacity-20"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-secondary/80 z-10" />
      <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-20">
        <div className="relative rounded-3xl bg-card p-10 md:p-16 lg:p-20 text-center text-foreground overflow-hidden animate-in fade-in zoom-in-95 duration-700 border border-border/50">
          <div className="relative z-20">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Get Job Alerts
            </h2>
             <p className="mt-4 max-w-2xl mx-auto text-lg font-bold text-slate-500">
              Subscribe to our newsletter to receive the latest job postings.
            </p>
            <form onSubmit={handleSubscribe} className="mt-8 max-w-xl mx-auto">
                <div className="flex items-center gap-2 bg-background p-2 rounded-xl border-2 border-gold/30 focus-within:border-gold transition-colors">
                    <Button type="submit" size="lg" className="rounded-lg bg-gold text-black font-black font-headline px-6 hover:bg-gold/90">
                        Subscribe
                    </Button>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 bg-transparent border-none focus-visible:ring-0 text-foreground font-bold placeholder:text-slate-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail className="h-5 w-5 text-gold mr-2 shrink-0" />
                </div>
                 <p className="mt-2 text-xs font-bold text-slate-400">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
