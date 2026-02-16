
'use client';

import { useState, useEffect } from 'react';
import { Lightbulb, Loader, ServerCrash } from 'lucide-react';
import { fetchAiJobRecommendations } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-primary" />
            <span>Jobs You Might Like</span>
          </CardTitle>
          <CardDescription>Our AI is finding the best matches for you...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center space-x-2 py-8">
          <Loader className="h-6 w-6 animate-spin" />
          <p>Analyzing your profile...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <ServerCrash />
            <span>AI Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations) {
    return null; // Don't show the card if AI decides not to recommend
  }

  return (
    <Card className="bg-secondary/50 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-primary" />
          <span>Jobs You Might Like</span>
        </CardTitle>
        <CardDescription>AI-powered suggestions.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <h3 className="font-semibold mb-2 text-sm">Recommended Job Titles</h3>
          <div className="flex flex-wrap gap-2">
            {recommendations.recommendedJobs.slice(0, 3).map((job, index) => (
              <Badge key={index} variant="default">{job}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-sm">Skill Gap Suggestions</h3>
          <div className="flex flex-wrap gap-2">
            {recommendations.skillGapSuggestions?.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>
        {recommendations.resumeMatchingScore && (
          <div>
            <h3 className="font-semibold mb-2 text-sm">Resume Matching Score</h3>
            <div className="space-y-2">
               <div className="flex justify-between">
                <p className="font-medium text-xs text-muted-foreground">Match for recommended roles</p>
                <p className="font-medium text-sm text-primary">{recommendations.resumeMatchingScore}%</p>
              </div>
              <Progress value={recommendations.resumeMatchingScore} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
