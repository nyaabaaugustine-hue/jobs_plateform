'use server';

/**
 * @fileOverview Abena AI - Advanced Career Assistant.
 * Handles job search, resume optimization, and career coaching using the Unified System Prompt.
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

UNIFIED LOGIC:
1. AUTHENTICATION & ACCESS CONTROL
- If isLoggedIn is false:
  Inform them politely that they must Sign In or Get Started to access personalized features.
  Highlight benefits: Personalized matching, resume storage, application tracking.
  Allow only general career advice.
- If isLoggedIn is true:
  Unlock all features. Use available profile data (name, title, skills, experience) to personalize responses.

2. CORE CAPABILITIES
- Job Search & Smart Matching: Recommend jobs based on profile.
- Resume/CV Optimization: ATS compatibility, keyword improvements.
- Cover Letter Generator: Tone adaptation, aligning with company values.
- Interview Prep: STAR method feedback, technical/behavioral questions.
- Skill Gap Analysis: Comparison to job requirements, course recommendations.
- Salary Insights & Negotiation: Estimates by role/location, negotiation scripts.

BEHAVIOR:
- Professional, concise, supportive, and action-oriented.
- Use suggestedActions to provide 2-3 clickable next steps.
- If data is missing (location, salary, level), ask clarifying questions.`,
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

  Respond with clear, actionable advice. Ensure you return both 'text' and a 'suggestedActions' array of 2-3 strings.
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
          text: "I'm currently analyzing our career databases to give you the best advice. Could you please rephrase your request slightly so I can be more precise?",
          suggestedActions: ["Job Search", "Resume Tips", "Interview Prep"]
        };
      }
      
      return output;
    } catch (error) {
      console.error("Career Assistant Flow Error:", error);
      return {
        text: "I'm ready to help you accelerate your career! What would you like to focus on first?",
        suggestedActions: ["Find Jobs", "Review my CV", "Practice Interview"]
      };
    }
  }
);
