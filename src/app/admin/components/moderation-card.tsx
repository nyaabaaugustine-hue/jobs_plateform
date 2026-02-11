'use client';

import { useState } from 'react';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Lightbulb, Loader, Shield, XCircle } from 'lucide-react';
import { runJobModeration } from '@/lib/actions';
import type { ModerateJobPostOutput } from '@/ai/flows/admin-job-moderation';

type ModerationCardProps = {
  job: Job;
  aiFlagged?: boolean;
};

export default function ModerationCard({ job, aiFlagged = false }: ModerationCardProps) {
  const [moderationResult, setModerationResult] = useState<ModerateJobPostOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModerate = async () => {
    setIsLoading(true);
    const result = await runJobModeration({ jobPost: `${job.title}\n\n${job.description}` });
    setModerationResult(result);
    setIsLoading(false);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.company.name} - {job.location}</CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary">{job.type}</Badge>
            <Badge variant="secondary">{job.experienceLevel}</Badge>
            <Badge variant="secondary">{job.salaryRange}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-4">{job.description}</p>
        
        {aiFlagged && !moderationResult && (
             <Alert variant="destructive">
                <Shield className="h-4 w-4" />
                <AlertTitle>AI Flagged</AlertTitle>
                <AlertDescription>
                    This post was automatically flagged as potential spam. Please review carefully.
                </AlertDescription>
            </Alert>
        )}
        
        {moderationResult && (
          <Alert variant={moderationResult.isSpam ? 'destructive' : 'vibrant'}>
             {moderationResult.isSpam ? <Shield className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertTitle>{moderationResult.isSpam ? 'AI Warning: Potential Spam' : 'AI Analysis: Looks Safe'}</AlertTitle>
            <AlertDescription>
              {moderationResult.reason || 'No specific issues found.'}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2">
        <Button onClick={handleModerate} disabled={isLoading}>
          {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
          Moderate with AI
        </Button>
        <div className="flex gap-2">
            <Button variant="outline" className="w-full">
                <XCircle className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button className="w-full">
                <CheckCircle className="mr-2 h-4 w-4" /> Approve
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
