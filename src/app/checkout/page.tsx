
'use client';

import { Suspense } from 'react';
import CheckoutForm, { CheckoutFormSkeleton } from './_components/checkout-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';


export default function CheckoutPage() {
  const bgImage = PlaceHolderImages.find((p) => p.id === 'checkout-bg');

  return (
      <main className="relative flex-1 flex flex-col items-center justify-center py-16 md:py-24">
        {bgImage && (
            <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                fill
                className="object-cover z-0"
                data-ai-hint={bgImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="relative z-20 container mx-auto max-w-4xl px-4 md:px-6">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl sm:text-5xl font-bold text-foreground">Complete Your Purchase</h1>
                <p className="mt-2 text-lg text-muted-foreground">You're just one step away from unlocking powerful hiring tools.</p>
            </div>
            <Suspense fallback={<CheckoutFormSkeleton />}>
                <CheckoutForm />
            </Suspense>
        </div>
      </main>
  );
}

    