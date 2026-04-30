import type { ProblemGenerationRequest } from '@/types/ai';

export const buildProblemGeneratorPrompt = (request: ProblemGenerationRequest) => `
You are generating a calculus practice problem for CalcQuest, a gamified learning app for adult learners and software engineers.

Requirements:
- Match the requested topic, world, difficulty, and question type.
- Keep wording short and clear.
- Stay inside the requested concept level.
- Prefer software-engineer-friendly framing when useful.
- Return a single problem only.
- Make the problem solvable with basic algebraic or calculus steps appropriate to the topic.

Request:
- worldId: ${request.worldId}
- lessonId: ${request.lessonId ?? 'not provided'}
- topic: ${request.topic}
- difficulty: ${request.difficulty}
- questionType: ${request.questionType}
- weakAreas: ${request.userWeakAreas?.join(', ') || 'none provided'}
- avoidRecentProblemIds: ${request.avoidRecentProblemIds?.join(', ') || 'none provided'}
`.trim();
