'use client';

import dynamic from 'next/dynamic';
import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_LOCATIONS, JOB_CATEGORIES, DUMMY_USERS } from '@/lib/data';
import TopCompanies from '@/components/top-companies';
import FeaturedJobs from '@/components/featured-jobs';
import WhyChooseUs from '@/components/why-choose-us';
import HiringSection from '@/components/hiring-section';
import JobsByLocation from '@/components/jobs-by-location';
import LatestNews from '@/components/latest-news';
import VolunteerSection from '@/components/volunteer-section';
import Faq from '@/components/faq';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

// Bulletproof Dynamic Rendering to solve hydration mismatches
const HeroSearchForm = dynamic(() => import('@/components/hero-search-form'), {
  ssr: false,
  loading: () => <div className="h-16 w-full max-w-4xl mx-auto bg-muted animate-pulse rounded-xl" />
});

const SubscriptionSection = dynamic(() => import('@/components/subscription-section'), {
  ssr: false,
});

const Testimonials = dynamic(() => import('@/components/testimonials'), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-background animate-pulse" />
});

export default function HomePage() {
  const companies = DUMMY_COMPANIES.slice(0, 10);
  const jobs = DUMMY_JOBS;
  const categories = JOB_CATEGORIES.map(c => c.name);
  
  const latestPosts = [
    {
      id: '1',
      slug: 'mastering-react-hooks',
      title: 'Mastering React Hooks: A Deep Dive',
      excerpt: 'Learn how to leverage React Hooks to write cleaner, more efficient code in your Next.js applications.',
      content: '<p>React Hooks are essential for modern web development. From state management to side effects, we cover the core concepts every developer should master.</p>',
      image: 'blog-post-2',
      date: '2024-07-15T12:00:00Z',
      author: DUMMY_USERS[0],
      status: 'Published' as const,
    },
    {
      id: '2',
      slug: 'career-growth-tips',
      title: 'Accelerate Your Career in 2024',
      excerpt: 'Strategic advice for professionals looking to make their next big move in the tech industry.',
      content: '',
      image: 'blog-post-1',
      date: '2024-07-18T10:00:00Z',
      author: DUMMY_USERS[1],
      status: 'Published' as const,
    },
    {
      id: '3',
      slug: 'remote-work-culture',
      title: 'Thriving in a Remote-First World',
      excerpt: 'Best practices for staying productive and maintaining a healthy work-life balance while working from home.',
      content: '',
      image: 'blog-post-6',
      date: '2024-07-20T09:00:00Z',
      author: DUMMY_USERS[2],
      status: 'Published' as const,
    }
  ];

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-main');
  const avatars = ['avatar-1', 'avatar-2', 'avatar-3'];

  return (
    <main className="flex-1 bg-background">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[650px] flex items-center justify-center text-center overflow-hidden bg-hero-radial">
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
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white animate-in fade-in slide-in-from-bottom-4 duration-1000 font-headline">
              Find Your Next Job, <span className="text-primary">Faster.</span>
            </h1>
            <p className="text-xl text-white/80 font-bold max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Discover your next career move with verified employers and salary transparency.
            </p>
            <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
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