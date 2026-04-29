import type { CourseWorld } from '@/types/course';

export const functionFoundationsWorld: CourseWorld = {
  id: 'function-foundations',
  title: 'Function Factory',
  subtitle: 'Function Foundations',
  description: 'Build intuition for functions as input/output machines before calculus ramps up.',
  order: 1,
  icon: 'Functions',
  color: '#70f0ff',
  prerequisites: [],
  lessons: [
    {
      id: 'function-machine-basics',
      worldId: 'function-foundations',
      title: 'What Is a Function?',
      type: 'visual',
      order: 1,
      estimatedMinutes: 7,
      xp: 45,
      learningGoals: [
        'Explain a function as one input producing one output.',
        'Predict outputs from simple function rules.',
        'Connect function notation to code functions.',
      ],
      devAnalogy: 'A function behaves like a deterministic helper that accepts a parameter and returns a value.',
      explanation:
        'A function takes an input, runs a rule, and returns exactly one output for that input.',
      examples: [
        {
          title: 'Code-first intuition',
          prompt: 'If f(x) = 2x + 3, what happens when x = 4?',
          steps: ['Substitute 4 for x.', 'Compute 2(4) + 3.', 'The output is 11.'],
          answer: '11',
        },
      ],
      challenges: [
        {
          id: 'function-machine-1',
          type: 'multiple-choice',
          prompt: 'Which mapping is a function?',
          choices: ['1 -> 2, 1 -> 3', '2 -> 5, 3 -> 5', '4 -> 1, 4 -> 0', '7 -> 8, 7 -> 9'],
          correctAnswer: '2 -> 5, 3 -> 5',
          explanation: 'A function can reuse outputs, but each input can only map to one output.',
          hints: ['Check whether any input repeats with two different outputs.'],
          xp: 5,
          difficulty: 'easy',
        },
      ],
    },
  ],
};
