import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_COMPANIES, DUMMY_JOBS } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Building, Globe, MapPin } from 'lucide-react';
import JobCard from '@/components/job-card';
import { notFound } from 'next/navigation';

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const company = DUMMY_COMPANIES.find((c) => c.id === params.id);

  if (!company) {
    notFound();
  }

  const companyJobs = DUMMY_JOBS.filter((job) => job.company.id === company.id);
  const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 overflow-hidden rounded-lg bg-card shadow-sm">
            <div className="h-48 bg-muted"></div>
            <div className="p-6 sm:p-8">
              <div className="relative -mt-20 flex items-end gap-6">
                {companyLogo && (
                  <Image
                    src={companyLogo.imageUrl}
                    alt={`${company.name} logo`}
                    width={128}
                    height={128}
                    className="rounded-lg border-4 border-card bg-card"
                  />
                )}
                <div>
                  <h1 className="font-headline text-3xl font-bold">{company.name}</h1>
                  <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span>{company.industry}</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{company.location}</span>
                    </div>
                     <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>{company.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-headline text-2xl font-bold mb-4">About {company.name}</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
                <p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
              </div>

               <h2 className="font-headline text-2xl font-bold mt-8 mb-4">Open Positions ({companyJobs.length})</h2>
               <div className="grid grid-cols-1 gap-6">
                    {companyJobs.map(job => (
                        <JobCard key={job.id} job={job}/>
                    ))}
               </div>
               {companyJobs.length === 0 && (
                <p className="text-muted-foreground">No open positions at the moment.</p>
               )}
            </div>
            <div className="space-y-6">
                {/* Could be a sidebar with more info */}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
