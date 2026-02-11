import { DUMMY_JOBS, DUMMY_APPLICANTS } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight } from 'lucide-react';
import EmployerAnalytics from '@/components/employer-analytics';

export default function EmployerDashboard() {
  const recentApplicants = DUMMY_APPLICANTS.slice(0, 5);
  const interviewsScheduled = DUMMY_APPLICANTS.filter(a => a.status === 'Interview').length;
  const hiredCount = DUMMY_APPLICANTS.filter(a => a.status === 'Hired').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Employer Dashboard</h1>
        <p className="text-muted-foreground">Here's what's happening with your job listings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{DUMMY_JOBS.length}</p>
            <Link href="/employer/jobs" className="text-sm text-primary hover:underline">
              View all jobs
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Applicants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{DUMMY_APPLICANTS.length}</p>
            <p className="text-sm text-muted-foreground">+5 in the last day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Interviews Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{interviewsScheduled}</p>
            <p className="text-sm text-muted-foreground">2 today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hired</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{hiredCount}</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <EmployerAnalytics />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Recent Applicants</CardTitle>
                <CardDescription>New candidates for your review.</CardDescription>
            </div>
            <Button asChild variant="outline">
                <Link href="/employer/applicants">View All <ArrowRight className="ml-2 h-4 w-4"/></Link>
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Applied For</TableHead>
                <TableHead>Skill Match</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApplicants.map((applicant) => {
                const job = DUMMY_JOBS.find(j => j.id === applicant.jobId);
                const avatar = PlaceHolderImages.find(p => p.id === applicant.avatar);
                return (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          {avatar && <AvatarImage src={avatar.imageUrl} />}
                          <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-sm text-muted-foreground">{applicant.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{job?.title}</TableCell>
                    <TableCell>
                      <Badge variant={applicant.skillMatch > 85 ? 'default' : 'secondary'}>
                        {applicant.skillMatch}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{applicant.status}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
