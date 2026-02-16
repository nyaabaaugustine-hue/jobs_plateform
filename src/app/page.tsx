
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, CheckCircle, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import FeaturedJobs from '@/components/featured-jobs';
import TopCompanies from '@/components/top-companies';
import { Suspense, useState, useEffect, useRef } from 'react';
import HeroSearchForm from '@/components/hero-search-form';
import SectionHeader from '@/components/shared/section-header';
import { DUMMY_JOBS, JOB_CATEGORIES, DUMMY_COMPANIES, DUMMY_LOCATIONS, DUMMY_BLOG_POSTS } from '@/lib/data';
import JobCategories from '@/components/job-categories';
import HiringSection from '@/components/hiring-section';
import LatestNews from '@/components/latest-news';
import SubscriptionSection from '@/components/subscription-section';
import WhyChooseUs from '@/components/why-choose-us';
import Testimonials from '@/components/testimonials';
import FastRoutes from '@/components/fast-routes';
import PricingGrid from '@/components/pricing-grid';
import JobsByLocation from '@/components/jobs-by-location';
import AdPanel from '@/components/shared/ad-panel';
import CompanyAds from '@/components/company-ads';
import OurPartners from '@/components/our-partners';
import Faq from '@/components/faq';

const adData = [
  {
    companyId: '1', // mPharma
    headline: 'Revolutionize Healthcare in Africa',
    description: "Join mPharma and build the future of medicine. We're hiring top tech talent to improve access to healthcare across the continent.",
    imageId: 'ad-mpharma',
  },
  {
    companyId: '2', // Hubtel
    headline: 'Powering the Digital Economy',
    description: 'At Hubtel, you will build the payment and messaging solutions used by millions. Ready to make a massive impact?',
    imageId: 'ad-hubtel',
  },
  {
    companyId: '3', // MTN Ghana
    headline: 'Connect Ghana to the World',
    description: 'Be part of the team building the largest network in Ghana. Explore exciting careers in telecommunications and digital services.',
    imageId: 'ad-mtn',
  },
];

const ads = adData.map(ad => {
    const company = DUMMY_COMPANIES.find(c => c.id === ad.companyId);
    const image = PlaceHolderImages.find(p => p.id === ad.imageId);
    return { ...ad, company, image };
});

export default function HomePage() {
  const [isAdPanelOpen, setIsAdPanelOpen] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');
  const categoryBgImage = PlaceHolderImages.find((p) => p.id === 'category-bg');
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroSectionRef.current) {
      heroSectionRef.current.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsAdPanelOpen(true);
    }, 3000);

    return () => clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;
    if (isAdPanelOpen) {
      rotationTimer = setInterval(() => {
        setCurrentAdIndex(prevIndex => (prevIndex + 1) % ads.length);
      }, 7000);
    }

    return () => clearInterval(rotationTimer);
  }, [isAdPanelOpen, ads.length]);

  const handleCloseAdPanel = () => {
    setIsAdPanelOpen(false);
  };

  const trustIndicators = [
    { text: '12,430+ jobs available' },
    { text: '4,500+ companies verified' },
    { text: '98% candidate satisfaction' },
  ];

  const latestPosts = DUMMY_BLOG_POSTS.filter(p => p.status === 'Published').slice(0, 3);
  const jobs = DUMMY_JOBS;
  const companies = DUMMY_COMPANIES.slice(0, 10);
  const categories = ['All', ...JOB_CATEGORIES.map((c) => c.name)];
  const locations = DUMMY_LOCATIONS;
  const currentAd = ads[currentAdIndex];

  return (
      <main className="flex-1">
        <AdPanel 
          isOpen={isAdPanelOpen} 
          onClose={handleCloseAdPanel} 
          ad={currentAd}
        />
        {/* Hero Section */}
        <section
          ref={heroSectionRef}
          className="relative w-full py-20 lg:py-32 flex items-center justify-center text-center"
        >
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover z-0"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 container mx-auto px-6 max-w-4xl">
            <div className="flex flex-col justify-center space-y-2">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl !leading-tight font-headline">
                Find Your Next Job, Faster.
              </h1>
              <p className="max-w-3xl mx-auto text-xl font-semibold text-gray-200" style={{ color: 'hsl(43, 33%, 85%)', fontWeight: '600' }}>
                Discover your next career move with verified employers and salary transparency.
              </p>
              <div className='pt-4'>
                <Suspense>
                  <HeroSearchForm />
                </Suspense>
              </div>
              <div className="flex items-center gap-4 pt-6 flex-wrap justify-center">
                {trustIndicators.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-white rounded-full bg-white/10 px-4 py-1.5 border border-white/20 backdrop-blur-sm">
                    <CheckCircle className="h-4 w-4 text-white" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <TopCompanies companies={companies} />

        <FeaturedJobs jobs={jobs} categories={categories} />

        <WhyChooseUs />

        <CompanyAds />

        <FastRoutes />
        
        <JobCategories />

        <HiringSection />
        
        <section className="relative py-16 md:py-24">
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
            <div className="mb-12 text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Flexible Pricing for Every Team</h2>
            </div>
            <PricingGrid />
          </div>
        </section>

        <Testimonials />

        <Faq />

        <JobsByLocation locations={locations} />
        
        <LatestNews posts={latestPosts} />

        <OurPartners />

        <SubscriptionSection />

      </main>
  );
}
