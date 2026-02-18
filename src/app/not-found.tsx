'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function NotFound() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'hero-main');

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center">
      {bgImage && (
        <>
          <Image
            src={bgImage.imageUrl}
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </>
      )}
      
      <div className="relative z-10 space-y-8 max-w-lg">
        <div className="space-y-4">
          <h1 className="text-9xl font-black font-headline text-primary opacity-20">404</h1>
          <h2 className="text-4xl font-black font-headline tracking-tight text-foreground">Lost in the search?</h2>
          <p className="text-lg text-muted-foreground font-medium">
            The page you are looking for doesn't exist or has been moved to a new location.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-xl font-black uppercase tracking-widest px-8 h-14">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-xl font-black uppercase tracking-widest px-8 h-14">
            <Link href="/jobs">
              <Search className="mr-2 h-4 w-4" /> Browse Jobs
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
