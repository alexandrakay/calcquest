import type { ChallengeType, WorldId } from '@/types/course';

export interface ProblemGenerationRequest {
  worldId: WorldId;
  lessonId?: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionType: Extract<ChallengeType, 'multiple-choice' | 'numeric-input' | 'short-explanation' | 'bug-hunt'>;
  userWeakAreas?: string[];
  avoidRecentProblemIds?: string[];
}

export interface AIGeneratedProblem {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: Extract<ChallengeType, 'multiple-choice' | 'numeric-input' | 'short-explanation' | 'bug-hunt'>;
  prompt: string;
  choices?: string[];
  correctAnswer: string | number | string[];
  solutionSteps: string[];
  explanation: string;
  hints: string[];
  commonMistakes: string[];
  xp: number;
}
