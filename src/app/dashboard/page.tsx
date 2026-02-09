import { DUMMY_JOBS, DUMMY_APPLICATIONS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import JobCard from '@/components/job-card';
import { Badge } from '@/components/ui/badge';
import JobRecommendations from '@/components/job-recommendations';

export default function JobSeekerDashboard() {
  const recentApplications = DUMMY_APPLICATIONS.slice(0, 2);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Welcome Back, John!</h1>
        <p className="text-muted-foreground">Here's your job search snapshot.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Intermediate</p>
                <p className="font-medium">75%</p>
              </div>
              <Progress value={75} />
              <p className="text-sm text-muted-foreground">Complete your profile for better matches.</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Application Stats</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-around">
            <div className="text-center">
              <p className="text-3xl font-bold">{DUMMY_APPLICATIONS.length}</p>
              <p className="text-sm text-muted-foreground">Applied</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">
                {DUMMY_APPLICATIONS.filter((a) => a.status === 'Interview').length}
              </p>
              <p className="text-sm text-muted-foreground">Interviews</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">
                {DUMMY_APPLICATIONS.filter((a) => a.status === 'Offer').length}
              </p>
              <p className="text-sm text-muted-foreground">Offers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saved Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">You have 12 saved jobs.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <JobRecommendations />
      
      <div>
        <h2 className="font-headline text-2xl font-bold">Recent Applications</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {recentApplications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <CardTitle>{app.job.title}</CardTitle>
                <CardDescription>{app.job.company.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Applied on {app.appliedDate}</p>
                  <Badge>{app.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-headline text-2xl font-bold">Saved Jobs</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
            <JobCard job={DUMMY_JOBS[3]} />
            <JobCard job={DUMMY_JOBS[4]} />
        </div>
      </div>
    </div>
  );
}
