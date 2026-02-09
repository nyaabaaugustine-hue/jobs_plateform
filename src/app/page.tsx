import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Building,
  ChevronRight,
  MapPin,
  Search,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_REVIEWS } from '@/lib/data';

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');
  const featuredJobs = DUMMY_JOBS.slice(0, 6);
  const featuredCompanies = DUMMY_COMPANIES.slice(0, 6);
  const successStories = DUMMY_REVIEWS.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full bg-secondary py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Find Your Next React Role, Faster.
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  ReactHire is the #1 job board for React developers. Discover thousands of opportunities from top
                  companies and build the career you've always dreamed of.
                </p>
                <div className="rounded-lg bg-card p-4 shadow-md">
                  <form className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] md:grid-cols-[2fr_1.5fr_auto]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Job title, keyword, or company"
                        className="w-full pl-10"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input type="search" placeholder="City, state, or zip code" className="w-full pl-10" />
                    </div>
                    <Button type="submit" className="w-full">
                      Find Jobs
                    </Button>
                  </form>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Trending Searches:</span>
                  <Badge variant="outline">React Native</Badge>
                  <Badge variant="outline">Senior Engineer</Badge>
                  <Badge variant="outline">Remote</Badge>
                  <Badge variant="outline">Fintech</Badge>
                </div>
              </div>
              <div className="relative hidden h-full min-h-[300px] w-full items-center justify-center md:flex">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={500}
                    height={500}
                    className="rounded-xl object-cover shadow-2xl"
                    data-ai-hint={heroImage.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Featured Jobs</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Hand-picked opportunities from the best companies in the industry.
              </p>
            </div>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredJobs.map((job, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="flex h-full flex-col">
                      <CardHeader>
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <Image
                              src={
                                PlaceHolderImages.find((img) => img.id === job.company.logo)?.imageUrl ||
                                `https://picsum.photos/seed/${job.company.name}/40/40`
                              }
                              alt={`${job.company.name} logo`}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                            <div>
                              <CardTitle className="text-lg">{job.title}</CardTitle>
                              <CardDescription>{job.company.name}</CardDescription>
                            </div>
                          </div>
                          {job.isUrgent && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <Zap size={14} /> Urgent
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm">
                          <Badge variant="secondary">{job.type}</Badge>
                          <Badge variant="secondary">{job.location}</Badge>
                          <Badge variant="secondary">{job.experienceLevel}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground line-clamp-2">{job.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <p className="font-semibold text-primary">{job.salaryRange}</p>
                        <Button asChild variant="ghost" size="sm">
                          <Link href="/jobs">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/jobs">
                  Explore All Jobs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Live Stats Counter */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              <div className="space-y-1">
                <p className="font-headline text-4xl font-bold text-primary">1,204</p>
                <p className="text-muted-foreground">Jobs Posted Today</p>
              </div>
              <div className="space-y-1">
                <p className="font-headline text-4xl font-bold text-primary">789</p>
                <p className="text-muted-foreground">Hires This Week</p>
              </div>
              <div className="space-y-1">
                <p className="font-headline text-4xl font-bold text-primary">500+</p>
                <p className="text-muted-foreground">Top Companies</p>
              </div>
              <div className="space-y-1">
                <p className="font-headline text-4xl font-bold text-primary">25k+</p>
                <p className="text-muted-foreground">Active Developers</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Companies */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="font-headline mb-10 text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Who's Hiring?
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {featuredCompanies.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center justify-center rounded-lg border bg-card p-6 transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <Image
                    src={PlaceHolderImages.find((img) => img.id === company.logo)?.imageUrl || ''}
                    alt={`${company.name} Logo`}
                    width={120}
                    height={40}
                    className="object-contain"
                    data-ai-hint="company logo"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Success Stories</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                See how ReactHire helped developers land their dream jobs.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {successStories.map((story) => (
                <Card key={story.id}>
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < story.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{story.comment}"</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          PlaceHolderImages.find((img) => img.id === story.user.avatar)?.imageUrl ||
                          `https://picsum.photos/seed/${story.user.name}/40/40`
                        }
                        alt={story.user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{story.user.name}</p>
                        <p className="text-sm text-muted-foreground">{story.user.role}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="overflow-hidden rounded-xl bg-primary text-primary-foreground">
              <div className="grid md:grid-cols-2">
                <div className="space-y-6 p-8 md:p-12 lg:p-16">
                  <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                    Ready to Find Your Dream Team?
                  </h2>
                  <p className="text-lg text-primary-foreground/80">
                    Post a job on ReactHire and connect with thousands of skilled React developers actively looking for
                    their next challenge.
                  </p>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/employer/jobs/new">
                      Post a Job <Building className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="space-y-6 bg-primary/80 p-8 md:p-12 lg:p-16">
                  <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                    Take the Next Step in Your Career
                  </h2>
                  <p className="text-lg text-primary-foreground/80">
                    Create your developer profile to get personalized job recommendations and let top companies find you.
                  </p>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/dashboard/profile">
                      Create Profile <Users className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
