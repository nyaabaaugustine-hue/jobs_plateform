
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Search,
  Star,
  Briefcase,
  Book,
  PenTool,
  Target,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_JOBS, DUMMY_COMPANIES, DUMMY_REVIEWS, DUMMY_BLOG_POSTS, JOB_CATEGORIES, LOCATIONS } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow } from 'date-fns';
import BlogPostCard from '@/components/blog-post-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';


export default function HomePage() {
  const findJobImg1 = PlaceHolderImages.find((img) => img.id === 'find-job-1');
  const findJobImg2 = PlaceHolderImages.find((img) => img.id === 'find-job-2');
  const findJobImg3 = PlaceHolderImages.find((img) => img.id === 'find-job-3');

  const jobsOfTheDay = DUMMY_JOBS.slice(0, 8);
  const topRecruiters = DUMMY_COMPANIES.slice(0, 12);
  const blogPosts = DUMMY_BLOG_POSTS.slice(0, 3);
  const jobCategories = JOB_CATEGORIES;

  const jobFilters = ['All', 'Retail & Products', 'Content Writer', 'Marketing & Sale', 'Customer Help', 'Finance', 'Human Resource']

  const howItWorks = [
    {
      icon: <Book size={32} className="text-primary"/>,
      title: 'Register an account',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      icon: <PenTool size={32} className="text-primary"/>,
      title: 'Specify & search your job',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      icon: <Target size={32} className="text-primary"/>,
      title: 'Apply for job',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-indigo-50 to-slate-50 py-16 md:py-24">
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-6 md:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Find Work That Moves Your Career Forward
              </h1>
              <p className="max-w-xl text-lg text-slate-600">
                Clear, calm, no fluff.
              </p>
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="relative">
                      <Label htmlFor="job-title" className="sr-only">Job title</Label>
                      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input id="job-title" type="search" placeholder="Job title, keyword..." className="w-full pl-10" />
                    </div>
                    <div className="relative">
                      <Label htmlFor="location" className="sr-only">Location</Label>
                      <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input id="location" type="search" placeholder="City, state, or zip code" className="w-full pl-10" />
                    </div>
                  </div>
                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="relative">
                        <Label htmlFor="experience" className="sr-only">Experience</Label>
                        <Briefcase className="absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <Select>
                          <SelectTrigger className="w-full pl-10">
                            <SelectValue placeholder="Experience Level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry-level</SelectItem>
                            <SelectItem value="mid">Mid-level</SelectItem>
                            <SelectItem value="senior">Senior-level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-center space-x-2 rounded-lg border bg-white px-3">
                        <Label htmlFor="remote-only">Remote Only</Label>
                        <Switch id="remote-only" />
                      </div>
                    </div>
                  <Button type="submit" className="w-full" size="lg">
                    Find Jobs
                  </Button>
                </form>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-slate-500">Popular Searches:</span>
                <Badge variant="outline">Design</Badge>
                <Badge variant="outline">Development</Badge>
                <Badge variant="outline">Manager</Badge>
                <Badge variant="outline">Senior</Badge>
              </div>
            </div>

            <div className="relative hidden items-center justify-center md:flex">
              <div className="grid grid-cols-2 gap-4">
                {findJobImg1 && (
                  <Image
                    src={findJobImg1.imageUrl}
                    alt={findJobImg1.description}
                    width={300}
                    height={400}
                    className="col-span-1 row-span-2 h-full rounded-xl object-cover"
                    data-ai-hint={findJobImg1.imageHint}
                    priority
                  />
                )}
                {findJobImg2 && (
                  <Image
                    src={findJobImg2.imageUrl}
                    alt={findJobImg2.description}
                    width={300}
                    height={190}
                    className="h-full w-full rounded-xl object-cover"
                    data-ai-hint={findJobImg2.imageHint}
                  />
                )}
                {findJobImg3 && (
                  <Image
                    src={findJobImg3.imageUrl}
                    alt={findJobImg3.description}
                    width={300}
                    height={190}
                    className="h-full w-full rounded-xl object-cover"
                    data-ai-hint={findJobImg3.imageHint}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-background py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Browse by Category</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Find the job that’s perfect for you. about 800+ new jobs everyday
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {jobCategories.map((category) => (
                  <Link href="/jobs" key={category.name} className="block">
                    <Card className="group p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1 rounded-xl">
                      <div className="mb-4 flex justify-center">
                        <div className="rounded-lg bg-primary/10 p-3">
                          <Image 
                            src={category.icon} 
                            alt={category.name} 
                            width={32} 
                            height={32} 
                            className="h-8 w-8" 
                            unoptimized
                          />
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.jobCount} Jobs Available</p>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Hiring Banner Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center gap-4 rounded-lg bg-primary/10 p-6 md:p-8 md:grid-cols-3 md:gap-8">
              <div className="md:col-span-2">
                <h2 className="font-headline text-3xl font-bold text-foreground">We are HIRING</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                  Let’s Work Together & Explore Opportunities
                </p>
              </div>
              <div className="text-left md:text-right">
                <Button size="lg" asChild>
                  <Link href="/employer/jobs/new">
                    Post a Job <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Jobs of the day Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Jobs of the day</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Search and connect with the right candidates faster.
              </p>
            </div>
             <Tabs defaultValue="All" className="w-full">
              <TabsList className="mb-8 justify-center flex-wrap h-auto">
                {jobFilters.map(filter => <TabsTrigger value={filter} key={filter}>{filter}</TabsTrigger>)}
              </TabsList>
              <TabsContent value="All">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {jobsOfTheDay.map((job) => {
                      const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);
                      return (
                        <Card key={job.id} className="group flex h-full flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-4 mb-4">
                              {companyLogo && (
                                <Image
                                  src={companyLogo.imageUrl}
                                  alt={`${job.company.name} logo`}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                              )}
                              <div>
                                <p className="text-sm text-muted-foreground">{job.company.name}</p>
                                <p className="text-xs text-muted-foreground">{job.location}</p>
                              </div>
                            </div>
                            <Link href={`/jobs/${job.id}`}>
                              <h3 className="font-bold text-lg group-hover:text-primary transition-colors mb-2 line-clamp-1">{job.title}</h3>
                            </Link>
                            <div className="flex items-center text-xs text-muted-foreground gap-4 mb-4">
                              <span>{job.type}</span>
                              <span>{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{job.description}</p>
                            <p className="font-semibold text-primary">{job.salaryRange}</p>
                          </CardContent>
                        </Card>
                      )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

         {/* How it works */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">How It Works?</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Just 3 easy steps to new opportunities
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <Card key={index} className="p-6 md:p-8 text-center">
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="font-headline text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Find the one that's right for you */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className='relative'>
                 {findJobImg1 && (
                  <Image
                    src={findJobImg1.imageUrl}
                    alt={findJobImg1.description}
                    width={500}
                    height={500}
                    className="rounded-lg object-cover"
                    data-ai-hint={findJobImg1.imageHint}
                  />
                )}
                 {findJobImg2 && (
                  <Image
                    src={findJobImg2.imageUrl}
                    alt={findJobImg2.description}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover absolute -bottom-10 -right-10 shadow-lg border-4 border-background"
                    data-ai-hint={findJobImg2.imageHint}
                  />
                )}
                 {findJobImg3 && (
                  <Image
                    src={findJobImg3.imageUrl}
                    alt={findJobImg3.description}
                    width={150}
                    height={150}
                    className="rounded-lg object-cover absolute top-10 -left-10 shadow-lg border-4 border-background"
                    data-ai-hint={findJobImg3.imageHint}
                  />
                )}
              </div>
              <div className='space-y-4'>
                <Badge variant="outline">Millions Of Jobs</Badge>
                <h2 className="font-headline text-4xl font-bold">Find The One That’s Right For You</h2>
                <p className="text-muted-foreground mt-2">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide.</p>
                <div className='flex gap-4 pt-4'>
                  <Button size="lg">Get Started</Button>
                  <Button size="lg" variant="outline">Learn More</Button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Top Recruiters Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Top Recruiters</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Discover your next career move, freelance gig, or internship
              </p>
            </div>
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {topRecruiters.map((company) => {
                  const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);
                  return (
                    <CarouselItem key={company.id} className="pl-4 md:basis-1/3 lg:basis-1/6">
                      <Card className="text-center p-4 h-full flex flex-col items-center justify-center transition-all hover:shadow-lg hover:-translate-y-1">
                        {companyLogo &&
                          <Image
                            src={companyLogo.imageUrl}
                            alt={`${company.name} logo`}
                            width={64}
                            height={64}
                            className="mb-4 rounded-full"
                          />
                        }
                        <Link href={`/companies/${company.id}`}>
                          <h3 className="font-semibold hover:text-primary">{company.name}</h3>
                        </Link>
                       <div className="flex justify-center items-center my-2">
                          {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < company.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                          ))}
                       </div>
                      <p className="text-sm text-muted-foreground">{company.location}</p>
                      <Button variant="outline" size="sm" asChild className="mt-2">
                          <Link href={`/companies/${company.id}`}>{company.activeJobs} Jobs</Link>
                      </Button>
                    </Card>
                  </CarouselItem>
                )})}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
        
       {/* Testimonials */}
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-10 text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">What Our Customers Say</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Hear from satisfied job seekers and recruiters who found success with JobBox.
                    </p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {DUMMY_REVIEWS.map((review) => {
                          const userAvatar = PlaceHolderImages.find(img => img.id === review.user.avatar);
                          return (
                            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full flex flex-col">
                                    <CardContent className="flex-grow p-6">
                                        <div className="flex items-center mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground">"{review.comment}"</p>
                                    </CardContent>
                                    <CardContent className="p-6 bg-secondary/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                                                {userAvatar && <Image src={userAvatar.imageUrl} alt={review.user.name} width={48} height={48} className="object-cover"/>}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{review.user.name}</p>
                                                <p className="text-sm text-muted-foreground">{review.user.role}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                          );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex"/>
                    <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden h-10 w-10 rounded-full bg-card shadow-md md:flex"/>
                </Carousel>
            </div>
        </section>

        {/* Jobs by Location Section */}
        <section className="bg-secondary py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Jobs by Location</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Find your favourite jobs and get the benefits of yourself</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {LOCATIONS.map((loc) => {
                const locationImage = PlaceHolderImages.find((img) => img.id === loc.imageId);
                return (
                  <Link href="/jobs" key={loc.name} className="block group relative rounded-lg overflow-hidden">
                     {locationImage && (
                        <Image
                            src={locationImage.imageUrl}
                            alt={loc.name}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                     )}
                     <div className="absolute inset-0 bg-black/50"></div>
                     <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="font-headline text-xl font-bold">{loc.name}</h3>
                        <p className="text-sm">{loc.jobs} jobs</p>
                      </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* News and Blog Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">News and Blog</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Get the latest news, updates and tips
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                ))}
            </div>
             <div className="mt-12 text-center">
                <Button asChild size="lg">
                    <Link href="/blog">
                    View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                New Things Will Always Update Regularly
              </h2>
              <div className="mt-8 flex max-w-md mx-auto">
                <Input type="email" placeholder="Enter Your Email" className="rounded-r-none focus:z-10 text-foreground" />
                <Button type="submit" variant="secondary" className="rounded-l-none">
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
