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

    const images = {
        img1: PlaceHolderImages.find((p) => p.id === 'subscription-1'),
        img2: PlaceHolderImages.find((p) => p.id === 'subscription-2'),
        img3: PlaceHolderImages.find((p) => p.id === 'subscription-3'),
        img4: PlaceHolderImages.find((p) => p.id === 'subscription-4'),
        img5: PlaceHolderImages.find((p) => p.id === 'subscription-5'),
    };
    
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
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative rounded-3xl bg-primary/10 p-10 md:p-16 lg:p-20 text-foreground overflow-hidden animate-in fade-in zoom-in-95 duration-700">
            {/* Decorative images */}
             {images.img1 && (
                <Image
                    src={images.img1.imageUrl}
                    alt={images.img1.description}
                    width={150}
                    height={100}
                    className="hidden lg:block absolute top-10 left-10 rounded-lg shadow-lg transform -rotate-6 object-cover w-40 h-24"
                    data-ai-hint={images.img1.imageHint}
                />
             )}
             {images.img2 && (
                <Image
                    src={images.img2.imageUrl}
                    alt={images.img2.description}
                    width={120}
                    height={120}
                    className="hidden lg:block absolute bottom-16 left-24 rounded-lg shadow-lg transform rotate-12 object-cover w-24 h-24"
                     data-ai-hint={images.img2.imageHint}
                />
             )}
             {images.img3 && (
                 <Image
                    src={images.img3.imageUrl}
                    alt={images.img3.description}
                    width={160}
                    height={100}
                    className="hidden lg:block absolute top-16 right-16 rounded-lg shadow-lg transform rotate-3 object-cover w-40 h-24"
                    data-ai-hint={images.img3.imageHint}
                />
             )}
              {images.img4 && (
                 <Image
                    src={images.img4.imageUrl}
                    alt={images.img4.description}
                    width={100}
                    height={120}
                    className="hidden lg:block absolute bottom-24 right-48 rounded-lg shadow-lg transform -rotate-8 object-cover w-24 h-32"
                    data-ai-hint={images.img4.imageHint}
                />
             )}
             {images.img5 && (
                <Image
                    src={images.img5.imageUrl}
                    alt={images.img5.description}
                    width={120}
                    height={90}
                    className="hidden lg:block absolute bottom-8 right-8 rounded-lg shadow-lg transform rotate-15 object-cover w-32 h-24"
                    data-ai-hint={images.img5.imageHint}
                />
             )}

          <div className="relative z-10 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
              Get Job Alerts
            </h2>
             <p className="mt-4 max-w-2xl mx-auto text-lg text-sky-400">
              Subscribe to our newsletter to receive the latest job postings.
            </p>
            <form onSubmit={handleSubscribe} className="mt-8 max-w-xl mx-auto">
                <div className="flex items-center gap-2 bg-card p-2 rounded-xl">
                    <Button type="submit" size="lg" className="rounded-lg bg-primary text-primary-foreground font-semibold px-6">
                        Subscribe
                    </Button>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 bg-transparent border-none focus-visible:ring-0 text-card-foreground placeholder:text-muted-foreground"
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
