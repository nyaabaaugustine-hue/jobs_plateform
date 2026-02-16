
import Image from 'next/image';
import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_LOCATIONS, DUMMY_BLOG_POSTS } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import TopCompanies from '@/components/top-companies';
import FeaturedJobs from '@/components/featured-jobs';
import WhyChooseUs from '@/components/why-choose-us';
import VolunteerSection from '@/components/volunteer-section';
import JobsByLocation from '@/components/jobs-by-location';
import Testimonials from '@/components/testimonials';
import HiringSection from '@/components/hiring-section';
import LatestNews from '@/components/latest-news';
import SubscriptionSection from '@/components/subscription-section';
import Faq from '@/components/faq';
import HeroSearchForm from '@/components/hero-search-form';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-main');
  const companies = DUMMY_COMPANIES.slice(0, 10);
  const jobs = DUMMY_JOBS;
  const categories = ['All', 'Technology', 'Marketing', 'Design', 'Finance', 'Management'];
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
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl !leading-tight font-headline animate-in fade-in slide-in-from-bottom-4 duration-700">
              Find Your Next Job, Faster.
            </h1>
            <p className="max-w-xl mx-auto text-lg text-foreground/90 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '150ms'}}>
              Discover your next career move with verified employers and salary transparency.
            </p>
            <div className="max-w-3xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '300ms'}}>
              <HeroSearchForm />
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

      <TopCompanies companies={companies} />
      <FeaturedJobs jobs={jobs} categories={categories} />
      <WhyChooseUs />
      <VolunteerSection />
      <JobsByLocation locations={locations} />
      <Testimonials />
      <HiringSection />
      <LatestNews posts={latestPosts} />
      <SubscriptionSection />
      <Faq />
    </main>
  );
}
