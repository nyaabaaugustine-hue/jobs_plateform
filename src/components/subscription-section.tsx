
"use client"

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SubscriptionSection() {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
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
        <div className="relative rounded-[3rem] bg-white p-12 md:p-16 text-center overflow-hidden border border-border/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <div className="relative z-20 max-w-3xl mx-auto">
            <h2 className="font-headline text-[40px] md:text-[48px] font-black text-[#1A1A1A] leading-tight">
              Get Job Alerts
            </h2>
             <p className="mt-4 text-xl font-medium text-[#1A1A1A]/80">
              Subscribe to our newsletter to receive the latest job postings and career insights.
            </p>
            {!mounted ? (
              <div className="mt-10 h-20 w-full bg-secondary animate-pulse rounded-2xl" />
            ) : (
              <form onSubmit={handleSubscribe} className="mt-10">
                  <div className="flex flex-col sm:flex-row items-center gap-3 bg-secondary/50 p-2.5 rounded-2xl border border-border focus-within:border-primary/50 transition-all shadow-inner">
                      <Button type="submit" size="lg" className="w-full sm:w-auto rounded-xl bg-primary text-primary-foreground font-black font-headline px-10 h-14 hover:brightness-110">
                          Subscribe
                      </Button>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 bg-transparent border-none focus-visible:ring-0 text-[#1A1A1A] font-bold placeholder:text-muted-foreground h-14"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Mail className="hidden sm:block h-6 w-6 text-primary mr-4 shrink-0" />
                  </div>
                   <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">We respect your privacy. Unsubscribe anytime.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
