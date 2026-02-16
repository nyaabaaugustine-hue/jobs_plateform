
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import KpiCard from '@/app/employer/components/kpi-card';
import { Button } from '@/components/ui/button';
import { DUMMY_JOBS, DUMMY_APPLICANTS } from '@/lib/data';
import Link from 'next/link';
import { Briefcase as JobIcon, Users, UserCheck, Eye, Download, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const ApplicantSourceChart = dynamic(() => import('../components/applicant-source-chart'), { 
  ssr: false, 
  loading: () => <Skeleton className="h-[400px] w-full" /> 
});
const HiringFunnelChart = dynamic(() => import('@/app/employer/components/hiring-funnel-chart'), { 
  ssr: false, 
  loading: () => <Skeleton className="h-[400px] w-full" /> 
});


// --- Job Performance Table Component ---
const JobPerformanceTable = () => {
    const [performanceData, setPerformanceData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = DUMMY_JOBS.slice(0, 5).map(job => {
            const applicants = DUMMY_APPLICANTS.filter(a => a.jobId === job.id);
            const hired = applicants.filter(a => a.status === 'Hired').length;
            const views = Math.floor(Math.random() * 2000) + 500;
            const conversionRate = applicants.length > 0 ? (hired / applicants.length) * 100 : 0;
            return { ...job, views, applicants: applicants.length, conversionRate };
        });
        setPerformanceData(data);
        setIsLoading(false);
    }, []);

    return (
        <Card>
            <CardHeader>
            <CardTitle>Job Post Performance</CardTitle>
            <CardDescription>Detailed metrics for each of your active job listings.</CardDescription>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead className="text-center">Views</TableHead>
                    <TableHead className="text-center">Applicants</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                            <TableCell className="text-center"><Skeleton className="h-5 w-12 mx-auto" /></TableCell>
                            <TableCell className="text-center"><Skeleton className="h-5 w-12 mx-auto" /></TableCell>
                            <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-6 w-16 ml-auto" /></TableCell>
                        </TableRow>
                    ))
                ) : (
                    performanceData.map(job => (
                        <TableRow key={job.id}>
                        <TableCell>
                            <Link href={`/jobs/${job.id}`} className="font-medium hover:text-primary flex items-center gap-2">
                            {job.title} <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                        </TableCell>
                        <TableCell className="text-center font-mono">{job.views}</TableCell>
                        <TableCell className="text-center font-mono">{job.applicants}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                            <Progress value={job.conversionRate} className="h-2 w-20" />
                            <span className="text-xs text-muted-foreground font-mono">{job.conversionRate.toFixed(1)}%</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Active</Badge>
                        </TableCell>
                        </TableRow>
                    ))
                )}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
    );
};

// --- Main Page Component ---
export default function EmployerAnalyticsPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exporting Report...",
      description: "Your analytics report is being generated.",
      variant: 'vibrant',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">Hiring Analytics</h1>
          <p className="text-muted-foreground">Analyze your hiring funnel and job performance.</p>
        </div>
        <Button onClick={handleExport}><Download className="mr-2" /> Export Report</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total Applicants" value="482" trend="+25 this week" icon={<Users />} />
        <KpiCard title="Active Jobs" value="5" trend="1 new listing" icon={<JobIcon />} />
        <KpiCard title="Avg. Time to Hire" value="21 days" trend="-3 days vs last month" trendDirection="down" icon={<UserCheck />} />
        <KpiCard title="Total Job Views" value="12,890" trend="+18% from last month" icon={<Eye />} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <HiringFunnelChart />
        </div>
        <div className="lg:col-span-2">
          <ApplicantSourceChart />
        </div>
      </div>

      <div>
        <JobPerformanceTable />
      </div>
    </div>
  );
}
