'use client';

import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { Alert, Container, Stack, Typography } from '@mui/material';

import { LessonCard } from '@/components/game/LessonCard';
import type { CourseWorld } from '@/types/course';
import { useUserProgress } from '@/hooks/useUserProgress';
import { isWorldUnlocked } from '@/lib/progress/unlock';

export const WorldDetailClient = ({ world }: { world: CourseWorld }) => {
  const { snapshot } = useUserProgress();
  const unlocked = isWorldUnlocked(world.id, snapshot.lessonProgress);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={2} mb={4}>
        <Typography variant="overline" sx={{ color: world.color }}>
          World {world.order}
        </Typography>
        <Typography variant="h2">{world.title}</Typography>
        <Typography variant="h6" color="text.secondary">
          {world.subtitle}
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
          {world.description}
        </Typography>
      </Stack>

      {!unlocked ? (
        <Alert severity="warning" icon={<LockRoundedIcon />} sx={{ mb: 3 }}>
          Finish the prerequisite world before this questline unlocks.
        </Alert>
      ) : null}

      <Stack spacing={3}>
        {world.lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            status={unlocked ? snapshot.lessonProgress[lesson.id]?.status ?? 'available' : 'locked'}
          />
        ))}
      </Stack>
    </Container>
  );
};
