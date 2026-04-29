'use client';

import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import { Chip } from '@mui/material';

export const StreakBadge = ({ streak }: { streak: number }) => (
  <Chip
    icon={<LocalFireDepartmentRoundedIcon />}
    label={`${streak}-day streak`}
    color="primary"
    variant="outlined"
    sx={{ fontWeight: 700 }}
  />
);
