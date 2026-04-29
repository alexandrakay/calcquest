import { Card, CardContent, Container, Stack, Typography } from '@mui/material';

export default function ProfilePage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="overline" color="primary.main">
              Profile
            </Typography>
            <Typography variant="h3">Profile analytics can land in the next pass.</Typography>
            <Typography color="text.secondary">
              The current MVP already tracks total XP and lesson completion status through the shared progress layer.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
