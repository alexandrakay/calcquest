'use client';

import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import { Chip } from '@mui/material';

export const XpBadge = ({ xp }: { xp: number }) => (
  <Chip
    icon={<BoltRoundedIcon />}
    label={`${xp} XP`}
    color="secondary"
    sx={{ fontWeight: 700 }}
  />
);
