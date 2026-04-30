'use client';

import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { MasteryMeter } from '@/components/game/MasteryMeter';
import { StreakBadge } from '@/components/game/StreakBadge';
import { WorldCard } from '@/components/game/WorldCard';
import { SyncStatusCard } from '@/components/ui/SyncStatusCard';
import { courseWorlds } from '@/data/courseMap';
import { useAuth } from '@/hooks/useAuth';
import { useUserProgress } from '@/hooks/useUserProgress';
import { getWorldStatus } from '@/lib/progress/unlock';

export const DashboardClient = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { snapshot, loading: progressLoading, worldProgress, syncMessage, syncState } = useUserProgress();

  const nextLesson = useMemo(() => {
    for (const world of courseWorlds) {
      for (const lesson of world.lessons) {
        const status = snapshot.lessonProgress[lesson.id]?.status;
        if (!status || status === 'available' || status === 'in-progress') {
          return lesson;
        }
      }
    }

    return courseWorlds.at(-1)?.lessons.at(-1) ?? null;
  }, [snapshot.lessonProgress]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login');
    }
  }, [authLoading, router, user]);

  if (authLoading || progressLoading) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small" component={Link} href="/login">
              Sign in
            </Button>
          }
        >
          Sign in to save XP, streaks, and world mastery to Firebase or local demo mode.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <SyncStatusCard syncState={syncState} message={syncMessage} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ overflow: 'hidden' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="overline" color="primary.main">
                  Quest dashboard
                </Typography>
                <Typography variant="h3" sx={{ maxWidth: 560, mb: 1 }}>
                  Welcome back{user.displayName ? `, ${user.displayName}` : ''}. Your next checkpoint is ready.
                </Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 620, mb: 3 }}>
                  Progress is tracked lesson by lesson, with worlds unlocking as you build the right intuition.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
                  <Button component={Link} href={nextLesson ? `/worlds/${nextLesson.worldId}/lessons/${nextLesson.id}` : '/worlds'} variant="contained">
                    Continue next lesson
                  </Button>
                  <Button component={Link} href="/worlds" variant="outlined">
                    View world map
                  </Button>
                  <StreakBadge streak={snapshot.streakCount} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                    <Typography variant="h6">XP Bank</Typography>
                    <EmojiEventsRoundedIcon color="secondary" />
                  </Stack>
                  <Typography variant="h3">{snapshot.totalXp}</Typography>
                  <Typography color="text.secondary">Total XP earned across lessons and mastery bonuses.</Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                    <Typography variant="h6">Daily Goal</Typography>
                    <AutoGraphRoundedIcon color="primary" />
                  </Stack>
                  <MasteryMeter
                    label={`${snapshot.dailyXpGoal} XP target`}
                    value={Math.min(100, Math.round((snapshot.totalXp / snapshot.dailyXpGoal) * 100))}
                  />
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <div>
            <Typography variant="h4">World Progress</Typography>
            <Typography color="text.secondary">Five MVP worlds, each structured like a playable calculus quest.</Typography>
          </div>
          <Button component={Link} href="/worlds" startIcon={<GridViewRoundedIcon />} variant="outlined">
            Open map
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {courseWorlds.map((world) => (
            <Grid key={world.id} size={{ xs: 12, md: 6, xl: 4 }}>
              <WorldCard
                world={world}
                status={getWorldStatus(world.id, snapshot.lessonProgress)}
                progressPercent={worldProgress.find((entry) => entry.worldId === world.id)?.progressPercent ?? 0}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};
