import { NextResponse } from 'next/server';

import { buildProblemGeneratorPrompt } from '@/lib/ai/prompts';
import { aiGeneratedProblemSchema } from '@/lib/ai/schemas';
import { validateAIProblemResponse } from '@/lib/ai/validateAIResponse';
import type { ProblemGenerationRequest } from '@/types/ai';

const MODEL = 'gpt-4.1-mini';

const extractOutputText = (payload: Record<string, unknown>) => {
  const output = payload.output;
  if (!Array.isArray(output)) {
    return null;
  }

  for (const item of output) {
    if (!item || typeof item !== 'object') {
      continue;
    }

    const content = (item as { content?: unknown }).content;
    if (!Array.isArray(content)) {
      continue;
    }

    for (const entry of content) {
      if (!entry || typeof entry !== 'object') {
        continue;
      }

      if ((entry as { type?: unknown }).type === 'output_text' && typeof (entry as { text?: unknown }).text === 'string') {
        return (entry as { text: string }).text;
      }
    }
  }

  return null;
};

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OPENAI_API_KEY is missing. Add it to .env.local to enable AI problem generation.' },
      { status: 503 },
    );
  }

  let body: ProblemGenerationRequest;

  try {
    body = (await request.json()) as ProblemGenerationRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 });
  }

  if (!body.worldId || !body.topic || !body.difficulty || !body.questionType) {
    return NextResponse.json({ error: 'worldId, topic, difficulty, and questionType are required.' }, { status: 400 });
  }

  const prompt = buildProblemGeneratorPrompt(body);

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      input: [
        {
          role: 'system',
          content:
            'Generate exactly one structured calculus practice problem. Keep it brief, correct, and aligned to the requested topic.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          ...aiGeneratedProblemSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: `OpenAI request failed: ${errorText}` }, { status: 502 });
  }

  const payload = (await response.json()) as Record<string, unknown>;
  const outputText = extractOutputText(payload);

  if (!outputText) {
    return NextResponse.json({ error: 'The AI response did not contain structured output text.' }, { status: 502 });
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(outputText);
  } catch {
    return NextResponse.json({ error: 'The AI response was not valid JSON.' }, { status: 502 });
  }

  if (!validateAIProblemResponse(parsed)) {
    return NextResponse.json({ error: 'The AI response did not match the expected problem schema.' }, { status: 502 });
  }

  return NextResponse.json(parsed);
}
