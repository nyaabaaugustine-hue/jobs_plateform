
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Building,
  CheckCircle,
  MapPin,
  Search,
  Star,
  Users,
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import BlogPostCard from '@/components/blog-post-card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import JobCard from '@/components/job-card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { name: 'Jan', jobs: 4000 },
  { name: 'Feb', jobs: 3000 },
  { name: 'Mar', jobs: 5000 },
  { name: 'Apr', jobs: 4500 },
  { name: 'May', jobs: 6000 },
  { name: 'Jun', jobs: 7500 },
];

export default function HomePage() {
  const topRecruiters = DUMMY_COMPANIES.slice(0, 12);
  const blogPosts = DUMMY_BLOG_POSTS.slice(0, 3);
  const jobsOfTheDay = DUMMY_JOBS.slice(0, 6);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-banner-2');
  const locationImages = LOCATIONS.map(loc => ({...loc, image: PlaceHolderImages.find(p => p.id === loc.imageId)}));


  const trustIndicators = [
    { text: '12,430 jobs available' },
    { text: '4,500 companies hiring' },
    { text: '98% candidate satisfaction' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 lg:py-24 bg-secondary">
          <div className="absolute inset-0 bg-hero-glow -z-10"></div>
          <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:px-12 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl !leading-tight">
                Find Work That Moves Your Career Forward
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                The Easiest Way to Get Your New Job. Each month, more than 3 million job seekers turn to our website in their search for work.
              </p>
               <div className="rounded-2xl bg-card p-4 shadow-xl border border-border/50">
                <form className="flex items-center h-auto sm:h-[72px] flex-col sm:flex-row gap-4">
                  <div className="flex flex-1 items-center h-full w-full">
                    <Search className="h-5 w-5 text-muted-foreground mx-4" />
                    <Input id="job-title" type="search" placeholder="Job title, keyword..." className="border-none focus-visible:ring-0 h-full text-base" />
                    <Separator orientation="vertical" className="h-8 hidden sm:block" />
                     <MapPin className="h-5 w-5 text-muted-foreground mx-4 hidden sm:block" />
                    <Input id="location" type="search" placeholder="City or zip code" className="border-none focus-visible:ring-0 h-full text-base hidden sm:block" />
                  </div>
                  <Button type="submit" className="bg-accent-gradient rounded-xl h-[52px] px-6 font-semibold text-base hover:scale-105 transition-transform w-full sm:w-auto">
                    Find Jobs
                  </Button>
                </form>
              </div>
              <div className="flex items-center gap-6 pt-4 flex-wrap">
                {trustIndicators.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden items-center justify-center lg:flex">
              {heroImage && 
                <Image src={heroImage.imageUrl} alt={heroImage.description} width={500} height={500} className="rounded-2xl shadow-2xl object-cover" data-ai-hint={heroImage.imageHint} priority />
              }
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 lg:py-24 bg-card">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mb-12 text-center">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Browse by Category
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Find the job that fits your skills. Over 800 new jobs posted daily.
                </p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
                {JOB_CATEGORIES.map((category) => {
                    return (
                    <Link href="/jobs" key={category.name} className="group block">
                        <div
                        className={cn(
                            'h-full rounded-xl p-4 text-center transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg border',
                            category.bgColor,
                        )}
                        >
                        <div
                            className={cn(
                            'flex h-12 w-12 items-center justify-center rounded-lg mb-2 mx-auto',
                            category.iconBgColor
                            )}
                        >
                           <category.icon className={cn('h-6 w-6', category.color)} />
                        </div>
                        <h3 className={cn('font-semibold text-sm', category.color)}>{category.name}</h3>
                        </div>
                    </Link>
                    );
                })}
                </div>
            </div>
        </section>
        
        {/* Jobs of the day Section */}
        <section className="py-20 lg:py-24 bg-secondary">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Jobs of the Day</h2>
              <p className="mt-4 text-lg text-muted-foreground">Search and connect with the right candidates faster.</p>
              <div className="mt-8 flex justify-center gap-2">
                <Button variant="default" size="sm" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20">All</Button>
                <Button variant="outline" size="sm" className="rounded-full">Design</Button>
                <Button variant="outline" size="sm" className="rounded-full">Development</Button>
                <Button variant="outline" size="sm" className="rounded-full">Marketing</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobsOfTheDay.map((job) => (
                    <JobCard key={job.id} job={job}/>
                ))}
            </div>

             <div className="mt-12 text-center">
                <Button asChild size="lg" variant="outline">
                    <Link href="/jobs">
                    Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Hiring Banner */}
        <section className="py-20 lg:py-24 bg-hiring-gradient text-white">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12 text-center">
                <h2 className="text-4xl font-bold">WE’RE HIRING 🚀</h2>
                <p className="text-xl mt-2 italic">Let’s Work Together</p>
                <Button asChild size="lg" variant="secondary" className="mt-8 text-lg">
                    <Link href="/jobs">Apply</Link>
                </Button>
            </div>
        </section>

        {/* Millions of Jobs Section */}
        <section className="py-20 lg:py-24 bg-card">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold">Millions of Jobs. Find the one that’s right for you.</h2>
                    <p className="mt-4 text-muted-foreground text-lg">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide.</p>
                    <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-primary h-6 w-6"/>
                            <span className="font-medium">Bring to the table win-win survival</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <CheckCircle className="text-primary h-6 w-6"/>
                            <span className="font-medium">Capitalize on low hanging fruit to identify</span>
                        </div>
                         <div className="flex items-center gap-3">
                            <CheckCircle className="text-primary h-6 w-6"/>
                            <span className="font-medium">But I must explain to you how all this mistaken idea</span>
                        </div>
                    </div>
                     <Button asChild size="lg" className="mt-8">
                        <Link href="/jobs">
                        Search Jobs <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value/1000}k`}/>
                            <Tooltip />
                            <Line type="monotone" dataKey="jobs" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-center text-muted-foreground mt-2 text-sm">15% ↑ jobs this month</p>
                </div>
            </div>
        </section>

        {/* Top Recruiters Section */}
        <section className="bg-secondary py-20 lg:py-24">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Top Recruiters</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Discover your next career move, freelance gig, or internship
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {topRecruiters.slice(0,6).map((company) => {
                  const companyLogo = PlaceHolderImages.find((img) => img.id === company.logo);
                  return (
                    <Link href={`/companies/${company.id}`} key={company.id} className="group">
                        <Card className="text-center p-4 h-full flex flex-col items-center justify-center transition-all hover:shadow-lg hover:-translate-y-1">
                        {companyLogo &&
                          <Image
                            src={companyLogo.imageUrl}
                            alt={`${company.name} logo`}
                            width={64}
                            height={64}
                            className="mb-4 rounded-full transition-transform group-hover:scale-110"
                          />
                        }
                        
                          <h3 className="font-semibold group-hover:text-primary">{company.name}</h3>
                       
                       <div className="flex justify-center items-center my-2">
                          {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < company.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
                          ))}
                       </div>
                      <p className="text-sm text-muted-foreground">{company.activeJobs > 0 ? `${company.activeJobs} Open Roles ✨` : 'Hiring Soon'}</p>
                    </Card>
                    </Link>
                  )})}
              </div>
          </div>
        </section>
        
        {/* Jobs by Location */}
        <section className="py-20 lg:py-24 bg-card">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Jobs by Location</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Find your next career in your favorite city.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {locationImages.map(loc => (
                        <Link href="/jobs" key={loc.name} className="relative rounded-lg overflow-hidden group h-64">
                            {loc.image && 
                                <Image src={loc.image.imageUrl} alt={loc.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={loc.image.imageHint}/>
                            }
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                <h3 className="text-2xl font-bold">{loc.name}</h3>
                                <Badge variant="secondary" className="mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">{loc.jobs} Jobs</Badge>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 lg:py-24 bg-secondary">
            <div className="container mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What Our Customers Say</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Hear from satisfied job seekers and recruiters who found success with JobBox.
                    </p>
                </div>
                <Carousel
                    opts={{ align: "start", loop: true, }}
                    className="w-full"
                >
                    <CarouselContent>
                        {DUMMY_REVIEWS.map((review) => {
                          const userAvatar = PlaceHolderImages.find(img => img.id === review.user.avatar);
                          return (
                            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full flex flex-col bg-card">
                                    <CardContent className="flex-grow p-6">
                                        <div className="flex items-center mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground">"{review.comment}"</p>
                                    </CardContent>
                                    <CardContent className="p-6 bg-secondary/50 border-t">
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

        {/* News and Blog Section */}
        <section className="py-20 lg:py-24 bg-card">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">News and Blog</h2>
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
        <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-7xl px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
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
