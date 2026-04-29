import type { CourseWorld } from '@/types/course';

export const compositionWorld: CourseWorld = {
  id: 'composition',
  title: 'Pipeline Builder',
  subtitle: 'Composition of Functions',
  description: 'Learn function composition by chaining outputs into the next function like middleware.',
  order: 2,
  icon: 'AccountTree',
  color: '#64ffda',
  prerequisites: ['function-foundations'],
  lessons: [
    {
      id: 'composition-basics',
      worldId: 'composition',
      title: 'Function Chaining',
      type: 'visual',
      order: 1,
      estimatedMinutes: 8,
      xp: 50,
      learningGoals: [
        'Understand that (f o g)(x) means f(g(x)).',
        'Evaluate composite functions step by step.',
        'Explain why order matters in composition.',
      ],
      devAnalogy: 'Composition is like passing data through chained functions or middleware.',
      explanation:
        'A composite function runs one function first, then sends that result into another function.',
      examples: [
        {
          title: 'Evaluate f(g(6))',
          prompt: 'Let f(x) = x^2 + 2 and g(x) = sqrt(x - 2). Find (f o g)(6).',
          steps: [
            'Start inside first: g(6).',
            'g(6) = sqrt(6 - 2) = sqrt(4) = 2.',
            'Now plug that into f: f(2).',
            'f(2) = 2^2 + 2 = 6.',
          ],
          answer: '6',
        },
      ],
      challenges: [
        {
          id: 'composition-1',
          type: 'numeric-input',
          prompt: 'Let f(x) = x^2 + 2 and g(x) = sqrt(x - 2). Find (f o g)(6).',
          correctAnswer: 6,
          explanation: 'g(6) = 2, then f(2) = 6.',
          hints: ['Start with the inner function.', 'Calculate g(6) before f.'],
          xp: 10,
          difficulty: 'easy',
        },
        {
          id: 'composition-bug-1',
          type: 'bug-hunt',
          prompt: 'A student says (f o g)(6) = f(6). What did they skip?',
          correctAnswer: 'They skipped evaluating g(6) first.',
          explanation: 'Composition always starts with the inner function.',
          hints: ['Look at the function inside the parentheses first.'],
          xp: 10,
          difficulty: 'medium',
        },
      ],
    },
  ],
};
