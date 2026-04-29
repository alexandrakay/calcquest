'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import Link from 'next/link';

import { MasteryMeter } from '@/components/game/MasteryMeter';
import type { CourseWorld } from '@/types/course';
import type { LessonStatus } from '@/types/progress';

interface WorldCardProps {
  world: CourseWorld;
  status: LessonStatus;
  progressPercent: number;
}

export const WorldCard = ({ world, status, progressPercent }: WorldCardProps) => {
  const locked = status === 'locked';

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="overline" sx={{ color: world.color }}>
              World {world.order}
            </Typography>
            <Typography variant="h5">{world.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {world.subtitle}
            </Typography>
          </Box>
          <Chip
            icon={locked ? <LockRoundedIcon /> : status === 'mastered' ? <VerifiedRoundedIcon /> : undefined}
            label={locked ? 'Locked' : status.replace('-', ' ')}
            sx={{ textTransform: 'capitalize' }}
          />
        </Stack>

        <Typography color="text.secondary">{world.description}</Typography>
        <MasteryMeter label="World progress" value={progressPercent} />

        <Button
          component={Link}
          href={locked ? '/worlds' : `/worlds/${world.id}`}
          variant={locked ? 'outlined' : 'contained'}
          endIcon={<ArrowForwardRoundedIcon />}
          disabled={locked}
          sx={{ mt: 'auto', alignSelf: 'flex-start' }}
        >
          {locked ? 'Finish prerequisites' : 'Enter world'}
        </Button>
      </CardContent>
    </Card>
  );
};
