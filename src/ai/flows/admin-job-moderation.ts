'use server';

/**
 * @fileOverview This file defines a Genkit flow for admin job moderation,
 * allowing administrators to automatically detect and flag potentially fraudulent or spam job postings.
 *
 * - moderateJobPost - A function that moderates a job post and flags it if it's potentially fraudulent or spam.
 * - ModerateJobPostInput - The input type for the moderateJobPost function.
 * - ModerateJobPostOutput - The return type for the moderateJobPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateJobPostInputSchema = z.object({
  jobPost: z.string().describe('The job post content to be moderated.'),
});
export type ModerateJobPostInput = z.infer<typeof ModerateJobPostInputSchema>;

const ModerateJobPostOutputSchema = z.object({
  isSpam: z.boolean().describe('Whether the job post is potentially spam or fraudulent.'),
  reason: z
    .string()
    .optional()
    .describe('The reason why the job post was flagged as spam or fraudulent.'),
});
export type ModerateJobPostOutput = z.infer<typeof ModerateJobPostOutputSchema>;

export async function moderateJobPost(input: ModerateJobPostInput): Promise<ModerateJobPostOutput> {
  return moderateJobPostFlow(input);
}

const moderateJobPostPrompt = ai.definePrompt({
  name: 'moderateJobPostPrompt',
  input: {schema: ModerateJobPostInputSchema},
  output: {schema: ModerateJobPostOutputSchema},
  prompt: `You are an expert job post moderator. Your task is to analyze the provided job post and determine if it is potentially fraudulent or spam.

  Job Post:
  {{jobPost}}

  Evaluate the job post based on factors such as:
  - Unrealistic salary offers
  - Suspicious or vague job descriptions
  - Requests for sensitive personal information upfront
  - Grammatical errors and typos
  - Use of generic or copied content
  - Urgency and pressure to apply quickly

  Based on your analysis, determine if the job post is spam or fraudulent and provide a reason for your determination. If the post is not spam, isSpam should be false and the reason should be an empty string.
  Make sure to set the isSpam output field appropriately.
  Response should be in JSON format.
  `,
});

const moderateJobPostFlow = ai.defineFlow(
  {
    name: 'moderateJobPostFlow',
    inputSchema: ModerateJobPostInputSchema,
    outputSchema: ModerateJobPostOutputSchema,
  },
  async input => {
    const {output} = await moderateJobPostPrompt(input);
    return output!;
  }
);
