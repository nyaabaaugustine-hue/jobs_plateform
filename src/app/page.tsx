'use client';

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

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');

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
                Discover thousands of opportunities with top Ghanaian companies. Your career advancement starts here.
              </p>
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 shadow-lg border border-white/20 animate-in fade-in-30 slide-in-from-bottom-12 duration-700 delay-400">
                <form className="flex items-center flex-col sm:flex-row gap-4">
                  <div className="flex w-full items-center">
                    <Briefcase className="h-5 w-5 text-gray-300 mx-3" />
                    <Input
                      id="job-title"
                      type="search"
                      placeholder="Job title, keyword"
                      className="border-none focus-visible:ring-0 text-base h-12 bg-transparent text-white placeholder:text-gray-300"
                    />
                  </div>
                  <Separator orientation="vertical" className="h-8 hidden sm:block bg-white/20" />
                  <div className="flex w-full items-center">
                    <MapPin className="h-5 w-5 text-gray-300 mx-3" />
                    <Input
                      id="location"
                      type="search"
                      placeholder="City or zip code"
                      className="border-none focus-visible:ring-0 text-base h-12 bg-transparent text-white placeholder:text-gray-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="font-semibold text-base w-full sm:w-auto h-12 rounded-xl bg-accent-gradient transform transition-transform hover:scale-105"
                  >
                    Find Jobs
                  </Button>
                </form>
              </div>
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

        <JobCategories />

        <HiringSection />
        
        <Testimonials />

        <LatestNews />

        <SubscriptionSection />
      </main>
      <Footer />
    </div>
  );
}
