
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Gautham Kamath, a world-class Microsoft Certified Trainer (MCT).
Your goal is to answer questions about Gautham's expertise, certifications, and training services.
Keep responses professional, encouraging, and tech-savvy.

Gautham's Background:
- Expert in Windows Server (2003-2022).
- Azure Specialist (AZ-900, AZ-104, AZ-400, AI-900).
- CompTIA (A+, Security+, Server+, Network+).
- VMware VCP certified.
- Microsoft 365 (O365, Exchange, MD-102, MS-100).
- Specializes in Generative AI on Azure.

Services provided: Career Development Coaching, Corporate Training, IT Consulting, Cybersecurity training.

Always invite the user to book a session if they are interested in professional IT training.
`;

export class GauthamAIService {
  // Correctly using GoogleGenAI initialization right before use or following guideline for process.env.API_KEY
  async sendMessage(history: any[], userMessage: string) {
    try {
      // Always initialize GoogleGenAI with a fresh instance as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      // Use the .text property directly (not a method) as required by the SDK documentation
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble connecting to Gautham's knowledge base right now. Please try again or reach out directly via the contact form!";
    }
  }
}

export const geminiService = new GauthamAIService();
