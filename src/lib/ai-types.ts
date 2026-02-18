
import { z } from 'zod';

// From: src/ai/flows/admin-job-moderation.ts
export const ModerateJobPostInputSchema = z.object({
  jobPost: z.string().describe('The job post content to be moderated.'),
});
export type ModerateJobPostInput = z.infer<typeof ModerateJobPostInputSchema>;

export const ModerateJobPostOutputSchema = z.object({
  isSpam: z.boolean().describe('Whether the job post is potentially spam or fraudulent.'),
  reason: z
    .string()
    .optional()
    .describe('The reason why the job post was flagged as spam or fraudulent.'),
});
export type ModerateJobPostOutput = z.infer<typeof ModerateJobPostOutputSchema>;


// From: src/ai/flows/ai-job-recommendations.ts
export const AiJobRecommendationsInputSchema = z.object({
  profileSummary: z
    .string()
    .describe("A summary of the job seeker's profile, including skills and experience."),
  jobPreferences: z
    .string()
    .describe("The job seeker's preferences, such as desired job types and locations."),
  skillGaps: z.string().optional().describe('Optional skill gaps identified in the profile.'),
});
export type AiJobRecommendationsInput = z.infer<typeof AiJobRecommendationsInputSchema>;

export const AiJobRecommendationsOutputSchema = z.object({
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

// Career Assistant Types
export const CareerAssistantInputSchema = z.object({
  query: z.string(),
  isLoggedIn: z.boolean(),
  toolId: z.string().optional().describe('The specific career tool selected by the user.'),
  userData: z.object({
    name: z.string().optional(),
    professionalTitle: z.string().optional(),
    skills: z.array(z.string()).optional(),
    experience: z.array(z.any()).optional(),
  }).optional(),
  history: z.array(z.object({
    role: z.enum(['user', 'ai']),
    text: z.string(),
  })).optional(),
});
export type CareerAssistantInput = z.infer<typeof CareerAssistantInputSchema>;

export const CareerAssistantOutputSchema = z.object({
  text: z.string(),
  suggestedActions: z.array(z.string()).optional(),
});
export type CareerAssistantOutput = z.infer<typeof CareerAssistantOutputSchema>;
