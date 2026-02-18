'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, FileText, Briefcase, Wallet } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import React from 'react';

const insights = [
    { icon: FileText, title: 'Most Applied Job', value: 'Senior React Developer', meta: '342 Applications', color: 'primary' },
    { icon: Eye, title: 'Most Viewed Job', value: 'Full-stack Engineer', meta: '2.1k Views', color: 'purple' },
    { icon: Briefcase, title: 'Top Category', value: 'Software Development', meta: '450 Listings', color: 'green' },
    { icon: Wallet, title: 'Average Salary', value: 'GH₵115k/year', meta: 'Across all jobs', color: 'orange' },
]

const colorClasses = {
    primary: { bg: 'bg-primary/10', text: 'text-primary' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', text: 'text-green-500' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-500' },
}

const expiringJobs = [
    { title: 'Data Scientist', company: 'DataDriven', expires: 'in 2 days' },
    { title: 'Marketing Lead', company: 'Zenith Media', expires: 'in 3 days' },
    { title: 'Junior Dev', company: 'Innovate Inc.', expires: 'in 5 days' },
]

export default function JobInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Market Insights</CardTitle>
        <CardDescription>Key statistics from your job board.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map(insight => {
                const colors = colorClasses[insight.color as keyof typeof colorClasses] || colorClasses.primary;
                const Icon = insight.icon;
                return (
                    <div key={insight.title} className={cn("p-4 rounded-lg", colors.bg)}>
                        <div className={cn("flex items-center gap-3 mb-1", colors.text)}>
                            <Icon className="h-5 w-5" />
                            <p className="text-sm font-medium text-foreground/80">{insight.title}</p>
                        </div>
                        <p className="text-lg font-bold text-foreground">{insight.value}</p>
                        <p className="text-xs text-muted-foreground">{insight.meta}</p>
                    </div>
                )
            })}
        </div>
        <Separator />
         <div>
            <h4 className="font-semibold mb-3">Jobs Expiring Soon</h4>
            <div className="space-y-3">
                {expiringJobs.map(job => (
                    <div key={job.title} className="flex items-center justify-between text-sm">
                        <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-xs text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge variant="destructive" className="font-mono text-xs">{job.expires}</Badge>
                    </div>
                ))}
            </div>
         </div>
      </CardContent>
    </Card>
  );
}
