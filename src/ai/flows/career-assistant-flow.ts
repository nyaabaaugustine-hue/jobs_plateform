
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
- ALWAYS respond in valid JSON format matching the CareerAssistantOutputSchema.
- If a toolId is provided, transition IMMEDIATELY into that specific diagnostic track.
- Do NOT repeat the initial welcome message once a track has started.

TOOL TRACKS:
- smart_job_match: Ask for current skills, years of experience, and desired location.
- optimize_cv: Ask the user to describe their current role or past experience for improvement.
- interview_prep: Ask what role they are interviewing for and provide mock questions.
- salary_insights: Provide range estimations and negotiation tactics based on their role.
- career_roadmap: Map out professional milestones for the next 12-24 months.

BEHAVIOR:
- Executive, concise, supportive, and action-oriented.
- Use suggestedActions to provide 2-3 clickable next steps relevant to the CURRENT track.`,
  prompt: `
  Selected Tool: {{{toolId}}}
  User Status: {{#if isLoggedIn}}Authenticated{{else}}Anonymous{{/if}}
  
  Conversation History:
  {{#each history}}
  {{role}}: {{{text}}}
  {{/each}}

  User Query: {{{query}}}
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
          text: "I'm currently analyzing our databases to give you the best strategic advice. What area of your career would you like to focus on first?",
          suggestedActions: ["Smart Job Match", "Optimize My CV", "Interview Prep"]
        };
      }
      
      return output;
    } catch (error) {
      console.error("Career Assistant Flow Error:", error);
      return {
        text: "I'm ready to help you accelerate your growth. Would you like to start with a Smart Job Match or a Career Roadmap?",
        suggestedActions: ["Smart Job Match", "Career Roadmap", "WhatsApp Chat"]
      };
    }
  }
);
