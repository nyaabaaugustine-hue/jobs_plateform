import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_COMPANIES, DUMMY_JOBS } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Building, Globe, MapPin } from 'lucide-react';
import JobCard from '@/components/job-card';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CompanyDetailPage({ params: { id } }: { params: { id: string } }) {
  const company = DUMMY_COMPANIES.find((c) => c.id === id);

  if (!company) {
    notFound();
  }

  const companyJobs = DUMMY_JOBS.filter((job) => job.company.id === company.id);
  const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);
  const companyBanner = PlaceHolderImages.find((img) => img.id === 'hiring-main');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background bg-hero-glow py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="mb-8 overflow-hidden shadow-lg">
            <div className="relative h-48 bg-muted">
              {companyBanner && (
                  <Image
                      src={companyBanner.imageUrl}
                      alt="Company banner"
                      fill
                      className="object-cover"
                      data-ai-hint={companyBanner.imageHint}
                  />
              )}
               <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="p-6 sm:p-8">
              <div className="relative -mt-24 flex items-end gap-6">
                {companyLogo && (
                  <div className="bg-card p-2 rounded-lg border-4 border-card shadow-md">
                    <Image
                      src={companyLogo.imageUrl}
                      alt={`${company.name} logo`}
                      width={112}
                      height={112}
                      className="rounded-md"
                    />
                  </div>
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
          </Card>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <h2 className="font-headline text-2xl font-bold">About {company.name}</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
                            <p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.</p>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <h2 className="font-headline text-2xl font-bold">Open Positions ({companyJobs.length})</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6">
                            {companyJobs.map(job => (
                                <JobCard key={job.id} job={job}/>
                            ))}
                        </div>
                        {companyJobs.length === 0 && (
                            <p className="text-muted-foreground text-center py-8">No open positions at the moment.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6 lg:sticky lg:top-24 self-start">
                <Card>
                    <CardHeader>
                        <h3 className="font-semibold">Company Info</h3>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Industry</span>
                            <span className="font-medium">{company.industry}</span>
                         </div>
                         <Separator />
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Location</span>
                            <span className="font-medium">{company.location}</span>
                         </div>
                         <Separator />
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Active Jobs</span>
                            <span className="font-medium">{company.activeJobs}</span>
                         </div>
                         <Separator />
                         <div className="flex justify-between">
                            <span className="text-muted-foreground">Rating</span>
                            <span className="font-medium">{company.rating} / 5.0</span>
                         </div>
                    </CardContent>
                </Card>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
