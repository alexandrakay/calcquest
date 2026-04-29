import type { CourseWorld } from '@/types/course';

export const derivativesWorld: CourseWorld = {
  id: 'derivatives',
  title: 'Slope Engine',
  subtitle: 'Derivatives',
  description: 'Treat derivatives as the real-time speedometer of how a graph changes.',
  order: 4,
  icon: 'Speed',
  color: '#ff8a65',
  prerequisites: ['limits'],
  lessons: [
    {
      id: 'derivative-slope',
      worldId: 'derivatives',
      title: 'Instant Rate of Change',
      type: 'visual',
      order: 1,
      estimatedMinutes: 12,
      xp: 60,
      learningGoals: [
        'Interpret the derivative as tangent slope.',
        'Estimate whether a slope is positive, negative, or zero.',
        'Connect derivative ideas to changing outputs in code.',
      ],
      devAnalogy: 'A derivative tells you how quickly the return value is changing at one exact input.',
      explanation:
        'The derivative measures instant change, which is why tangent lines are such a useful visual.',
      examples: [
        {
          title: 'Reading a tangent',
          prompt: 'If the tangent line tilts upward as x increases, what can you say about the derivative?',
          steps: [
            'Moving up to the right means a positive slope.',
            'Positive slope means a positive derivative.',
          ],
          answer: 'The derivative is positive.',
        },
      ],
      challenges: [
        {
          id: 'derivative-slope-1',
          type: 'multiple-choice',
          prompt: 'At the top of a smooth hill, the tangent line is horizontal. The derivative is:',
          choices: ['Positive', 'Negative', 'Zero', 'Impossible to know'],
          correctAnswer: 'Zero',
          explanation: 'A horizontal tangent line has slope 0.',
          hints: ['Think about rise over run for a flat line.'],
          xp: 5,
          difficulty: 'easy',
        },
      ],
    },
  ],
};
