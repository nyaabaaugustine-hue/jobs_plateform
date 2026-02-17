'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
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
      {/* Container with pointer-events-none to prevent blocking page clicks when closed */}
      <div
        className={cn(
          'fixed inset-0 z-[99] transition-all duration-500 pointer-events-none',
          isOpen ? 'bg-black/10 backdrop-blur-[1px] pointer-events-auto' : 'bg-transparent'
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed bottom-6 left-6 z-[100] w-[calc(100vw-3rem)] max-w-sm transition-all duration-500 ease-in-out',
          isOpen
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 -translate-x-full scale-95 pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ad-panel-headline"
      >
        <Card
          className="overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] group border-2 border-primary/20 bg-card/95 backdrop-blur-md"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full text-white bg-black/40 hover:bg-black/60 z-20 h-8 w-8 transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close panel</span>
          </Button>

          <div className="relative">
            <div className="w-full aspect-video overflow-hidden">
              <Image
                  src={ad.image.imageUrl}
                  alt={ad.headline}
                  fill
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint={ad.image.imageHint}
                  sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
            <div className="absolute top-2 left-2 flex gap-2">
                <Badge className="bg-primary text-white border-none text-[10px] font-bold tracking-wider uppercase px-2 py-0.5">
                    Recommended
                </Badge>
            </div>
          </div>

          <CardContent className="p-5 flex flex-col">
              <h3 id="ad-panel-headline" className="font-headline text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                {ad.headline}
              </h3>
            <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                {ad.description}
            </p>
            <div className="pt-4 mt-4 border-t flex items-center justify-between">
              <Button asChild variant="secondary" className="w-full bg-accent-gradient font-bold">
                <Link href={`/companies/${ad.company.id}`}>
                  Explore Careers <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>
    </>
  );
}
