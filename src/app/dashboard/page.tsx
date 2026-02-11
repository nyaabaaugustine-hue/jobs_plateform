import { DUMMY_JOBS, DUMMY_APPLICATIONS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import JobRecommendations from '@/components/job-recommendations';
import KpiCard from './components/KpiCard';
import { Progress } from '@/components/ui/progress';
import { FileText, Bookmark, Eye, ArrowRight, UserCircle, Search } from 'lucide-react';
import ActivityFeed from './components/ActivityFeed';

export default function JobSeekerDashboard() {
  const recentApplications = DUMMY_APPLICATIONS.slice(0, 4);
  const savedJobs = DUMMY_JOBS.filter((job, index) => [3, 4, 6, 8, 10].includes(index));
  const interviewsScheduled = DUMMY_APPLICATIONS.filter((a) => a.status === 'Interview').length;
  const offersReceived = DUMMY_APPLICATIONS.filter((a) => a.status === 'Offer').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold">Welcome Back, John!</h1>
            <p className="text-muted-foreground">Here is your job search dashboard.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button asChild variant="outline"><Link href="/dashboard/profile"><UserCircle /> Update Profile</Link></Button>
            <Button asChild><Link href="/jobs"><Search /> Browse Jobs</Link></Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Profile Strength</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <Progress value={75} className="h-2 mt-2"/>
            </CardContent>
        </Card>
        <KpiCard
          title="Applications Sent"
          value={DUMMY_APPLICATIONS.length.toString()}
          trend={`+${interviewsScheduled} interviews`}
          icon={<FileText />}
        />
        <KpiCard
          title="Saved Jobs"
          value={savedJobs.length.toString()}
          trend={`${offersReceived} offers received`}
          icon={<Bookmark />}
        />
        <KpiCard
          title="Profile Views"
          value="42"
          trend="+15% this week"
          icon={<Eye />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
            <JobRecommendations />
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Recent Applications</CardTitle>
                        <CardDescription>Your latest job application statuses.</CardDescription>
                    </div>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/dashboard/applications">View All <ArrowRight className="ml-2 h-4 w-4"/></Link>
                    </Button>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {recentApplications.map((app) => (
                    <Card key={app.id} className="shadow-none border">
                      <CardHeader>
                        <CardTitle className="text-base">{app.job.title}</CardTitle>
                        <CardDescription>{app.job.company.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">Applied {new Date(app.appliedDate).toLocaleDateString()}</p>
                          <Badge>{app.status}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
            </Card>
        </div>

        {/* Sidebar Content */}
        <div className="lg:col-span-4 space-y-6">
            <ActivityFeed />
             <Card>
                <CardHeader>
                    <CardTitle>Saved Jobs</CardTitle>
                    <CardDescription>Jobs you are keeping an eye on.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                   {savedJobs.slice(0,4).map(job => (
                     <div key={job.id} className="flex items-center justify-between text-sm">
                        <div>
                            <Link href={`/jobs/${job.id}`} className="font-medium hover:text-primary">{job.title}</Link>
                            <p className="text-xs text-muted-foreground">{job.company.name}</p>
                        </div>
                        <Button variant="secondary" size="sm" asChild>
                            <Link href={`/jobs/${job.id}`}>View</Link>
                        </Button>
                    </div>
                   ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
