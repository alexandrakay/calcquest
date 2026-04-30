'use client';

import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';
import CloudOffRoundedIcon from '@mui/icons-material/CloudOffRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import { Alert, AlertTitle } from '@mui/material';

type SyncState = 'cloud' | 'local' | 'guest';

const syncConfig: Record<
  SyncState,
  {
    severity: 'success' | 'warning' | 'info';
    title: string;
    icon: React.ReactNode;
  }
> = {
  cloud: {
    severity: 'success',
    title: 'Cloud sync active',
    icon: <CloudDoneRoundedIcon fontSize="inherit" />,
  },
  local: {
    severity: 'warning',
    title: 'Local-only progress',
    icon: <CloudOffRoundedIcon fontSize="inherit" />,
  },
  guest: {
    severity: 'info',
    title: 'Guest mode',
    icon: <PersonOutlineRoundedIcon fontSize="inherit" />,
  },
};

export const SyncStatusCard = ({
  syncState,
  message,
}: {
  syncState: SyncState;
  message: string | null;
}) => {
  if (!message) {
    return null;
  }

  const config = syncConfig[syncState];

  return (
    <Alert
      severity={config.severity}
      icon={config.icon}
      sx={{
        borderRadius: 3,
        alignItems: 'flex-start',
      }}
    >
      <AlertTitle>{config.title}</AlertTitle>
      {message}
    </Alert>
  );
};
