'use client';

import { useState, useEffect } from 'react';
import { Lightbulb, ServerCrash } from 'lucide-react';
import { fetchAiJobRecommendations } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import type { AiJobRecommendationsOutput } from '@/lib/ai-types';

const mockUserProfile = {
  profileSummary: 'Experienced React developer with 5 years in frontend development, specializing in TypeScript, Next.js, and state management with Redux. Proven ability to lead small teams and deliver high-quality web applications.',
  jobPreferences: 'Looking for remote senior frontend engineer roles in a fast-paced startup environment. Interested in fintech or SaaS companies.',
  skillGaps: 'Limited experience with GraphQL and backend technologies like Node.js.'
};

export default function JobRecommendations() {
  const [recommendations, setRecommendations] = useState<AiJobRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getRecommendations() {
      try {
        setIsLoading(true);
        const result = await fetchAiJobRecommendations(mockUserProfile);
        if (result.shouldRecommend) {
          setRecommendations(result);
        } else {
          setRecommendations(null);
        }
      } catch (err) {
        setError('Failed to fetch AI recommendations.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getRecommendations();
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-secondary/20 border-dashed">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-4 w-64 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-8 w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive text-base">
            <ServerCrash className="h-5 w-5" />
            <span>AI Recommendations Error</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-6">
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations) {
    return null;
  }

  return (
    <Card className="bg-secondary/50 h-full border-primary/10 transition-all hover:border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="text-primary h-5 w-5" />
          <span>Jobs You Might Like</span>
        </CardTitle>
        <CardDescription>AI-powered suggestions based on your profile.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <h3 className="font-bold mb-3 text-xs uppercase tracking-widest text-muted-foreground">Recommended Job Titles</h3>
          <div className="flex flex-wrap gap-2">
            {recommendations.recommendedJobs.slice(0, 3).map((job, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">{job}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-3 text-xs uppercase tracking-widest text-muted-foreground">Skill Gap Suggestions</h3>
          <div className="flex flex-wrap gap-2">
            {recommendations.skillGapSuggestions?.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="font-medium">{skill}</Badge>
            ))}
          </div>
        </div>
        {recommendations.resumeMatchingScore && (
          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Resume Matching Score</h3>
              <p className="font-black text-sm text-primary">{recommendations.resumeMatchingScore}%</p>
            </div>
            <Progress value={recommendations.resumeMatchingScore} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
