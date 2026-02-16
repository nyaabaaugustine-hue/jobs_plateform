
'use server';

/**
 * @fileOverview Provides AI-driven job recommendations based on user profile and skills.
 *
 * - getAiJobRecommendations - A function that returns AI-driven job recommendations.
 * - AiJobRecommendationsInput - The input type for the getAiJobRecommendations function.
 * - AiJobRecommendationsOutput - The return type for the getAiJobRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AiJobRecommendationsInputSchema = z.object({
  profileSummary: z
    .string()
    .describe("A summary of the job seeker's profile, including skills and experience."),
  jobPreferences: z
    .string()
    .describe("The job seeker's preferences, such as desired job types and locations."),
  skillGaps: z.string().optional().describe('Optional skill gaps identified in the profile.'),
});
export type AiJobRecommendationsInput = z.infer<typeof AiJobRecommendationsInputSchema>;

const AiJobRecommendationsOutputSchema = z.object({
  recommendedJobs: z
    .array(z.string())
    .describe('A list of job titles or descriptions recommended for the job seeker.'),
  skillGapSuggestions: z
    .array(z.string())
    .optional()
    .describe('Suggestions for addressing any skill gaps.'),
  resumeMatchingScore: z
    .number()
    .min(70)
    .max(100)
    .optional()
    .describe('A score between 70-100 indicating how well the resume matches the recommended jobs.'),
  shouldRecommend: z
    .boolean()
    .describe(
      'A boolean value that determines whether the job recommendations should be shown or not based on the user profile.'
    ),
});
export type AiJobRecommendationsOutput = z.infer<typeof AiJobRecommendationsOutputSchema>;

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
        model: 'gemini-pro',
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
