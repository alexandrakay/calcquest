'use client';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Alert, Card, CardContent, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import type { AIGeneratedProblem } from '@/types/ai';

export const AIGeneratedProblemCard = ({ problem }: { problem: AIGeneratedProblem }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const isCorrect = useMemo(() => {
    if (typeof problem.correctAnswer === 'number') {
      return Number(answer) === problem.correctAnswer;
    }

    if (Array.isArray(problem.correctAnswer)) {
      return problem.correctAnswer.join('|').toLowerCase() === answer.trim().toLowerCase();
    }

    return String(problem.correctAnswer).trim().toLowerCase() === answer.trim().toLowerCase();
  }, [answer, problem.correctAnswer]);

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="overline" color="primary.main">
          AI practice problem
        </Typography>
        <Typography variant="h5">{problem.prompt}</Typography>

        {problem.type === 'multiple-choice' && problem.choices?.length ? (
          <FormControl component="fieldset">
            <RadioGroup value={answer} onChange={(event) => setAnswer(event.target.value)}>
              {problem.choices.map((choice) => (
                <FormControlLabel key={choice} value={choice} control={<Radio />} label={choice} />
              ))}
            </RadioGroup>
          </FormControl>
        ) : (
          <TextField label="Your answer" value={answer} onChange={(event) => setAnswer(event.target.value)} fullWidth />
        )}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <TextField
            value={`${problem.difficulty} · ${problem.type} · ${problem.xp} XP`}
            slotProps={{ input: { readOnly: true } }}
          />
          <TextField
            value={problem.hints[0] ?? 'No hint provided'}
            label="First hint"
            slotProps={{ input: { readOnly: true } }}
            fullWidth
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <button
            style={{
              padding: '12px 18px',
              borderRadius: 999,
              border: 'none',
              background: '#5af2c9',
              color: '#08111f',
              fontWeight: 700,
              cursor: 'pointer',
            }}
            onClick={() => {
              setCorrect(isCorrect);
              setFeedback(isCorrect ? problem.explanation : problem.hints[0] ?? 'Try one smaller step.');
            }}
            disabled={!answer.trim()}
          >
            Check AI answer
          </button>
        </Stack>

        {feedback ? (
          <Alert severity={correct ? 'success' : 'info'} icon={correct ? <CheckCircleRoundedIcon /> : undefined}>
            {feedback}
          </Alert>
        ) : null}

        <Typography color="text.secondary">Solution path: {problem.solutionSteps.join(' -> ')}</Typography>
      </CardContent>
    </Card>
  );
};
