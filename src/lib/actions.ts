
'use server';

import {
  getAiJobRecommendations,
} from '@/ai/flows/ai-job-recommendations';
import {
  moderateJobPost,
} from '@/ai/flows/admin-job-moderation';
import type { 
  AiJobRecommendationsInput,
  AiJobRecommendationsOutput,
  ModerateJobPostInput,
  ModerateJobPostOutput,
} from './ai-types';

export const fetchAiJobRecommendations = async (input: AiJobRecommendationsInput): Promise<AiJobRecommendationsOutput> => {
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    console.warn("AI recommendations skipped: GEMINI_API_KEY or GOOGLE_API_KEY not set.");
    // Return a payload that indicates no recommendations should be shown.
    return {
      shouldRecommend: false,
      recommendedJobs: [],
      skillGapSuggestions: [],
      resumeMatchingScore: 0,
    };
  }

  try {
    const recommendations = await getAiJobRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error('Error fetching AI job recommendations:', error);
    throw new Error('Failed to fetch AI recommendations.');
  }
};

export const runJobModeration = async (input: ModerateJobPostInput): Promise<ModerateJobPostOutput> => {
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    console.warn("AI moderation skipped: GEMINI_API_KEY or GOOGLE_API_KEY not set.");
    return {
      isSpam: false,
      reason: 'AI moderation is not configured. Please add an API key to enable this feature.',
    };
  }

  try {
    const moderationResult = await moderateJobPost(input);
    return moderationResult;
  } catch (error) {
    console.error('Error running job moderation:', error);
    return {
      isSpam: false,
      reason: 'AI moderation failed. Please review manually.',
    };
  }
};
