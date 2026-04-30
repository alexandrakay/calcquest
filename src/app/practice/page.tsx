import { Container } from '@mui/material';

import { PracticeArenaClient } from '@/components/practice/PracticeArenaClient';

export default function PracticePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <PracticeArenaClient />
    </Container>
  );
}
