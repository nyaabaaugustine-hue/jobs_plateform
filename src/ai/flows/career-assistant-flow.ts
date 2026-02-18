
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
  system: `You are Abena AI, an advanced AI Career Assistant for Chapel Hill, a professional job platform.
Your mission is to help users find jobs, optimize applications, prepare for interviews, track opportunities, and strategically grow their careers.

CRITICAL INSTRUCTION:
- You MUST ALWAYS respond in a valid JSON format.
- Your response must match the CareerAssistantOutputSchema exactly.
- Do not include any text outside the JSON object.

CORE CAPABILITIES
- Job Search & Smart Matching
- Resume/CV Optimization
- Cover Letter Generator
- Interview Prep
- Skill Gap Analysis
- Salary Insights & Negotiation

BEHAVIOR:
- Professional, concise, supportive, and action-oriented.
- Use suggestedActions to provide 2-3 clickable next steps.`,
  prompt: `
  User Status: {{#if isLoggedIn}}Authenticated{{else}}Anonymous{{/if}}
  {{#if userData}}
  User Profile:
  Name: {{{userData.name}}}
  Title: {{{userData.professionalTitle}}}
  Skills: {{{userData.skills}}}
  {{/if}}

  Conversation History:
  {{#each history}}
  {{role}}: {{{text}}}
  {{/each}}

  User Query: {{{query}}}

  Output Example:
  {
    "text": "I can help you find sales jobs! I can provide general advice or help you refine your search criteria.",
    "suggestedActions": ["Job Search", "Resume Tips", "Salary Advice"]
  }
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
          text: "I'm currently analyzing our career databases to give you the best advice. Could you please rephrase your request?",
          suggestedActions: ["Job Search", "Resume Tips", "Interview Prep"]
        };
      }
      
      return output;
    } catch (error) {
      console.error("Career Assistant Flow Error:", error);
      // Ensure we always return a friendly response even on model failure
      return {
        text: "I'm ready to help you accelerate your career! What would you like to focus on first?",
        suggestedActions: ["Find Jobs", "Review my CV", "Practice Interview"]
      };
    }
  }
);
