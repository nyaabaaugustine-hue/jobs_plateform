
'use server';

/**
 * @fileOverview This file defines a Genkit flow for admin job moderation,
 * allowing administrators to automatically detect and flag potentially fraudulent or spam job postings.
 *
 * - moderateJobPost - A function that moderates a job post and flags it if it's potentially fraudulent or spam.
 */

import { ai } from '@/ai/genkit';
import { 
  ModerateJobPostInputSchema, 
  type ModerateJobPostInput, 
  ModerateJobPostOutputSchema,
  type ModerateJobPostOutput
} from '@/lib/ai-types';

export async function moderateJobPost(input: ModerateJobPostInput): Promise<ModerateJobPostOutput> {
  return moderateJobPostFlow(input);
}

const moderateJobPostPrompt = ai.definePrompt({
  name: 'moderateJobPostPrompt',
  input: { schema: ModerateJobPostInputSchema },
  output: { schema: ModerateJobPostOutputSchema },
  config: {
    model: 'gemini-pro',
  },
  prompt: `You are an expert job post moderator. Your task is to analyze the provided job post and determine if it is potentially fraudulent or spam.

  Job Post:
  {{{jobPost}}}

  Evaluate the job post based on factors such as:
  - Unrealistic salary offers
  - Suspicious or vague job descriptions
  - Requests for sensitive personal information upfront
  - Grammatical errors and typos
  - Use of generic or copied content
  - Urgency and pressure to apply quickly

  Based on your analysis, determine if the job post is spam or fraudulent and provide a reason for your determination. If the post is not spam, isSpam should be false and the reason should be an empty string.
  Make sure to set the isSpam output field appropriately.
  `,
});

const moderateJobPostFlow = ai.defineFlow(
  {
    name: 'moderateJobPostFlow',
    inputSchema: ModerateJobPostInputSchema,
    outputSchema: ModerateJobPostOutputSchema,
  },
  async (input) => {
    const { output } = await moderateJobPostPrompt(input);
    return output!;
  }
);
