import type { CourseWorld } from '@/types/course';

export const limitsWorld: CourseWorld = {
  id: 'limits',
  title: 'Approach Zone',
  subtitle: 'Limits',
  description: 'See what a function is approaching from the left and right before plugging values in.',
  order: 3,
  icon: 'Timeline',
  color: '#82aaff',
  prerequisites: ['composition'],
  lessons: [
    {
      id: 'limits-intuition',
      worldId: 'limits',
      title: 'Approaching a Value',
      type: 'visual',
      order: 1,
      estimatedMinutes: 10,
      xp: 55,
      learningGoals: [
        'Describe a limit as approaching behavior.',
        'Compare left-hand and right-hand limits.',
        'Explain why a hole can still have a limit.',
      ],
      devAnalogy: 'A limit is the value the program trends toward as the input gets very close to a target edge case.',
      explanation:
        'Limits focus on the nearby behavior of a function, not just the exact value at one point.',
      examples: [
        {
          title: 'Hole in the graph',
          prompt: 'Why can a function have a limit at x = 2 even if f(2) is undefined?',
          steps: [
            'Check values close to 2 from the left.',
            'Check values close to 2 from the right.',
            'If both sides approach the same value, the limit exists.',
          ],
          answer: 'Because the nearby outputs can still approach the same number.',
        },
      ],
      challenges: [
        {
          id: 'limit-choice-1',
          type: 'multiple-choice',
          prompt: 'If the left-hand limit is 4 and the right-hand limit is 4, what is the limit?',
          choices: ['Does not exist', '0', '4', 'Undefined forever'],
          correctAnswer: '4',
          explanation: 'When both one-sided limits agree, the two-sided limit equals that shared value.',
          hints: ['Match the left and right behavior.'],
          xp: 5,
          difficulty: 'easy',
        },
      ],
    },
  ],
};
