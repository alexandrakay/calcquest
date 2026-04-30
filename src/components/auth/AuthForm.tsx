'use client';

import GoogleIcon from '@mui/icons-material/Google';
import { Alert, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

export const AuthForm = () => {
  const router = useRouter();
  const { login, loginWithGoogle, register, user, loading } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [loading, router, user]);

  const submit = async () => {
    try {
      setSubmitting(true);
      setError(null);
      if (isRegisterMode) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      router.push('/dashboard');
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : 'Unable to sign in right now.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitGoogle = async () => {
    try {
      setSubmitting(true);
      setError(null);
      const mode = await loginWithGoogle();

      if (mode === 'popup' || mode === 'demo') {
        router.push('/dashboard');
        return;
      }

      setError('Redirecting to Google sign-in...');
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : 'Unable to sign in with Google. Check that Google Auth is enabled in Firebase.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 520, mx: 'auto' }}>
      <CardContent sx={{ p: 4 }}>
        <Stack spacing={2.5}>
          <div>
            <Typography variant="overline" color="primary.main">
              {isRegisterMode ? 'Create your quest profile' : 'Resume your quest'}
            </Typography>
            <Typography variant="h4">{isRegisterMode ? 'Start learning with momentum' : 'Sign in to keep your progress'}</Typography>
          </div>

          {error ? <Alert severity="error">{error}</Alert> : null}

          {isRegisterMode ? (
            <TextField
              label="Display name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              fullWidth
            />
          ) : null}

          <TextField label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />

          <Button onClick={() => void submit()} variant="contained" size="large" disabled={submitting}>
            {isRegisterMode ? 'Create account' : 'Sign in'}
          </Button>
          <Button onClick={() => void submitGoogle()} variant="outlined" startIcon={<GoogleIcon />} disabled={submitting}>
            Continue with Google
          </Button>
          <Button color="inherit" onClick={() => setIsRegisterMode((value) => !value)}>
            {isRegisterMode ? 'Already have an account? Sign in' : 'Need an account? Create one'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
