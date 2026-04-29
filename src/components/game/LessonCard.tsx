'use client';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import Link from 'next/link';

import { XpBadge } from '@/components/game/XpBadge';
import type { Lesson } from '@/types/course';
import type { LessonStatus } from '@/types/progress';

export const LessonCard = ({
  lesson,
  status,
}: {
  lesson: Lesson;
  status: LessonStatus;
}) => (
  <Card>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <div>
          <Typography variant="h6">{lesson.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {lesson.estimatedMinutes} min · {lesson.type.replace('-', ' ')}
          </Typography>
        </div>
        <XpBadge xp={lesson.xp} />
      </Stack>

      <Typography color="text.secondary">{lesson.explanation}</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {lesson.learningGoals.map((goal) => (
          <Chip key={goal} label={goal} variant="outlined" />
        ))}
      </Stack>

      <Button
        component={Link}
        href={`/worlds/${lesson.worldId}/lessons/${lesson.id}`}
        variant="contained"
        startIcon={status === 'completed' || status === 'mastered' ? <TaskAltRoundedIcon /> : <PlayArrowRoundedIcon />}
        sx={{ alignSelf: 'flex-start' }}
      >
        {status === 'completed' || status === 'mastered' ? 'Review lesson' : 'Start lesson'}
      </Button>
    </CardContent>
  </Card>
);
