'use client';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

import { courseWorlds } from '@/data/courseMap';
import { XpBadge } from '@/components/game/XpBadge';
import type { Challenge, CourseWorld, Lesson } from '@/types/course';

interface PracticeChallenge {
  world: CourseWorld;
  lesson: Lesson;
  challenge: Challenge;
}

const buildPracticePool = (worldId: string): PracticeChallenge[] =>
  courseWorlds
    .filter((world) => worldId === 'all' || world.id === worldId)
    .flatMap((world) =>
      world.lessons.flatMap((lesson) =>
        lesson.challenges.map((challenge) => ({
          world,
          lesson,
          challenge,
        })),
      ),
    );

export const PracticeArenaClient = () => {
  const [selectedWorldId, setSelectedWorldId] = useState<'all' | CourseWorld['id']>('all');
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const practicePool = useMemo(() => buildPracticePool(selectedWorldId), [selectedWorldId]);
  const currentEntry = practicePool[challengeIndex % Math.max(practicePool.length, 1)];

  const submitAnswer = () => {
    if (!currentEntry) {
      return;
    }

    const { challenge } = currentEntry;
    const isCorrect =
      typeof challenge.correctAnswer === 'number'
        ? Number(answer) === challenge.correctAnswer
        : answer.trim().toLowerCase() === String(challenge.correctAnswer).trim().toLowerCase();

    setCorrect(isCorrect);
    setFeedback(isCorrect ? challenge.explanation : challenge.hints[0] ?? 'Try one smaller step.');
  };

  const nextChallenge = () => {
    setChallengeIndex((index) => index + 1);
    setAnswer('');
    setFeedback(null);
    setCorrect(null);
  };

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <div>
            <Typography variant="overline" color="primary.main">
              Practice arena
            </Typography>
            <Typography variant="h3">Train across worlds without leaving the arena.</Typography>
            <Typography color="text.secondary">
              Reuse existing lesson challenges to review the exact ideas you have already unlocked in the questline.
            </Typography>
          </div>

          <TextField
            select
            label="Practice topic"
            value={selectedWorldId}
            onChange={(event) => {
              setSelectedWorldId(event.target.value as 'all' | CourseWorld['id']);
              setChallengeIndex(0);
              setAnswer('');
              setFeedback(null);
              setCorrect(null);
            }}
            fullWidth
          >
            <MenuItem value="all">All MVP worlds</MenuItem>
            {courseWorlds.map((world) => (
              <MenuItem key={world.id} value={world.id}>
                {world.title}
              </MenuItem>
            ))}
          </TextField>
        </CardContent>
      </Card>

      {currentEntry ? (
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip icon={<SchoolRoundedIcon />} label={currentEntry.world.title} />
              <Chip label={currentEntry.lesson.title} variant="outlined" />
              <Chip label={currentEntry.challenge.difficulty} sx={{ textTransform: 'capitalize' }} />
              <XpBadge xp={currentEntry.challenge.xp} />
            </Stack>

            <Typography variant="h5">{currentEntry.challenge.prompt}</Typography>

            {currentEntry.challenge.type === 'multiple-choice' && currentEntry.challenge.choices?.length ? (
              <FormControl component="fieldset">
                <RadioGroup value={answer} onChange={(event) => setAnswer(event.target.value)}>
                  {currentEntry.challenge.choices.map((choice) => (
                    <FormControlLabel
                      key={choice}
                      value={choice}
                      control={<Radio />}
                      label={choice}
                      sx={{
                        mx: 0,
                        my: 0.25,
                        px: 1.5,
                        py: 1,
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.08)',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ) : (
              <TextField
                label="Your answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                fullWidth
              />
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button variant="contained" onClick={submitAnswer} disabled={!answer.trim()}>
                Check answer
              </Button>
              <Button variant="outlined" startIcon={<RefreshRoundedIcon />} onClick={nextChallenge}>
                Next challenge
              </Button>
            </Stack>

            {feedback ? (
              <Alert severity={correct ? 'success' : 'info'} icon={correct ? <CheckCircleRoundedIcon /> : undefined}>
                {feedback}
              </Alert>
            ) : null}

            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Practice tip
              </Typography>
              <Typography color="text.secondary">
                Try to explain the answer to yourself before checking it. The arena is strongest when you treat each prompt like a mini debug session for your math intuition.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Alert severity="info">No practice challenges are available for that topic yet.</Alert>
      )}
    </Stack>
  );
};
