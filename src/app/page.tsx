
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, CheckCircle, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import FeaturedJobs from '@/components/featured-jobs';
import TopCompanies from '@/components/top-companies';
import { Suspense } from 'react';
import HeroSearchForm from '@/components/hero-search-form';
import SectionHeader from '@/components/shared/section-header';
import { DUMMY_JOBS, JOB_CATEGORIES, DUMMY_COMPANIES, DUMMY_LOCATIONS, DUMMY_BLOG_POSTS } from '@/lib/data';
import JobCategories from '@/components/job-categories';
import HiringSection from '@/components/hiring-section';
import LatestNews from '@/components/latest-news';
import SubscriptionSection from '@/components/subscription-section';
import WhyChooseUs from '@/components/why-choose-us';
import Testimonials from '@/components/testimonials';
import PricingGrid from '@/components/pricing-grid';
import JobsByLocation from '@/components/jobs-by-location';

export default function HomePage() {
  const categoryBgImage = PlaceHolderImages.find((p) => p.id === 'category-bg');

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

  return (
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative w-full py-20 lg:py-32 flex items-center justify-center text-center bg-background overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-calm-shift [background-size:200%_200%]" />
            <div className="absolute top-[10%] left-[5%] h-64 w-64 rounded-full bg-primary/5 blur-3xl animate-drift opacity-50" />
            <div className="absolute bottom-[10%] right-[5%] h-64 w-64 rounded-full bg-accent/5 blur-3xl animate-drift [animation-delay:'-8s'] opacity-70" />
          </div>

          <div className="relative z-20 container mx-auto px-6 max-w-4xl">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl !leading-tight font-headline animate-calm-fade-in-up">
                Find Your Next Job, <span className="text-primary">Faster.</span>
              </h1>
              <p className="max-w-3xl mx-auto text-lg text-muted-foreground animate-calm-fade-in-up [animation-delay:'200ms']">
                Discover your next career move with verified employers and salary transparency.
              </p>
              <div className="animate-calm-fade-in-up [animation-delay:'400ms']">
                <Suspense>
                  <HeroSearchForm />
                </Suspense>
              </div>
              <div className="flex items-center gap-4 pt-6 flex-wrap justify-center animate-calm-fade-in-up [animation-delay:'600ms']">
                {trustIndicators.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground rounded-full bg-background/50 px-4 py-1.5 border border-border/50 backdrop-blur-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
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

        <JobCategories />

        <HiringSection />
        
        <section className="relative py-16 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
            <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Flexible Pricing for Every Team</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Choose the plan that's right for you. Get started for free or unlock powerful features with our Pro plan.
                </p>
            </div>
            <PricingGrid />
          </div>
        </section>

        <Testimonials />

        <JobsByLocation locations={locations} />
        
        <LatestNews posts={latestPosts} />

        <SubscriptionSection />

      </main>
  );
}
