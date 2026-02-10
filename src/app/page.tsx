
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Search,
  Users,
  Star,
  UserPlus,
  FileText,
  Send,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_JOBS, DUMMY_REVIEWS } from '@/lib/data';
import JobCard from '@/components/job-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function HomePage() {
  const heroBanner1 = PlaceHolderImages.find((img) => img.id === 'hero-banner-1');
  const heroBanner2 = PlaceHolderImages.find((img) => img.id === 'hero-banner-2');
  const chartImage = PlaceHolderImages.find((img) => img.id === 'chart-image');

  const featuredJobs = DUMMY_JOBS.slice(0, 8);

  const jobCategories = [
    { name: 'Human Resource', imageId: 'category-human-resource', jobCount: 10 },
    { name: 'Content Writer', imageId: 'category-content-writer', jobCount: 29 },
    { name: 'Marketing & Sale', imageId: 'category-marketing-sale', jobCount: 9 },
    { name: 'Finance', imageId: 'category-finance', jobCount: 9 },
    { name: 'Management', imageId: 'category-management', jobCount: 6 },
    { name: 'Market Research', imageId: 'category-market-research', jobCount: 7 },
    { name: 'Customer Help', imageId: 'category-customer-help', jobCount: 4 },
    { name: 'Software', imageId: 'category-software', jobCount: 4 },
  ];

  const locations = [
    { name: 'Paris, France', companies: 3, jobs: 5 },
    { name: 'London, England', companies: 4, jobs: 3 },
    { name: 'New York, USA', companies: 3, jobs: 4 },
    { name: 'New York, Holland', companies: 3, jobs: 5 },
    { name: 'Copenhagen, Denmark', companies: 4, jobs: 9 },
    { name: 'Berlin, Germany', companies: 3, jobs: 3 },
  ];
  
  const chunk = (arr: any[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  
  const categorySlides = chunk([...jobCategories, ...jobCategories], 8);

  const reviews = DUMMY_REVIEWS;

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
                  The Easiest Way to Get Your New Job
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  Each month, more than 3 million job seekers turn to website in their search for work, making over
                  140,000 applications every single day.
                </p>
                <div className="rounded-lg bg-card p-4 shadow-md">
                  <form className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input type="search" placeholder="Job title, keyword..." className="w-full pl-10" />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input type="search" placeholder="City, state, or zip code" className="w-full pl-10" />
                    </div>
                    <Button type="submit" className="w-full">
                      Find Jobs
                    </Button>
                  </form>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Popular Searches:</span>
                  <Badge variant="outline">Design</Badge>
                  <Badge variant="outline">Development</Badge>
                  <Badge variant="outline">Manager</Badge>
                  <Badge variant="outline">Senior</Badge>
                </div>
              </div>
              <div className="relative hidden items-center justify-center md:flex">
                <div className="grid grid-cols-2 gap-4">
                  {heroBanner1 && (
                    <Image
                      src={heroBanner1.imageUrl}
                      alt={heroBanner1.description}
                      width={250}
                      height={250}
                      className="rounded-xl object-cover shadow-lg"
                      data-ai-hint={heroBanner1.imageHint}
                    />
                  )}
                  <div className="h-full w-full"></div>
                  <div className="h-full w-full"></div>
                  {heroBanner2 && (
                    <Image
                      src={heroBanner2.imageUrl}
                      alt={heroBanner2.description}
                      width={250}
                      height={250}
                      className="rounded-xl object-cover shadow-lg"
                      data-ai-hint={heroBanner2.imageHint}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Browse by category</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Find the job that’s perfect for you. about 800+ new jobs everyday
              </p>
            </div>
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent>
                {categorySlides.map((slide, index) => (
                  <CarouselItem key={index}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-1">
                      {slide.map((category, catIndex) => {
                         const categoryImage = PlaceHolderImages.find((img) => img.id === category.imageId);
                         return(
                          <Link href="/jobs" key={`${category.name}-${index}-${catIndex}`} className="block">
                            <Card className="group p-4 flex items-center gap-4 transition-all hover:shadow-lg hover:border-primary">
                                {categoryImage ? (
                                <Image
                                    src={categoryImage.imageUrl}
                                    alt={category.name}
                                    width={48}
                                    height={48}
                                    className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                                    data-ai-hint={categoryImage.imageHint}
                                />
                                ) : (
                                <div className="h-12 w-12 rounded-lg bg-muted flex-shrink-0" />
                                )}
                                <div>
                                <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {category.jobCount} Jobs Available
                                </p>
                                </div>
                            </Card>
                          </Link>
                         )
                        })}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex" />
              <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex" />
            </Carousel>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-secondary py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-10 text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">A simple process to find your next career opportunity.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center p-6">
                        <div className="mb-4 inline-block rounded-full bg-primary/10 p-4">
                            <UserPlus className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-headline text-xl font-bold mb-2">1. Create an Account</h3>
                        <p className="text-muted-foreground">Sign up for free and create your profile to showcase your skills and experience.</p>
                    </Card>
                    <Card className="text-center p-6">
                        <div className="mb-4 inline-block rounded-full bg-primary/10 p-4">
                            <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-headline text-xl font-bold mb-2">2. Complete Your Profile</h3>
                        <p className="text-muted-foreground">Add your resume, work history, and skills to attract top employers.</p>
                    </Card>
                    <Card className="text-center p-6">
                        <div className="mb-4 inline-block rounded-full bg-primary/10 p-4">
                            <Send className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-headline text-xl font-bold mb-2">3. Apply for Jobs</h3>
                        <p className="text-muted-foreground">Search and apply for jobs that match your career goals with a single click.</p>
                    </Card>
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/jobs">
                  Explore All Jobs <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* For Job Seekers/Employers Section */}
        <section className="bg-secondary py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="rounded-lg bg-card p-8">
                        <h3 className="font-headline text-2xl font-bold mb-4">For Job Seekers</h3>
                        <p className="text-muted-foreground mb-6">Find your dream job from thousands of openings. We have jobs from the best companies in the world.</p>
                        <ul className="space-y-3 text-muted-foreground mb-8">
                        <li className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Access to exclusive job openings.</li>
                        <li className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Create a professional resume with our builder.</li>
                        <li className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Get AI-powered job recommendations.</li>
                        </ul>
                        <Button asChild>
                        <Link href="/jobs">Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                    <div className="rounded-lg bg-card p-8">
                        <h3 className="font-headline text-2xl font-bold mb-4">For Employers</h3>
                        <p className="text-muted-foreground mb-6">Post your job and find the perfect candidate for your company. We have a large pool of talented developers.</p>
                        <ul className="space-y-3 text-muted-foreground mb-8">
                        <li className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Post a job in minutes.</li>
                        <li className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Access to a large pool of qualified candidates.</li>
                        <li className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> AI-powered candidate matching.</li>
                        </ul>
                        <Button asChild>
                        <Link href="/employer/jobs/new">Post a Job <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-10 text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Listen to the stories of our satisfied users who found their dream jobs through JobBox.
                    </p>
                </div>
                <Carousel
                    opts={{ align: "start", loop: true }}
                    className="w-full"
                >
                    <CarouselContent>
                        {reviews.map((review) => {
                            const authorAvatar = PlaceHolderImages.find((img) => img.id === review.user.avatar);
                            return (
                                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1 h-full">
                                        <Card className="flex flex-col h-full">
                                            <CardContent className="p-6 flex-grow">
                                                <div className="flex mb-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                                                    ))}
                                                </div>
                                                <p className="text-muted-foreground italic">"{review.comment}"</p>
                                            </CardContent>
                                            <CardFooter className="p-6 pt-0">
                                                <div className="flex items-center gap-4">
                                                    <Avatar>
                                                        {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={review.user.name} />}
                                                        <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold">{review.user.name}</p>
                                                        <p className="text-sm text-muted-foreground">{review.user.role}</p>
                                                    </div>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex" />
                    <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex" />
                </Carousel>
            </div>
        </section>

        {/* Locations Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {chartImage && (
                  <Image
                    src={chartImage.imageUrl}
                    alt={chartImage.description}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover"
                    data-ai-hint={chartImage.imageHint}
                  />
                )}
              </div>
              <div>
                <h2 className="font-headline text-3xl font-bold">Millions Of Jobs.</h2>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  {locations.map((loc) => (
                    <div
                      key={loc.name}
                      className="rounded-lg border bg-card p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold">{loc.name}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{loc.companies} companies</span>
                        <span>{loc.jobs} jobs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                New Things Will Always Update Regularly
              </h2>
              <div className="mt-8 flex max-w-md mx-auto">
                <Input type="email" placeholder="Enter Your Email" className="rounded-r-none focus:z-10" />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
