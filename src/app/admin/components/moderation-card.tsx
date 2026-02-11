'use client';

import { useState } from 'react';
import type { Job } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, Lightbulb, Loader, Shield, XCircle, Briefcase, MapPin, Wallet, ScrollText } from 'lucide-react';
import { runJobModeration } from '@/lib/actions';
import type { ModerateJobPostOutput } from '@/ai/flows/admin-job-moderation';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

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

  const getStatusAlert = () => {
      if (aiFlagged && !moderationResult) {
          return (
              <Alert variant="destructive">
                  <Shield className="h-4 w-4" />
                  <AlertTitle>AI Flagged</AlertTitle>
                  <AlertDescription>
                      This post may be spam. Please review carefully.
                  </AlertDescription>
              </Alert>
          );
      }
      
      if (moderationResult) {
          return (
              <Alert variant={moderationResult.isSpam ? 'destructive' : 'vibrant'}>
                  {moderationResult.isSpam ? <Shield className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  <AlertTitle>{moderationResult.isSpam ? 'AI Warning' : 'AI Analysis Complete'}</AlertTitle>
                  <AlertDescription>
                  {moderationResult.reason || 'No specific issues found by the AI.'}
                  </AlertDescription>
              </Alert>
          );
      }

      return (
          <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Awaiting Review</AlertTitle>
              <AlertDescription>
                  Run AI moderation or manually approve/reject this post.
              </AlertDescription>
          </Alert>
      );
  }

  return (
    <Card className="flex flex-col h-full min-h-[676px]">
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.company.name} - {job.location}</CardDescription>
         <div className="flex flex-wrap gap-2 pt-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="flex items-center gap-2 bg-chart-1/10 text-chart-1 border-chart-1/20"><Briefcase /><span>{job.type}</span></Badge>
            <Badge variant="outline" className="flex items-center gap-2 bg-chart-3/10 text-chart-3 border-chart-3/20"><Wallet /><span>{job.salaryRange}</span></Badge>
            <Badge variant="outline" className="flex items-center gap-2 bg-chart-4/10 text-chart-4 border-chart-4/20"><MapPin /><span>{job.experienceLevel}</span></Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        <Separator />
         <div className="flex-1 flex flex-col">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><ScrollText className="h-4 w-4" /> Job Description</h4>
            <ScrollArea className="flex-1 rounded-md border bg-secondary/30 p-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.description}</p>
            </ScrollArea>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-stretch space-y-4 pt-6 border-t bg-secondary/50">
           <div className="space-y-2">
                <h4 className="font-semibold text-sm">Moderation Actions</h4>
                {getStatusAlert()}
           </div>
           <div className="space-y-2">
              <Button onClick={handleModerate} disabled={isLoading} className="w-full">
                {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
                Moderate with AI
              </Button>
              <div className="flex gap-2">
                  <Button variant="destructive" className="w-full">
                      <XCircle className="mr-2 h-4 w-4" /> Reject
                  </Button>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle className="mr-2 h-4 w-4" /> Approve
                  </Button>
              </div>
          </div>
      </CardFooter>
    </Card>
  );
}
