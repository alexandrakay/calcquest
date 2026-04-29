import { notFound } from 'next/navigation';
import { Container, Stack, Typography } from '@mui/material';

import { LessonExperience } from '@/components/lessons/LessonExperience';
import { courseWorldById, lessonById } from '@/data/courseMap';

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ worldId: string; lessonId: string }>;
}) {
  const { worldId, lessonId } = await params;
  const lesson = lessonById[lessonId];
  const world = courseWorldById[worldId];

  if (!lesson || !world || lesson.worldId !== world.id) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={2} mb={4}>
        <Typography variant="overline" sx={{ color: world.color }}>
          {world.title}
        </Typography>
        <Typography variant="h2">{lesson.title}</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
          {world.description}
        </Typography>
      </Stack>

      <LessonExperience lesson={lesson} />
    </Container>
  );
}
