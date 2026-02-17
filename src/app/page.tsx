
import Image from 'next/image';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_LOCATIONS, DUMMY_BLOG_POSTS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import HeroSearchForm from '@/components/hero-search-form';

// Statically imported components
import WhyChooseUs from '@/components/why-choose-us';
import VolunteerSection from '@/components/volunteer-section';
import JobsByLocation from '@/components/jobs-by-location';
import HiringSection from '@/components/hiring-section';
import LatestNews from '@/components/latest-news';
import Faq from '@/components/faq';
import SubscriptionSection from '@/components/subscription-section';

// Skeletons and UI components for skeletons
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

// --- Skeleton Components ---

const JobCardSkeleton = () => (
    <Card>
        <CardHeader className="flex flex-row items-start gap-4 p-4">
            <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
            </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4 pt-0">
            <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <Skeleton className="h-8 w-full" />
            <div className="space-y-2 pt-2 border-t">
                <Skeleton className="h-3 w-16" />
                <div className="flex flex-wrap gap-1.5">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-24 rounded-full" />
                </div>
            </div>
        </CardContent>
        <CardFooter className="p-4 flex items-end justify-between bg-secondary/50">
            <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-10 w-28 rounded-lg" />
        </CardFooter>
    </Card>
);

const FeaturedJobsSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
            <JobCardSkeleton key={i} />
        ))}
    </div>
);

const TopCompaniesSkeleton = () => (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="h-full p-4 text-center flex flex-col items-center justify-center">
                <Skeleton className="relative mb-4 h-20 w-20 rounded-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-16 mt-2" />
                <Skeleton className="h-3 w-20 mt-1" />
                <Skeleton className="h-8 w-3/4 mt-3 rounded-full" />
            </Card>
        ))}
    </div>
);

const TestimonialsSkeleton = () => (
    <div className="flex space-x-8 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="w-[350px] md:w-[400px] shrink-0">
                <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div>
                        <Skeleton className="h-4 w-24 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="flex items-center gap-4 border-t pt-6 mt-6">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
);


// --- Dynamically Imported Components ---

const TopCompanies = dynamic(() => import('@/components/top-companies'), {
    loading: () => <TopCompaniesSkeleton />,
    ssr: false
});

const FeaturedJobs = dynamic(() => import('@/components/featured-jobs'), {
    loading: () => <FeaturedJobsSkeleton />,
    ssr: false
});

const Testimonials = dynamic(() => import('@/components/testimonials'), {
    loading: () => <TestimonialsSkeleton />,
    ssr: false
});

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');
  const companies = DUMMY_COMPANIES.slice(0, 10);
  const jobs = DUMMY_JOBS;
  const categories = ['All', 'Technology', 'Marketing', 'Design', 'Finance', 'Management', 'Software', 'Healthcare', 'Education', 'Data Science'];
  const locations = DUMMY_LOCATIONS;
  const latestPosts = DUMMY_BLOG_POSTS.filter(p => p.status === 'Published').slice(0, 3);
  
  return (
    <main className="flex-1">
      {/* Hero Section (Stays static for fast LCP) */}
      <section className="relative w-full py-24 md:py-32 flex items-center justify-center text-center bg-background">
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
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl !leading-tight font-headline text-white animate-in fade-in slide-in-from-bottom-4 duration-700">
              Find Your Next Job, Faster.
            </h1>
            
            <div className="max-w-3xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '300ms'}}>
              <HeroSearchForm />
            </div>
          </div>
        </div>
      </section>

      {/* Statically loaded sections */}
      <HiringSection />

      {/* Dynamically loaded sections */}
      <Suspense fallback={<TopCompaniesSkeleton />}>
        <TopCompanies companies={companies} />
      </Suspense>

      <Suspense fallback={<FeaturedJobsSkeleton />}>
        <FeaturedJobs jobs={jobs} categories={categories} />
      </Suspense>

      {/* Statically loaded sections */}
      <WhyChooseUs />
      <VolunteerSection />
      <JobsByLocation locations={locations} />
      
      {/* Dynamically loaded section */}
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      
      {/* Statically loaded sections */}
      <LatestNews posts={latestPosts} />
      <Faq />
      <SubscriptionSection />
    </main>
  );
}
