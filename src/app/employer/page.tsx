'use client';

import { DUMMY_JOBS, DUMMY_APPLICANTS } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight, Briefcase, FileText, UserCheck, Users, PlusCircle } from 'lucide-react';
import KpiCard from './components/kpi-card';
import ActivityFeed from './components/activity-feed';
import ExpiringJobs from './components/expiring-jobs';
import HiringFunnelChart from '@/app/employer/components/hiring-funnel-chart';

export default function EmployerDashboard() {
  // Assuming this employer is Innovate Inc. for demo purposes
  const employerJobs = DUMMY_JOBS.filter(job => job.company.id === '1');
  const employerJobIds = employerJobs.map(j => j.id);
  const employerApplicants = DUMMY_APPLICANTS.filter(a => employerJobIds.includes(a.jobId));
  
  const recentApplicants = employerApplicants.slice(0, 5);
  const interviewsScheduled = employerApplicants.filter(a => a.status === 'Interview').length;
  const hiredCount = employerApplicants.filter(a => a.status === 'Hired').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
            <h1 className="font-headline text-3xl font-bold">Employer Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Innovate Inc. Here's your hiring overview.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button asChild variant="outline"><Link href="/employer/applicants"><Users /> View Applicants</Link></Button>
            <Button asChild><Link href="/employer/jobs/new"><PlusCircle /> Post a New Job</Link></Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Active Jobs"
          value={employerJobs.length.toString()}
          trend="+2 this month"
          icon={<Briefcase />}
        />
        <KpiCard
          title="Total Applicants"
          value={employerApplicants.length.toString()}
          trend="+12 this week"
          icon={<Users />}
        />
        <KpiCard
          title="Interviews"
          value={interviewsScheduled.toString()}
          trend="2 new today"
          icon={<UserCheck />}
        />
        <KpiCard
          title="Hired"
          value={hiredCount.toString()}
          trend="+1 this month"
          icon={<FileText />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
            <HiringFunnelChart />
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

        {/* Sidebar Content */}
        <div className="lg:col-span-4 space-y-6">
            <ActivityFeed />
            <ExpiringJobs />
        </div>
      </div>
    </div>
  );
}
