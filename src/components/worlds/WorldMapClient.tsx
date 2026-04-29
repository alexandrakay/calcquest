'use client';

import { Container, Grid, Stack, Typography } from '@mui/material';

import { WorldCard } from '@/components/game/WorldCard';
import { courseWorlds } from '@/data/courseMap';
import { useUserProgress } from '@/hooks/useUserProgress';
import { getWorldStatus } from '@/lib/progress/unlock';

export const WorldMapClient = () => {
  const { snapshot, worldProgress } = useUserProgress();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={2} mb={4}>
        <Typography variant="overline" color="primary.main">
          World map
        </Typography>
        <Typography variant="h2">Choose your quest path</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 700 }}>
          Worlds unlock in sequence so the player learns the right prerequisites before the heavy symbolic material arrives.
        </Typography>
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
    </Container>
  );
};
