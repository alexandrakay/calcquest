export const aiGeneratedProblemSchema = {
  name: 'calcquest_problem',
  strict: true,
  schema: {
    type: 'object',
    additionalProperties: false,
    required: [
      'id',
      'topic',
      'difficulty',
      'type',
      'prompt',
      'correctAnswer',
      'solutionSteps',
      'explanation',
      'hints',
      'commonMistakes',
      'xp',
    ],
    properties: {
      id: { type: 'string' },
      topic: { type: 'string' },
      difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
      type: { type: 'string', enum: ['multiple-choice', 'numeric-input', 'short-explanation', 'bug-hunt'] },
      prompt: { type: 'string' },
      choices: {
        type: 'array',
        items: { type: 'string' },
      },
      correctAnswer: {
        anyOf: [
          { type: 'string' },
          { type: 'number' },
          {
            type: 'array',
            items: { type: 'string' },
          },
        ],
      },
      solutionSteps: {
        type: 'array',
        items: { type: 'string' },
      },
      explanation: { type: 'string' },
      hints: {
        type: 'array',
        items: { type: 'string' },
      },
      commonMistakes: {
        type: 'array',
        items: { type: 'string' },
      },
      xp: { type: 'number' },
    },
  },
} as const;
