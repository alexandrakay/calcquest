'use client';

import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import { SyncStatusCard } from '@/components/ui/SyncStatusCard';
import { courseWorlds } from '@/data/courseMap';
import { useUserProgress } from '@/hooks/useUserProgress';
import { getWorldStatus } from '@/lib/progress/unlock';

const statusLabel = (status: string) => status.replace('-', ' ');

export const ProfileProgressClient = () => {
  const { snapshot, loading, worldProgress, syncMessage, syncState } = useUserProgress();

  if (loading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const completedLessons = Object.values(snapshot.lessonProgress).filter(
    (entry) => entry.status === 'completed' || entry.status === 'mastered',
  ).length;
  const masteredLessons = Object.values(snapshot.lessonProgress).filter((entry) => entry.status === 'mastered').length;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Typography variant="overline" color="primary.main">
            Profile and progress
          </Typography>
          <Typography variant="h2">See how your calculus quest is stacking up.</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
            This page turns your current lesson-by-lesson progress into a quick snapshot of what is complete, what is mastered, and what still needs reps.
          </Typography>
        </Stack>

        <SyncStatusCard syncState={syncState} message={syncMessage} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Typography variant="h6">Total XP</Typography>
                  <EmojiEventsRoundedIcon color="secondary" />
                </Stack>
                <Typography variant="h3">{snapshot.totalXp}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Typography variant="h6">Streak</Typography>
                  <FlagRoundedIcon color="primary" />
                </Stack>
                <Typography variant="h3">{snapshot.streakCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Typography variant="h6">Completed</Typography>
                  <TaskAltRoundedIcon color="success" />
                </Stack>
                <Typography variant="h3">{completedLessons}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Typography variant="h6">Mastered</Typography>
                  <TimelineRoundedIcon color="primary" />
                </Stack>
                <Typography variant="h3">{masteredLessons}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Typography variant="h4">World summary</Typography>
            <Grid container spacing={2}>
              {courseWorlds.map((world) => {
                const worldStatus = getWorldStatus(world.id, snapshot.lessonProgress);
                const progress = worldProgress.find((entry) => entry.worldId === world.id)?.progressPercent ?? 0;

                return (
                  <Grid key={world.id} size={{ xs: 12, md: 6, xl: 4 }}>
                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        height: '100%',
                      }}
                    >
                      <Typography variant="h6">{world.title}</Typography>
                      <Typography color="text.secondary">{world.subtitle}</Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip label={`${progress}% complete`} />
                        <Chip label={statusLabel(worldStatus)} sx={{ textTransform: 'capitalize' }} variant="outlined" />
                      </Stack>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Typography variant="h4">Lesson tracker</Typography>
            <Stack spacing={2}>
              {courseWorlds.map((world) => (
                <Box key={world.id}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {world.title}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {world.lessons.map((lesson) => {
                      const lessonStatus = snapshot.lessonProgress[lesson.id]?.status ?? 'available';

                      return (
                        <Chip
                          key={lesson.id}
                          label={`${lesson.title}: ${statusLabel(lessonStatus)}`}
                          sx={{ textTransform: 'capitalize' }}
                          color={lessonStatus === 'mastered' ? 'primary' : lessonStatus === 'completed' ? 'secondary' : 'default'}
                          variant={lessonStatus === 'available' ? 'outlined' : 'filled'}
                        />
                      );
                    })}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};
