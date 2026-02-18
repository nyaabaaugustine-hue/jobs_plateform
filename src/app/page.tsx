import { DUMMY_JOBS, DUMMY_COMPANIES } from '@/lib/data';
import HeroSearchForm from '@/components/hero-search-form';
import TopCompanies from '@/components/top-companies';
import FeaturedJobs from '@/components/featured-jobs';
import WhyChooseUs from '@/components/why-choose-us';
import Testimonials from '@/components/testimonials';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const companies = DUMMY_COMPANIES.slice(0, 10);
  const jobs = DUMMY_JOBS;
  const categories = ['All', 'Technology', 'Finance', 'Software', 'Management'];
  
  return (
    <main className="flex-1 bg-background">
      {/* Hero Section — Authoritative Version */}
      <section className="relative w-full h-[650px] flex items-center justify-center text-center overflow-hidden border-b">
        <div className="absolute inset-0 bg-[#0B0F17]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-20 container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col space-y-6">
            <h1 className="text-[56px] font-bold tracking-tight text-white animate-in fade-in slide-in-from-bottom-2 duration-700">
              Find Better Work
            </h1>
            <p className="text-[20px] text-muted-foreground font-medium max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
              Built for serious professionals and ambitious companies.
            </p>
            
            <div className="w-full mt-10 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-400">
              <HeroSearchForm />
            </div>
          </div>
        </div>
      </section>

      <FeaturedJobs jobs={jobs} categories={categories} />

      <TopCompanies companies={companies} />

      <WhyChooseUs />
      
      <Testimonials />
      
      {/* CTA Section — Deep Contrast */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-[36px] font-bold text-white mb-8">Ready to Move Forward?</h2>
          <Button asChild size="lg" className="bg-primary text-white px-10 h-14 text-lg font-bold rounded-lg hover:brightness-90 transition-all">
            <Link href="/register">Join the Network</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}