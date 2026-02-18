'use server';

import {
  getAiJobRecommendations,
} from '@/ai/flows/ai-job-recommendations';
import {
  moderateJobPost,
} from '@/ai/flows/admin-job-moderation';
import {
  runCareerAssistant as runCareerAssistantFlow,
} from '@/ai/flows/career-assistant-flow';
import type { 
  AiJobRecommendationsInput,
  AiJobRecommendationsOutput,
  ModerateJobPostInput,
  ModerateJobPostOutput,
  CareerAssistantInput,
  CareerAssistantOutput,
} from './ai-types';

/**
 * Checks if a valid Google/Gemini API key is available in the environment.
 */
const checkAiConfig = () => {
  return !!(process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY);
};

export const fetchAiJobRecommendations = async (input: AiJobRecommendationsInput): Promise<AiJobRecommendationsOutput> => {
  if (!checkAiConfig()) {
    console.warn("AI recommendations skipped: API key not set.");
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
  if (!checkAiConfig()) {
    console.warn("AI moderation skipped: API key not set.");
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

export const runCareerAssistant = async (input: CareerAssistantInput): Promise<CareerAssistantOutput> => {
  if (!checkAiConfig()) {
    return {
      text: "I'm sorry, my high-speed AI services are currently being initialized. Please try again in a few moments or sign in to access personalized features!",
      suggestedActions: ["Try again later", "Sign In", "Get Started"]
    };
  }

  try {
    return await runCareerAssistantFlow(input);
  } catch (error) {
    console.error('Career Assistant error:', error);
    return {
      text: "I'm ready to help you with your career strategy. What area would you like to explore first?",
      suggestedActions: ["Job Search", "CV Optimization", "Interview Prep"]
    };
  }
};
