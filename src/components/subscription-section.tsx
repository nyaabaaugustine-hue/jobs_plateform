
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
    <section className="py-20 bg-secondary">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative rounded-3xl bg-card p-10 md:p-16 lg:p-20 text-foreground overflow-hidden animate-in fade-in zoom-in-95 duration-700">
          <div className="relative z-10 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Get Job Alerts
            </h2>
             <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Subscribe to our newsletter to receive the latest job postings.
            </p>
            <form onSubmit={handleSubscribe} className="mt-8 max-w-xl mx-auto">
                <div className="flex items-center gap-2 bg-background p-2 rounded-xl border">
                    <Button type="submit" size="lg" className="rounded-lg bg-primary text-primary-foreground font-semibold px-6">
                        Subscribe
                    </Button>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 bg-transparent border-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                </div>
                 <p className="mt-2 text-xs text-foreground/60">No spam. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
