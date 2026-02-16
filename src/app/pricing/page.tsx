
'use client';

import PageHero from '@/components/shared/page-hero';
import PricingGrid from '@/components/pricing-grid';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PricingPage() {
  const categoryBgImage = PlaceHolderImages.find((p) => p.id === 'category-bg');

  return (
    <>
      <PageHero
        title="Flexible Pricing for Every Team"
        subtitle="Find the perfect plan for your needs, whether you're hiring talent or advancing your career."
      />
      <main className="relative flex-1 py-16 md:py-24">
        {categoryBgImage && (
          <Image
            src={categoryBgImage.imageUrl}
            alt="Modern office background"
            fill
            className="object-cover z-0"
            data-ai-hint={categoryBgImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />
        <div className="relative z-20">
          <PricingGrid />
        </div>
      </main>
    </>
  );
}
