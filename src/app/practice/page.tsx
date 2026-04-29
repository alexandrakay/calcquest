import { Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function PracticePage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Typography variant="overline" color="primary.main">
            Practice arena
          </Typography>
          <Typography variant="h3">Mixed practice is queued for the next milestone.</Typography>
          <Typography color="text.secondary">
            The MVP structure is in place, and lesson-based challenges already award XP. The next step is generating random topic drills from the same typed course data.
          </Typography>
          <Button component={Link} href="/worlds" variant="contained" sx={{ alignSelf: 'flex-start' }}>
            Return to the world map
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
