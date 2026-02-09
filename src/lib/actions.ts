'use server';

import {
  getAiJobRecommendations,
  AiJobRecommendationsInput,
} from '@/ai/flows/ai-job-recommendations';
import {
  moderateJobPost,
  ModerateJobPostInput,
} from '@/ai/flows/admin-job-moderation';

export const fetchAiJobRecommendations = async (input: AiJobRecommendationsInput) => {
  try {
    const recommendations = await getAiJobRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error('Error fetching AI job recommendations:', error);
    return {
      recommendedJobs: [],
      skillGapSuggestions: ['Could not fetch AI recommendations at this time.'],
      shouldRecommend: false,
    };
  }
};

export const runJobModeration = async (input: ModerateJobPostInput) => {
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
