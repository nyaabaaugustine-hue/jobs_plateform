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
    const bgImage = PlaceHolderImages.find((p) => p.id === 'african-pattern-bg');
    
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
    <section className="py-16 bg-[#0B0F17]">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative rounded-[3rem] bg-[#151C2B] p-12 md:p-16 text-center overflow-hidden border border-white/5 shadow-2xl">
          {bgImage && (
            <Image
              src={bgImage.imageUrl}
              alt="Subscription Background"
              fill
              className="object-cover z-0 opacity-20"
              data-ai-hint={bgImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0F17]/80 z-10" />
          
          <div className="relative z-20 max-w-3xl mx-auto">
            <h2 className="font-headline text-[48px] font-black text-white leading-tight">
              Get Job Alerts
            </h2>
             <p className="mt-4 text-xl font-medium text-[#F3F4F6]/80">
              Subscribe to our newsletter to receive the latest job postings and career insights.
            </p>
            <form onSubmit={handleSubscribe} className="mt-10">
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/5 backdrop-blur-md p-2.5 rounded-2xl border border-white/10 shadow-2xl focus-within:border-primary/50 transition-all">
                    <Button type="submit" size="lg" className="w-full sm:w-auto rounded-xl bg-yellow-500 text-black font-black font-headline px-10 h-14 hover:bg-yellow-400">
                        Subscribe
                    </Button>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white font-bold placeholder:text-white/30 h-14"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail className="hidden sm:block h-6 w-6 text-yellow-500 mr-4 shrink-0" />
                </div>
                 <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/30">We respect your privacy. Unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
