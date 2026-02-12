import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, CheckCircle, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { Separator } from '@/components/ui/separator';
import JobCategories from '@/components/job-categories';
import FeaturedJobs from '@/components/featured-jobs';
import HiringSection from '@/components/hiring-section';
import TopCompanies from '@/components/top-companies';
import LatestNews from '@/components/latest-news';
import SubscriptionSection from '@/components/subscription-section';
import LiveActivityBar from '@/components/live-activity-bar';
import WhyChooseUs from '@/components/why-choose-us';
import Testimonials from '@/components/testimonials';
import { Suspense } from 'react';
import VolunteerSection from '@/components/volunteer-section';
import HeroSearchForm from '@/components/hero-search-form';
import SectionHeader from '@/components/shared/section-header';
import PricingGrid from '@/components/pricing-grid';
import JobsByLocation from '@/components/jobs-by-location';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');
  const pricingBgImage = PlaceHolderImages.find((p) => p.id === 'top-companies-bg');

  const trustIndicators = [
    { text: '12,430+ jobs available' },
    { text: '4,500+ companies verified' },
    { text: '98% candidate satisfaction' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <LiveActivityBar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-32 flex items-center justify-center text-center bg-hero-glow">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover z-0"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 container mx-auto px-6 max-w-4xl">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl !leading-tight font-headline animate-in fade-in-20 slide-in-from-bottom-8 duration-700">
                Find Your Next Job, Faster.
              </h1>
              <p className="max-w-3xl mx-auto text-lg text-gray-200 animate-in fade-in-30 slide-in-from-bottom-10 duration-700 delay-200">
                Leverage AI-powered matching, verified employers, and transparent salaries to accelerate your career.
              </p>
              <Suspense>
                <HeroSearchForm />
              </Suspense>
              <div className="flex items-center gap-6 pt-4 flex-wrap justify-center animate-in fade-in-30 slide-in-from-bottom-14 duration-700 delay-600">
                {trustIndicators.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-200">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TopCompanies />

        <FeaturedJobs />

        <WhyChooseUs />

        <VolunteerSection />

        <JobCategories />

        <HiringSection />
        
        <section className="relative py-16 md:py-24">
          {pricingBgImage && (
            <>
              <Image
                src={pricingBgImage.imageUrl}
                alt={pricingBgImage.description}
                fill
                className="object-cover z-0"
                data-ai-hint={pricingBgImage.imageHint}
              />
              <div className="absolute inset-0 bg-black/70 z-10" />
            </>
          )}
          <div className="relative z-20">
            <div className="mb-12 text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">Flexible Pricing for Every Team</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
                    Choose the plan that's right for you. Get started for free or unlock powerful features with our Pro plan.
                </p>
            </div>
            <PricingGrid />
          </div>
        </section>

        <Testimonials />

        <LatestNews />

        <JobsByLocation />

        <SubscriptionSection />
      </main>
      <Footer />
    </div>
  );
}
