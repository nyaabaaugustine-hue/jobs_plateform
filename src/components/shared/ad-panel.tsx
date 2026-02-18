'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowUpRight, Megaphone } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import type { Company } from '@/lib/types';

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
      <div
        className={cn(
          'fixed inset-0 z-[99] transition-all duration-700 pointer-events-none bg-black/0',
          isOpen && 'bg-black/10 backdrop-blur-[2px] pointer-events-auto'
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          'fixed bottom-6 left-6 z-[100] w-[calc(100vw-3rem)] lg:w-[15vw] lg:min-w-[280px] transition-all duration-700 ease-in-out',
          isOpen
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 -translate-x-full scale-95 pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ad-panel-headline"
      >
        <Card
          className="overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.3)] group border-2 border-primary/10 bg-card/95 backdrop-blur-xl rounded-2xl"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 rounded-full text-white bg-black/40 hover:bg-black/60 z-20 h-8 w-8 transition-colors border border-white/20"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close panel</span>
          </Button>

          <div className="relative">
            <div className="w-full aspect-[16/9] overflow-hidden">
              <Image
                  src={ad.image.imageUrl}
                  alt={ad.headline}
                  fill
                  className="w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  data-ai-hint={ad.image.imageHint}
                  sizes="(max-width: 768px) 100vw, 15vw"
              />
            </div>
            <div className="absolute top-3 left-3 flex gap-2">
                <div className="bg-white/95 px-3 py-1.5 rounded-sm border-l-[3px] border-burgundy shadow-lg">
                    <span className="font-headline text-[10px] font-black tracking-[0.3em] uppercase text-burgundy">
                        ADVERTISEMENT
                    </span>
                </div>
            </div>
          </div>

          <CardContent className="p-6 flex flex-col">
              <h3 id="ad-panel-headline" className="font-headline text-lg font-black text-foreground leading-tight group-hover:text-primary transition-colors">
                {ad.headline}
              </h3>
            <p className="text-muted-foreground text-xs mt-2 line-clamp-2 font-bold font-headline">
                {ad.description}
            </p>
            
            <div className="pt-4 mt-4 border-t border-border/50 flex flex-col gap-2">
              <Button 
                asChild 
                className="w-full h-10 bg-white text-black border-2 border-black ring-2 ring-gold ring-offset-0 font-headline font-black tracking-wide hover:bg-[#f6f4ee] hover:scale-[1.02] transition-all rounded-xl shadow-lg"
              >
                <Link href={`/companies/${ad.company.id}`}>
                  Visit Website <ArrowUpRight className="ml-2 h-4 w-4"/>
                </Link>
              </Button>

              <Button 
                asChild 
                variant="outline"
                className="w-full h-10 bg-background text-burgundy border-2 border-burgundy font-headline font-black hover:bg-[#f6f4ee] hover:text-burgundy transition-all rounded-xl shadow-sm"
              >
                <Link href="/contacts">
                  <Megaphone className="mr-2 h-4 w-4" /> Advertise
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>
    </>
  );
}