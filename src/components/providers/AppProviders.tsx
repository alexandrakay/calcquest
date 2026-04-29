'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

import { AuthProvider } from '@/hooks/useAuth';
import { muiTheme } from '@/theme/muiTheme';

export const AppProviders = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);
