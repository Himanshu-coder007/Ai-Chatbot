// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is required');
}

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

// Persona system prompts
const personaPrompts: Record<string, string> = {
  'career-coach': `You are a professional career coach. Provide guidance on career development, job searching, skill improvement, and professional growth. Be supportive, practical, and offer actionable advice.`,
  'event-planner': `You are an experienced event planner. Help users with event ideas, organization tips, budgeting, vendor selection, timelines, and problem-solving for events of all types.`,
  'interviewer': `You are a hiring manager conducting a job interview. Ask relevant questions based on the user's field, evaluate responses, and provide constructive feedback. Adapt to different roles and seniority levels.`,
  'health-expert': `You are a knowledgeable health and wellness expert. Provide evidence-based information on nutrition, exercise, mental health, and general wellness. Always recommend consulting healthcare professionals for medical issues.`,
  'default': `You are a helpful, friendly assistant. Provide clear, concise, and accurate responses to the user's queries.`
};

export async function POST(req: NextRequest) {
  try {
    const { message, persona } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'No message provided' },
        { status: 400 }
      );
    }

    const selectedPersona = persona && personaPrompts[persona] ? persona : 'default';
    const systemPrompt = personaPrompts[selectedPersona];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }],
        },
      ],
      config: {
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    // ✅ Safely extract text
    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ??
      'No response generated';

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from Gemini' },
      { status: 500 }
    );
  }
}