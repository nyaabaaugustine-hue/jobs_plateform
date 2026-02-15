
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface AdPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdPanel({ isOpen, onClose }: AdPanelProps) {
  const promoImage = PlaceHolderImages.find((p) => p.id === 'ad-panel-promo');

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
          'fixed top-0 left-0 h-full w-full max-w-sm bg-background shadow-2xl z-[100] transition-transform duration-500 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ad-panel-headline"
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close panel</span>
        </Button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {promoImage && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={promoImage.imageUrl}
                alt={promoImage.description}
                fill
                className="object-cover"
                data-ai-hint={promoImage.imageHint}
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
          )}

          <div className="p-8 lg:p-12 space-y-6">
            <h2 id="ad-panel-headline" className="font-headline text-3xl lg:text-4xl font-bold">
              Boost Your Productivity Today
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover powerful tools designed to streamline your workflow and
              maximize efficiency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="flex-1 hover:brightness-110">Get Started</Button>
              <Button size="lg" variant="outline" className="flex-1">Learn More</Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
