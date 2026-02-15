
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface AdPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdPanel({ isOpen, onClose }: AdPanelProps) {
  // Using the first blog post image as requested by the user for styling reference
  const promoImage = PlaceHolderImages.find((p) => p.id === 'blog-post-1');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 bg-black/60 z-[99] transition-opacity duration-500 ease-in-out',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={cn(
          'fixed bottom-6 left-6 w-full max-w-sm bg-transparent border-none z-[100] transition-all duration-500 ease-in-out',
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ad-panel-headline"
      >
        <Card className="overflow-hidden transition-all duration-300 shadow-2xl group flex flex-col relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full text-white bg-black/30 hover:bg-black/60 hover:text-white z-10 h-8 w-8"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close panel</span>
          </Button>

          <Link href="#" className="block overflow-hidden">
            {promoImage && (
                <div className="relative">
                  <Image
                      src={promoImage.imageUrl}
                      alt="Boost your productivity"
                      width={600}
                      height={400}
                      className="w-full object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={promoImage.imageHint}
                      sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>
            )}
          </Link>
          <CardContent className="p-6 flex flex-col flex-grow bg-card">
              <h3 id="ad-panel-headline" className="font-headline text-lg font-bold group-hover:text-primary transition-colors">
                Boost Your Productivity Today
              </h3>
            <p className="text-muted-foreground text-sm mt-2 flex-grow">
                Discover powerful tools designed to streamline your workflow and maximize efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 pt-4 mt-4 border-t">
              <Button size="sm" className="flex-1 hover:brightness-110">Get Started</Button>
              <Button size="sm" variant="outline" className="flex-1">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </aside>
    </>
  );
}
