'use client';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { useState } from 'react';

import type { AIGeneratedProblem, ProblemGenerationRequest } from '@/types/ai';
import type { WorldId } from '@/types/course';

export const GenerateProblemButton = ({
  worldId,
  topic,
  onGenerated,
  onError,
}: {
  worldId: WorldId;
  topic: string;
  onGenerated: (problem: AIGeneratedProblem) => void;
  onError: (message: string) => void;
}) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [questionType, setQuestionType] =
    useState<ProblemGenerationRequest['questionType']>('multiple-choice');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    try {
      setLoading(true);
      onError('');

      const response = await fetch('/api/ai/generate-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          worldId,
          topic,
          difficulty,
          questionType,
        } satisfies ProblemGenerationRequest),
      });

      const payload = await response.json();

      if (!response.ok) {
        onError(payload.error ?? 'Unable to generate a practice problem right now.');
        return;
      }

      onGenerated(payload as AIGeneratedProblem);
    } catch {
      onError('Unable to reach the AI generator right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
      <TextField select label="Difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value as typeof difficulty)}>
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </TextField>

      <TextField
        select
        label="Question type"
        value={questionType}
        onChange={(event) => setQuestionType(event.target.value as ProblemGenerationRequest['questionType'])}
      >
        <MenuItem value="multiple-choice">Multiple choice</MenuItem>
        <MenuItem value="numeric-input">Numeric input</MenuItem>
        <MenuItem value="short-explanation">Short explanation</MenuItem>
        <MenuItem value="bug-hunt">Bug hunt</MenuItem>
      </TextField>

      <Button
        variant="contained"
        startIcon={<AutoAwesomeRoundedIcon />}
        onClick={() => void generate()}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate AI problem'}
      </Button>
    </Stack>
  );
};
