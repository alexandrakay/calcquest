export type WorldId =
  | 'function-foundations'
  | 'composition'
  | 'limits'
  | 'derivatives'
  | 'integrals';

export type LessonType =
  | 'concept'
  | 'visual'
  | 'code-analogy'
  | 'guided-practice'
  | 'bug-hunt'
  | 'boss-challenge'
  | 'mastery-check';

export type ChallengeType =
  | 'multiple-choice'
  | 'numeric-input'
  | 'drag-pipeline'
  | 'graph-match'
  | 'bug-hunt'
  | 'short-explanation';

export interface LessonExample {
  title: string;
  prompt: string;
  steps: string[];
  answer: string;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  prompt: string;
  choices?: string[];
  correctAnswer: string | number | string[];
  explanation: string;
  hints: string[];
  xp: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Lesson {
  id: string;
  worldId: WorldId;
  title: string;
  type: LessonType;
  order: number;
  estimatedMinutes: number;
  xp: number;
  learningGoals: string[];
  devAnalogy?: string;
  explanation: string;
  examples: LessonExample[];
  challenges: Challenge[];
}

export interface CourseWorld {
  id: WorldId;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  icon: string;
  color: string;
  prerequisites: WorldId[];
  lessons: Lesson[];
}
