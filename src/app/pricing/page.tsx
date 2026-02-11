'use client';

import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import PageHero from '@/components/shared/page-hero';
import PricingGrid from '@/components/pricing-grid';

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PageHero
        title="Flexible Pricing for Every Team"
        subtitle="Choose the plan that's right for you. Get started for free or unlock powerful features with our Pro plan."
      />
      <main className="flex-1 py-16 md:py-24">
        <PricingGrid />
      </main>
      <Footer />
    </div>
  );
}
