import { Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Stack spacing={2} textAlign="center">
        <Typography variant="h2">Quest node not found</Typography>
        <Typography color="text.secondary">
          That lesson or world does not exist in the current build.
        </Typography>
        <Button component={Link} href="/" variant="contained">
          Back to home
        </Button>
      </Stack>
    </Container>
  );
}
