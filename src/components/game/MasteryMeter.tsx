'use client';

import { LinearProgress, Stack, Typography } from '@mui/material';

export const MasteryMeter = ({ label, value }: { label: string; value: number }) => (
  <Stack spacing={1}>
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2">{value}%</Typography>
    </Stack>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 10,
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.08)',
      }}
    />
  </Stack>
);
