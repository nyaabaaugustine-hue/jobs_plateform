'use client';

import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_LOCATIONS, JOB_CATEGORIES } from '@/lib/data';
import HeroSearchForm from '@/components/hero-search-form';
import TopCompanies from '@/components/top-companies';
import FeaturedJobs from '@/components/featured-jobs';
import WhyChooseUs from '@/components/why-choose-us';
import Testimonials from '@/components/testimonials';
import HiringSection from '@/components/hiring-section';
import JobsByLocation from '@/components/jobs-by-location';
import LatestNews from '@/components/latest-news';
import SubscriptionSection from '@/components/subscription-section';
import VolunteerSection from '@/components/volunteer-section';
import Faq from '@/components/faq';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function HomePage() {
  const companies = DUMMY_COMPANIES.slice(0, 10);
  const jobs = DUMMY_JOBS;
  const categories = JOB_CATEGORIES.map(c => c.name);
  
  const latestPosts = [
    {
      id: '1',
      slug: 'mastering-react-hooks',
      title: 'Mastering React Hooks: A Deep Dive',
      excerpt: 'Learn how to leverage React Hooks to write cleaner code.',
      content: '',
      image: 'blog-post-2',
      date: '2024-07-15T12:00:00Z',
      author: { id: '1', name: 'Ama Mensah', avatar: 'avatar-1', role: 'jobSeeker' },
      status: 'Published' as const,
    },
  ];

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-main');
  const avatars = ['avatar-1', 'avatar-2', 'avatar-3'];

  return (
    <main className="flex-1 bg-background">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[750px] flex items-center justify-center text-center overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover z-0"
            data-ai-hint={heroImage.imageHint}
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col space-y-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Find Your Next Job, Faster.
            </h1>
            <p className="text-xl text-white/80 font-bold max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Discover your next career move with verified employers and salary transparency.
            </p>
            <div className="w-full mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
              <HeroSearchForm />
            </div>
            <div className="flex items-center justify-center gap-3 mt-6 animate-in fade-in duration-1000 delay-500">
                <div className="flex -space-x-3">
                    {avatars.map(av => {
                        const img = PlaceHolderImages.find(p => p.id === av);
                        return (
                            <Avatar key={av} className="border-2 border-white/20 h-8 w-8">
                                {img && <AvatarImage src={img.imageUrl} />}
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        )
                    })}
                </div>
                <span className="text-sm font-bold text-white/90">3400+ Job openings</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hiring Section */}
      <HiringSection />

      {/* 3. Top Companies */}
      <TopCompanies companies={companies} />

      {/* 4. Featured Jobs */}
      <FeaturedJobs jobs={jobs} categories={categories} />

      {/* 5. Why Chapel Hill */}
      <WhyChooseUs />

      {/* 6. Kickstart Your Career */}
      <VolunteerSection />

      {/* 7. Jobs By Location */}
      <JobsByLocation locations={DUMMY_LOCATIONS} />

      {/* 8. Success Stories */}
      <Testimonials />

      {/* 9. Our News and Stories */}
      <LatestNews posts={latestPosts} />

      {/* 10. FAQ Section */}
      <Faq />

      {/* 11. Subscription Section */}
      <SubscriptionSection />
    </main>
  );
}