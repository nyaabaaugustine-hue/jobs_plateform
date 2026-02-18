
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
      {/* Hero Section - 100% Opacity Image */}
      <section className="relative w-full h-[750px] flex items-center justify-center text-center overflow-hidden">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover z-0 opacity-100"
              data-ai-hint={heroImage.imageHint}
              priority
              sizes="100vw"
            />
          )}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-5xl font-black tracking-tight sm:text-7xl !leading-tight font-headline text-white animate-in fade-in slide-in-from-bottom-4 duration-700">
              Find Your Next Job, Faster.
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 font-bold font-headline max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <span className="text-white">Discover your next career move</span> <span className="text-white/70">with verified employers and salary transparency.</span>
            </p>
            
            <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <HeroSearchForm />
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
