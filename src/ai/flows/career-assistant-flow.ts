'use server';

/**
 * @fileOverview Abena AI - Advanced Career Assistant.
 * Synchronized to Gemini 1.5 Flash for high-speed precision.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { 
  CareerAssistantInputSchema, 
  type CareerAssistantInput, 
  CareerAssistantOutputSchema,
  type CareerAssistantOutput
} from '@/lib/ai-types';

export async function runCareerAssistant(input: CareerAssistantInput): Promise<CareerAssistantOutput> {
  return careerAssistantFlow(input);
}

const careerAssistantPrompt = ai.definePrompt({
  name: 'careerAssistantPrompt',
  input: { schema: CareerAssistantInputSchema },
  output: { schema: CareerAssistantOutputSchema },
  config: {
    model: googleAI.model('gemini-1.5-flash'),
    temperature: 0.7,
  },
  system: `You are Abena AI, an advanced AI Career Strategist for Chapel Hill.
Your mission is to help users find jobs, optimize applications, and strategically grow their careers.

CRITICAL INSTRUCTIONS:
- ALWAYS respond in valid JSON format matching the output schema.
- INTENT DETECTION: If the user query or toolId indicates a specific track (Job Match, CV, Roadmap, Prep, Salary), immediately switch to that track.
- NO REPETITION: Do NOT repeat the "Welcome to Chapel Hill" message once a tool has been selected or conversation has started.
- CONTEXT: If the user says "yes", "go on", or "tell me more", proceed with the active career track logic.

TOOL TRACKS:
- smart_job_match: Ask for current skills, years of experience, and desired location.
- optimize_cv: Ask the user to describe their current role or share experience for improvement.
- interview_prep: Ask what role they are interviewing for and provide tailored mock questions.
- salary_insights: Provide range estimations and negotiation tactics based on their specific role and location.
- career_roadmap: Map out professional milestones for the next 12-24 months.

BEHAVIOR:
- Executive, concise, supportive, and action-oriented.
- Use suggestedActions to provide 2-3 clickable next steps relevant to the CURRENT track.`,
  prompt: `
  Selected Tool ID: {{#if toolId}}{{{toolId}}}{{else}}None{{/if}}
  User Status: {{#if isLoggedIn}}Authenticated{{else}}Anonymous{{/if}}
  
  Conversation History:
  {{#each history}}
  {{role}}: {{{text}}}
  {{/each}}

  Current User Query: {{{query}}}
  `,
});

const careerAssistantFlow = ai.defineFlow(
  {
    name: 'careerAssistantFlow',
    inputSchema: CareerAssistantInputSchema,
    outputSchema: CareerAssistantOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await careerAssistantPrompt(input);
      
      if (!output) {
        return {
          text: "I'm analyzing the best strategy for your career path. What specific area would you like to explore first?",
          suggestedActions: ["Smart Job Match", "Optimize My CV", "Career Roadmap"]
        };
      }
      
      return output;
    } catch (error) {
      console.error("Career Assistant Flow Error:", error);
      return {
        text: "I'm ready to dive into your career strategy. We can start with a Smart Job Match or a Career Roadmap—which sounds better to you?",
        suggestedActions: ["Smart Job Match", "Career Roadmap", "WhatsApp Chat"]
      };
    }
  }
);
