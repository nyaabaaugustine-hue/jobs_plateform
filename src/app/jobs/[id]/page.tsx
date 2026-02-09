import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { DUMMY_JOBS } from '@/lib/data';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Clock, DollarSign, MapPin, Zap } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = DUMMY_JOBS.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

  const companyLogo = PlaceHolderImages.find((img) => img.id === job.company.logo);

  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <Header />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {companyLogo && (
                        <Image
                            src={companyLogo.imageUrl}
                            alt={`${job.company.name} logo`}
                            width={80}
                            height={80}
                            className="rounded-lg border bg-background"
                        />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                          <h1 className="font-headline text-3xl font-bold">{job.title}</h1>
                          {job.isUrgent && (
                            <Badge variant="destructive" className="flex shrink-0 items-center gap-1">
                                <Zap size={14} /> Urgent
                            </Badge>
                          )}
                      </div>
                      <Link href={`/companies/${job.company.id}`} className="text-lg font-semibold text-muted-foreground hover:text-primary">
                        {job.company.name}
                      </Link>
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                    <Separator className="my-6" />
                    <h2 className="font-headline text-xl font-bold mb-4">Job Description</h2>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
                        <p>{job.description}</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <h3 className="font-semibold text-foreground">Responsibilities:</h3>
                        <ul className="list-disc list-inside">
                            <li>Develop and maintain web applications using React and Next.js.</li>
                            <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
                            <li>Ensure the performance, quality, and responsiveness of applications.</li>
                            <li>Identify and correct bottlenecks and fix bugs.</li>
                        </ul>
                         <h3 className="font-semibold text-foreground">Qualifications:</h3>
                         <ul className="list-disc list-inside">
                            <li>Proven experience as a React Developer.</li>
                            <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.</li>
                            <li>Thorough understanding of React.js and its core principles.</li>
                             <li>Experience with popular React.js workflows (such as Flux or Redux).</li>
                        </ul>
                    </div>
                     <Separator className="my-6" />
                     <h2 className="font-headline text-xl font-bold mb-4">Required Skills</h2>
                     <div className="flex flex-wrap gap-2">
                        {job.skills.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                     </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Job Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground flex items-center gap-2"><Briefcase /> Job Type</span>
                            <span className="font-semibold">{job.type}</span>
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="text-muted-foreground flex items-center gap-2"><Briefcase /> Experience</span>
                            <span className="font-semibold">{job.experienceLevel}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground flex items-center gap-2"><DollarSign /> Salary</span>
                            <span className="font-semibold text-primary">{job.salaryRange}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Apply Now</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full" size="lg">Apply on Company Site</Button>
                        <p className="text-xs text-center text-muted-foreground mt-2">You will be redirected to the company's website.</p>
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
