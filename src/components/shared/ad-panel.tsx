'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import type { Company } from '@/lib/types';
import { Badge } from '@/components/ui/badge';


type Ad = {
  companyId: string;
  headline: string;
  description: string;
  imageId: string;
  company: Company | undefined;
  image: ImagePlaceholder | undefined;
};

interface AdPanelProps {
  isOpen: boolean;
  onClose: () => void;
  ad: Ad | undefined;
}

export default function AdPanel({ isOpen, onClose, ad }: AdPanelProps) {
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

  if (!ad || !ad.company || !ad.image) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 bg-black/60 z-[99] transition-opacity duration-500',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={cn(
          'fixed bottom-6 left-6 w-full max-w-sm bg-transparent border-none z-[100] transition-all duration-500 ease-in-out',
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ad-panel-headline"
      >
        <Card className="overflow-hidden transition-all duration-300 shadow-2xl group flex flex-col relative ring-4 ring-primary/40">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full text-white bg-black/30 hover:bg-black/60 hover:text-white z-20 h-8 w-8"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close panel</span>
          </Button>

          <Link href={`/companies/${ad.company.id}`} className="block overflow-hidden">
            <div className="relative">
              <Image
                  src={ad.image.imageUrl}
                  alt={ad.headline}
                  width={600}
                  height={400}
                  className="w-full object-cover aspect-[16/9] transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={ad.image.imageHint}
                  sizes="(max-width: 768px) 100vw, 30vw"
              />
              <Badge variant="secondary" className="absolute top-2 left-2 bg-destructive/10 text-destructive border-destructive/20 text-xs z-10">
                Advertisement
              </Badge>
            </div>
          </Link>
          <CardContent className="p-6 flex flex-col flex-grow bg-card">
              <h3 id="ad-panel-headline" className="font-headline text-lg font-bold group-hover:text-primary transition-colors">
                {ad.headline}
              </h3>
            <p className="text-muted-foreground text-sm mt-2 flex-grow">
                {ad.description}
            </p>
            <div className="pt-4 mt-4 border-t">
              <Button asChild variant="secondary" size="sm" className="w-full hover:brightness-110">
                <Link href={`/companies/${ad.company.id}`}>
                  View Careers at {ad.company.name} <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>
    </>
  );
}
