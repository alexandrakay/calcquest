'use client';

import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/worlds', label: 'Worlds' },
  { href: '/practice', label: 'Practice' },
];

export const AppShell = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(8, 17, 31, 0.78)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2, minHeight: 80 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 3,
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(135deg, rgba(90,242,201,0.25), rgba(130,170,255,0.25))',
                border: '1px solid rgba(90,242,201,0.25)',
              }}
            >
              <RocketLaunchRoundedIcon color="primary" />
            </Box>
            <Box>
              <Typography variant="h6">CalcQuest</Typography>
              <Typography variant="body2" color="text.secondary">
                Learn calculus by debugging ideas.
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color={pathname.startsWith(item.href) ? 'primary' : 'inherit'}
                startIcon={item.href === '/worlds' ? <SportsEsportsRoundedIcon /> : <MenuBookRoundedIcon />}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          {user ? (
            <Button variant="outlined" onClick={() => void logout()}>
              Log out
            </Button>
          ) : (
            <Button component={Link} href="/login" variant="contained">
              Sign in
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
