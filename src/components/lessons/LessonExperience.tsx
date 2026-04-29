'use client';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PlayLessonRoundedIcon from '@mui/icons-material/PlayLessonRounded';
import { Alert, Box, Button, Card, CardContent, Chip, Grid, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import { CompositionPipelineBuilder } from '@/components/lessons/CompositionPipelineBuilder';
import { XpBadge } from '@/components/game/XpBadge';
import { useUserProgress } from '@/hooks/useUserProgress';
import { getChallengeXp } from '@/lib/progress/xp';
import type { Lesson } from '@/types/course';

export const LessonExperience = ({ lesson }: { lesson: Lesson }) => {
  const { snapshot, upsertProgress } = useUserProgress();
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const primaryChallenge = lesson.challenges[0];
  const lessonStatus = snapshot.lessonProgress[lesson.id]?.status ?? 'available';

  const isAnswerCorrect = useMemo(() => {
    if (!primaryChallenge) {
      return false;
    }

    if (typeof primaryChallenge.correctAnswer === 'number') {
      return Number(answer) === primaryChallenge.correctAnswer;
    }

    return answer.trim().toLowerCase() === String(primaryChallenge.correctAnswer).trim().toLowerCase();
  }, [answer, primaryChallenge]);

  const submitChallenge = async () => {
    if (!primaryChallenge) {
      return;
    }

    const success = isAnswerCorrect;
    setCorrect(success);
    setFeedback(success ? primaryChallenge.explanation : primaryChallenge.hints[0] ?? 'Try one smaller step.');
    await upsertProgress(lesson, success, success ? getChallengeXp(primaryChallenge) : 0);
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 7 }}>
        <Stack spacing={3}>
          <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
                <Chip label={lesson.type.replace('-', ' ')} color="primary" variant="outlined" />
                <Chip label={`${lesson.estimatedMinutes} min`} variant="outlined" />
                <XpBadge xp={lesson.xp} />
              </Stack>

              <Typography variant="h3">{lesson.title}</Typography>
              <Typography color="text.secondary">{lesson.explanation}</Typography>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Visual intuition
                </Typography>
                <Stack spacing={1}>
                  {lesson.learningGoals.map((goal) => (
                    <Typography key={goal}>• {goal}</Typography>
                  ))}
                </Stack>
              </Box>

              {lesson.devAnalogy ? (
                <Box sx={{ p: 2.5, borderRadius: 4, background: 'rgba(130,170,255,0.08)' }}>
                  <Typography variant="h6" gutterBottom>
                    Dev analogy
                  </Typography>
                  <Typography color="text.secondary">{lesson.devAnalogy}</Typography>
                </Box>
              ) : null}

              <Box>
                <Typography variant="h6" gutterBottom>
                  Worked example
                </Typography>
                {lesson.examples.map((example) => (
                  <Box key={example.title} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{example.title}</Typography>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>
                      {example.prompt}
                    </Typography>
                    <Stack spacing={0.75}>
                      {example.steps.map((step) => (
                        <Typography key={step}>• {step}</Typography>
                      ))}
                    </Stack>
                    <Typography sx={{ mt: 1.5 }}>Answer: {example.answer}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {lesson.id === 'composition-basics' ? (
            <CompositionPipelineBuilder
              onSolved={(success) => {
                const challenge = lesson.challenges[0];
                if (!challenge) {
                  return;
                }

                setCorrect(success);
                setFeedback(success ? challenge.explanation : challenge.hints[0] ?? 'Try again.');
                void upsertProgress(lesson, success, success ? getChallengeXp(challenge) : 0);
              }}
            />
          ) : null}
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }}>
        <Stack spacing={3}>
          <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h5">Mastery checkpoint</Typography>
              <Typography color="text.secondary">
                Complete the challenge to lock in the lesson and push your world progress forward.
              </Typography>

              {primaryChallenge ? (
                <>
                  <Typography fontWeight={700}>{primaryChallenge.prompt}</Typography>
                  <TextField
                    label="Your answer"
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    startIcon={<PlayLessonRoundedIcon />}
                    onClick={() => void submitChallenge()}
                  >
                    Submit challenge
                  </Button>
                </>
              ) : null}

              {feedback ? (
                <Alert severity={correct ? 'success' : 'info'} icon={correct ? <CheckCircleRoundedIcon /> : undefined}>
                  {feedback}
                </Alert>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="h6">Lesson status</Typography>
              <Typography sx={{ textTransform: 'capitalize' }}>{lessonStatus.replace('-', ' ')}</Typography>
              <Typography color="text.secondary">Progress is stored locally now and syncs to Firestore when configured.</Typography>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};
