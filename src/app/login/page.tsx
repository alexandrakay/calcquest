import { Container, Stack, Typography } from '@mui/material';

import { AuthForm } from '@/components/auth/AuthForm';

export default function LoginPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={3} textAlign="center" mb={4}>
        <Typography variant="overline" color="primary.main">
          Auth checkpoint
        </Typography>
        <Typography variant="h2">Save progress, unlock worlds, and keep your streak alive.</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 620, mx: 'auto' }}>
          If Firebase environment variables are missing, the app automatically falls back to a local demo mode so you can still explore the MVP end to end.
        </Typography>
      </Stack>
      <AuthForm />
    </Container>
  );
}
