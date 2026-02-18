'use server';

/**
 * @fileOverview Provides AI-driven job recommendations based on user profile and skills.
 *
 * - getAiJobRecommendations - A function that returns AI-driven job recommendations.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import {
  AiJobRecommendationsInputSchema,
  type AiJobRecommendationsInput,
  AiJobRecommendationsOutputSchema,
  type AiJobRecommendationsOutput
} from '@/lib/ai-types';


export async function getAiJobRecommendations(
  input: AiJobRecommendationsInput
): Promise<AiJobRecommendationsOutput> {
  return aiJobRecommendationsFlow(input);
}

const aiJobRecommendationsPrompt = ai.definePrompt({
    name: 'aiJobRecommendationsPrompt',
    input: { schema: AiJobRecommendationsInputSchema },
    output: { schema: AiJobRecommendationsOutputSchema },
    config: {
        model: googleAI.model('gemini-1.5-flash'),
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_ONLY_HIGH',
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH',
          },
        ],
    },
    prompt: `You are an AI job recommendation expert. Given the job seeker's profile summary, job preferences, and any identified skill gaps, provide relevant job recommendations.

Profile Summary: {{{profileSummary}}}
Job Preferences: {{{jobPreferences}}}
Skill Gaps: {{{skillGaps}}}

Based on the profile summary, decide whether the job recommendations should be shown or not. Set shouldRecommend accordingly.

Respond with a list of recommended jobs, suggestions for addressing skill gaps, and a resume matching score (a number between 70 and 100), if applicable.`
});

const aiJobRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiJobRecommendationsFlow',
    inputSchema: AiJobRecommendationsInputSchema,
    outputSchema: AiJobRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await aiJobRecommendationsPrompt(input);
    return output!;
  }
);
