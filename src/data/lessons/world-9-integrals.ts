import type { CourseWorld } from '@/types/course';

export const integralsWorld: CourseWorld = {
  id: 'integrals',
  title: 'Area Builder',
  subtitle: 'Integrals',
  description: 'Learn integration as adding many tiny pieces into one accumulated total.',
  order: 5,
  icon: 'StackedLineChart',
  color: '#f9c74f',
  prerequisites: ['derivatives'],
  lessons: [
    {
      id: 'integral-area',
      worldId: 'integrals',
      title: 'Accumulation and Area',
      type: 'visual',
      order: 1,
      estimatedMinutes: 12,
      xp: 60,
      learningGoals: [
        'Interpret an integral as accumulation.',
        'Estimate area under a curve with rectangles.',
        'Relate integration to repeated summation in code.',
      ],
      devAnalogy: 'Integration is like a loop that keeps adding tiny slices until you have a total.',
      explanation:
        'A definite integral adds up many tiny contributions, which is why rectangles are a great starting visual.',
      examples: [
        {
          title: 'Tiny slices',
          prompt: 'Why does using more rectangles usually improve an area estimate?',
          steps: [
            'Smaller rectangles follow the curve more closely.',
            'Less empty space or overshoot means a better estimate.',
          ],
          answer: 'Because thinner slices better match the curve.',
        },
      ],
      challenges: [
        {
          id: 'integral-rectangles-1',
          type: 'multiple-choice',
          prompt: 'If you increase the number of equal-width rectangles in a Riemann sum, the estimate is usually:',
          choices: ['Less precise', 'The same forever', 'More precise', 'Undefined'],
          correctAnswer: 'More precise',
          explanation: 'More, thinner slices usually track the curve more accurately.',
          hints: ['Think of pixelation versus higher resolution.'],
          xp: 5,
          difficulty: 'easy',
        },
      ],
    },
  ],
};
