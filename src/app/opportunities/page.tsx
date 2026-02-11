import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import SectionHeader from '@/components/shared/section-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DUMMY_OPPORTUNITIES, DUMMY_JOBS } from '@/lib/data';
import Link from 'next/link';
import JobCard from '@/components/job-card';
import PageHero from '@/components/shared/page-hero';
import { cn } from '@/lib/utils';

export default function OpportunitiesPage() {
  const opportunityJobs = DUMMY_JOBS.filter(
    (job) => job.type === 'Internship' || job.type === 'Volunteer'
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PageHero
        title="Kickstart Your Career"
        subtitle="Explore volunteer and attachment opportunities designed for students to gain hands-on experience and make a difference."
      />
      <main className="flex-1 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {DUMMY_OPPORTUNITIES.map((opportunity, index) => (
              <Link key={index} href={opportunity.link} className="block group">
                <Card className="text-center h-full hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
                  <CardHeader className="items-center">
                    <div className={cn("flex h-16 w-16 items-center justify-center rounded-full", opportunity.iconBg)}>
                      <opportunity.icon className={cn("h-8 w-8", opportunity.iconColor)} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2 text-xl">{opportunity.title}</CardTitle>
                    <p className="text-muted-foreground">{opportunity.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {opportunityJobs.length > 0 && (
            <div className="mt-16 md:mt-24">
              <SectionHeader
                title="Featured Opportunities"
                subtitle="Browse some of the latest internship and volunteer roles available."
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {opportunityJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
