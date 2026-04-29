'use client';

import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5af2c9',
    },
    secondary: {
      main: '#ffb54d',
    },
    background: {
      default: '#08111f',
      paper: '#101c31',
    },
    text: {
      primary: '#f4f8ff',
      secondary: '#a8b6d6',
    },
  },
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: '"Avenir Next", "Segoe UI", "Trebuchet MS", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage:
            'linear-gradient(180deg, rgba(20,30,55,0.98) 0%, rgba(10,16,30,0.98) 100%)',
          border: '1px solid rgba(117, 240, 255, 0.14)',
          boxShadow: '0 18px 50px rgba(0, 0, 0, 0.28)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
        },
      },
    },
  },
});
