'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DUMMY_JOBS } from '@/lib/data';
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';
import { useState, useEffect } from 'react';

type ExpiringJob = typeof DUMMY_JOBS[0] & { expiresIn: string };

export default function ExpiringJobs() {
  const [expiringJobs, setExpiringJobs] = useState<ExpiringJob[]>([]);

  useEffect(() => {
    // This logic must run on the client to avoid hydration mismatch
    const jobs = DUMMY_JOBS.slice(0, 3).map(job => ({
        ...job,
        expiresIn: formatDistanceToNowStrict(new Date(new Date(job.postedDate).setDate(new Date(job.postedDate).getDate() + 30)))
    }));
    setExpiringJobs(jobs);
  }, []);

  if (expiringJobs.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Jobs Expiring Soon</CardTitle>
                <CardDescription>Renew or archive these listings.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">No jobs are expiring soon.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs Expiring Soon</CardTitle>
        <CardDescription>Renew or archive these listings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {expiringJobs.map(job => (
            <div key={job.id} className="flex items-center justify-between text-sm">
                <div>
                    <Link href={`/jobs/${job.id}`} className="font-medium hover:text-primary">{job.title}</Link>
                    <p className="text-xs text-muted-foreground">{job.company.name}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="font-mono text-xs">in {job.expiresIn}</Badge>
                    <Button variant="outline" size="sm">Renew</Button>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
