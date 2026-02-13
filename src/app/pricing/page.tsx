'use client';

import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import PageHero from '@/components/shared/page-hero';
import PricingGrid from '@/components/pricing-grid';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function PricingPage() {
  const categoryBgImage = PlaceHolderImages.find((p) => p.id === 'category-bg');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PageHero
        title="Flexible Pricing for Every Team"
        subtitle="Choose the plan that's right for you. Get started for free or unlock powerful features with our Pro plan."
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
      <Footer />
    </div>
  );
}
