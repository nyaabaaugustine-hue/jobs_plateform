
import Image from 'next/image';
import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_LOCATIONS, DUMMY_BLOG_POSTS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import HeroSearchForm from '@/components/hero-search-form';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import nextDynamic from 'next/dynamic';

const TopCompanies = nextDynamic(() => import('@/components/top-companies'), {
  loading: () => <Skeleton className="h-[300px] w-full" />,
});
const FeaturedJobs = nextDynamic(() => import('@/components/featured-jobs'), {
  loading: () => <Skeleton className="h-[500px] w-full" />,
});
const WhyChooseUs = nextDynamic(() => import('@/components/why-choose-us'), {
  loading: () => <Skeleton className="h-[300px] w-full" />,
});
const VolunteerSection = nextDynamic(() => import('@/components/volunteer-section'), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
});
const JobsByLocation = nextDynamic(() => import('@/components/jobs-by-location'), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
});
const Testimonials = nextDynamic(() => import('@/components/testimonials'), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
});
const HiringSection = nextDynamic(() => import('@/components/hiring-section'), {
    loading: () => <Skeleton className="h-[500px] w-full" />,
});
const LatestNews = nextDynamic(() => import('@/components/latest-news'), {
    loading: () => <Skeleton className="h-[500px] w-full" />,
});
const SubscriptionSection = nextDynamic(() => import('@/components/subscription-section'), {
    loading: () => <Skeleton className="h-[300px] w-full" />,
});
const Faq = nextDynamic(() => import('@/components/faq'), {
    loading: () => <Skeleton className="h-[500px] w-full" />,
});


export const dynamic = "force-dynamic";

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');
  const companies = DUMMY_COMPANIES.slice(0, 10);
  const jobs = DUMMY_JOBS;
  const categories = ['All', 'Technology', 'Marketing', 'Design', 'Finance', 'Management', 'Software', 'Healthcare', 'Education', 'Data Science'];
  const locations = DUMMY_LOCATIONS;
  const latestPosts = DUMMY_BLOG_POSTS.filter(p => p.status === 'Published').slice(0, 3);
  
  return (
    <main className="flex-1">
      {/* Hero Section */}
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
            <p className="max-w-xl mx-auto text-lg text-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '150ms'}}>
              Discover your next career move with verified employers and salary transparency.
            </p>
            <div className="max-w-3xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '300ms'}}>
              <Suspense fallback={<Skeleton className="h-16 w-full rounded-2xl" />}>
                <HeroSearchForm />
              </Suspense>
            </div>
             <div className="flex justify-center items-center gap-4 text-sm text-gray-300 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '450ms'}}>
                <div className="flex items-center -space-x-2">
                    <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-background" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80" alt="User" width={32} height={32} />
                    <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-background" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="User" width={32} height={32} />
                    <Image className="inline-block h-8 w-8 rounded-full ring-2 ring-background" src="https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="User" width={32} height={32} />
                </div>
                <p><span className="font-bold text-white">1,500+</span> people got jobs</p>
             </div>
          </div>
        </div>
      </section>

      <HiringSection />
      <TopCompanies companies={companies} />
      <FeaturedJobs jobs={jobs} categories={categories} />
      <WhyChooseUs />
      <VolunteerSection />
      <JobsByLocation locations={locations} />
      <Testimonials />
      <LatestNews posts={latestPosts} />
      <Faq />
      <SubscriptionSection />
    </main>
  );
}
