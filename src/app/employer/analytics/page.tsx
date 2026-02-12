'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import KpiCard from '@/app/employer/components/kpi-card';
import { Button } from '@/components/ui/button';
import { DUMMY_JOBS, DUMMY_APPLICANTS } from '@/lib/data';
import Link from 'next/link';
import { Briefcase as JobIcon, Users, UserCheck, Eye, Download, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// --- Hiring Funnel Chart Component ---
const funnelChartData = [
  { month: 'Jan', applications: 186, interviews: 80, offers: 25 },
  { month: 'Feb', applications: 305, interviews: 200, offers: 45 },
  { month: 'Mar', applications: 237, interviews: 120, offers: 30 },
  { month: 'Apr', applications: 273, interviews: 190, offers: 55 },
  { month: 'May', applications: 209, interviews: 130, offers: 35 },
  { month: 'Jun', applications: 214, interviews: 140, offers: 40 },
];
const funnelChartConfig = {
  applications: { label: 'Applications', color: 'hsl(var(--primary))' },
  interviews: { label: 'Interviews', color: 'hsl(var(--accent))' },
  offers: { label: 'Offers', color: 'hsl(var(--chart-3))' },
};
const HiringFunnelChart = () => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Hiring Funnel Analytics</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={funnelChartConfig} className="min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={funnelChartData} accessibilityLayer>
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Legend />
            <Bar dataKey="applications" fill="var(--color-applications)" radius={4} />
            <Bar dataKey="interviews" fill="var(--color-interviews)" radius={4} />
            <Bar dataKey="offers" fill="var(--color-offers)" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
);

// --- Applicant Source Chart Component ---
const sourceChartData = [
  { source: 'Direct', value: 150, fill: 'var(--color-direct)' },
  { source: 'LinkedIn', value: 120, fill: 'var(--color-linkedin)' },
  { source: 'Referrals', value: 95, fill: 'var(--color-referrals)' },
  { source: 'Job Board', value: 87, fill: 'var(--color-jobboard)' },
  { source: 'Other', value: 30, fill: 'var(--color-other)' },
];
const sourceChartConfig = {
  value: { label: 'Applicants' },
  direct: { label: 'Direct', color: 'hsl(var(--primary))' },
  linkedin: { label: 'LinkedIn', color: 'hsl(var(--accent))' },
  referrals: { label: 'Referrals', color: 'hsl(var(--chart-3))' },
  jobboard: { label: 'Job Board', color: 'hsl(var(--chart-4))' },
  other: { label: 'Other', color: 'hsl(var(--chart-5))' },
};
const ApplicantSourceChart = () => (
  <Card className="h-full flex flex-col">
    <CardHeader>
      <CardTitle>Applicant Sources</CardTitle>
      <CardDescription>Where your candidates are coming from.</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 pb-0">
      <ChartContainer config={sourceChartConfig} className="mx-auto aspect-square max-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<ChartTooltipContent nameKey="source" hideLabel />} />
            <Pie data={sourceChartData} dataKey="value" nameKey="source" cx="50%" cy="50%" outerRadius={100} innerRadius={60} strokeWidth={5}>
              {sourceChartData.map((entry) => (<Cell key={`cell-${entry.source}`} fill={entry.fill} />))}
            </Pie>
            <Legend content={({ payload }) => (
              <ul className="flex flex-wrap gap-x-4 gap-y-1 justify-center pt-4">
                {payload?.map((entry: any, index: number) => (
                  <li key={`item-${index}`} className="flex items-center gap-2 text-xs">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    {entry.payload.source}
                  </li>
                ))}
              </ul>
            )} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
);


// --- Job Performance Table Component ---
const performanceData = DUMMY_JOBS.slice(0, 5).map(job => {
  const applicants = DUMMY_APPLICANTS.filter(a => a.jobId === job.id);
  const hired = applicants.filter(a => a.status === 'Hired').length;
  const views = Math.floor(Math.random() * 2000) + 500;
  const conversionRate = applicants.length > 0 ? (hired / applicants.length) * 100 : 0;
  return { ...job, views, applicants: applicants.length, conversionRate };
});

const JobPerformanceTable = () => (
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
          {performanceData.map(job => (
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
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

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