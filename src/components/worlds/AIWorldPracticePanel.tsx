'use client';

import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Alert, Card, CardContent, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import { AIGeneratedProblemCard } from '@/components/ai/AIGeneratedProblemCard';
import { GenerateProblemButton } from '@/components/ai/GenerateProblemButton';
import type { CourseWorld } from '@/types/course';
import type { AIGeneratedProblem } from '@/types/ai';

export const AIWorldPracticePanel = ({ world }: { world: CourseWorld }) => {
  const [selectedLessonId, setSelectedLessonId] = useState(world.lessons[0]?.id ?? '');
  const [generatedProblems, setGeneratedProblems] = useState<AIGeneratedProblem[]>([]);
  const [aiError, setAiError] = useState('');

  const selectedLesson = useMemo(
    () => world.lessons.find((lesson) => lesson.id === selectedLessonId) ?? world.lessons[0],
    [selectedLessonId, world.lessons],
  );

  const topic = selectedLesson
    ? `${world.title} · ${selectedLesson.title}`
    : `${world.title} practice`;

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <div>
            <Typography variant="overline" color="primary.main">
              AI practice lab
            </Typography>
            <Typography variant="h5">Generate more questions inside this world.</Typography>
            <Typography color="text.secondary">
              Spin up extra practice problems for the current world and lesson without leaving the questline.
            </Typography>
          </div>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip icon={<AutoAwesomeRoundedIcon />} label="Fresh AI-generated reps" />
            <Chip label={`${generatedProblems.length} generated this session`} variant="outlined" />
          </Stack>

          <TextField
            select
            label="Lesson focus"
            value={selectedLessonId}
            onChange={(event) => {
              setSelectedLessonId(event.target.value);
              setAiError('');
            }}
            fullWidth
          >
            {world.lessons.map((lesson) => (
              <MenuItem key={lesson.id} value={lesson.id}>
                {lesson.title}
              </MenuItem>
            ))}
          </TextField>

          <GenerateProblemButton
            worldId={world.id}
            lessonId={selectedLesson?.id}
            topic={topic}
            buttonLabel="Generate world question"
            onGenerated={(problem) => {
              setGeneratedProblems((current) => [problem, ...current]);
              setAiError('');
            }}
            onError={setAiError}
          />

          {aiError ? <Alert severity="warning">{aiError}</Alert> : null}
        </CardContent>
      </Card>

      {generatedProblems.map((problem) => (
        <AIGeneratedProblemCard key={problem.id} problem={problem} />
      ))}
    </Stack>
  );
};
