
import Image from 'next/image';
import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_LOCATIONS, DUMMY_BLOG_POSTS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import HeroSearchForm from '@/components/hero-search-form';
import TopCompanies from '@/components/top-companies';
import FeaturedJobs from '@/components/featured-jobs';
import WhyChooseUs from '@/components/why-choose-us';
import VolunteerSection from '@/components/volunteer-section';
import JobsByLocation from '@/components/jobs-by-location';
import HiringSection from '@/components/hiring-section';
import LatestNews from '@/components/latest-news';
import Faq from '@/components/faq';
import SubscriptionSection from '@/components/subscription-section';
import Testimonials from '@/components/testimonials';


export default function HomePage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');
  const companies = DUMMY_COMPANIES.slice(0, 10);
  const jobs = DUMMY_JOBS;
  const categories = ['All', 'Technology', 'Marketing', 'Design', 'Finance', 'Management', 'Software', 'Healthcare', 'Education', 'Data Science'];
  const locations = DUMMY_LOCATIONS;
  const latestPosts = DUMMY_BLOG_POSTS.filter(p => p.status === 'Published').slice(0, 3);
  
  return (
    <main className="flex-1 bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[700px] flex items-center justify-center text-center">
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
        <div className="absolute inset-0 bg-black/50 z-10" />
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
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background z-20" />
      </section>

      <HiringSection />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-24" />
      </div>

      <TopCompanies companies={companies} />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-24" />
      </div>

      <FeaturedJobs jobs={jobs} categories={categories} />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-24" />
      </div>

      <WhyChooseUs />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-24" />
      </div>

      <VolunteerSection />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-24" />
      </div>

      <JobsByLocation locations={locations} />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-24" />
      </div>

      <Testimonials />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-24" />
      </div>
      
      <LatestNews posts={latestPosts} />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-24" />
      </div>
      
      <Faq />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-24" />
      </div>

      <SubscriptionSection />
    </main>
  );
}
