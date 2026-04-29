import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';

import { WorldCard } from '@/components/game/WorldCard';
import { courseWorlds } from '@/data/courseMap';

const featureCards = [
  {
    title: 'Visual-first lessons',
    copy: 'Start with motion, graphs, and intuition before formal notation shows up.',
    icon: <QueryStatsRoundedIcon color="primary" />,
  },
  {
    title: 'Code analogies',
    copy: 'Functions, composition, rates of change, and accumulation all connect back to developer instincts.',
    icon: <CodeRoundedIcon color="primary" />,
  },
  {
    title: 'Mastery progression',
    copy: 'Short quests, fast feedback, XP, and unlockable worlds make practice feel purposeful.',
    icon: <AutoAwesomeRoundedIcon color="primary" />,
  },
];

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={8}>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="overline" color="primary.main">
              WGU calculus, rebuilt as a questline
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.8rem' }, lineHeight: 0.98, maxWidth: 760 }}>
              Learn calculus by playing, building, debugging, and leveling up.
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 2, fontSize: '1.15rem', maxWidth: 640 }}>
              CalcQuest turns static textbook topics into interactive game worlds with short lessons, code-friendly explanations, and mastery-based progression.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
              <Button component={Link} href="/login" size="large" variant="contained" endIcon={<ArrowForwardRoundedIcon />}>
                Start the quest
              </Button>
              <Button component={Link} href="/worlds" size="large" variant="outlined">
                Explore worlds
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                p: 4,
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.08)',
                background:
                  'linear-gradient(180deg, rgba(16, 28, 49, 0.92) 0%, rgba(7, 12, 22, 0.96) 100%)',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Current MVP worlds
              </Typography>
              <Stack spacing={2.5}>
                {courseWorlds.map((world) => (
                  <Box key={world.id}>
                    <Typography sx={{ color: world.color, fontWeight: 700 }}>{world.title}</Typography>
                    <Typography color="text.secondary">{world.subtitle}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {featureCards.map((feature) => (
            <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {feature.icon}
                  <Typography variant="h5">{feature.title}</Typography>
                  <Typography color="text.secondary">{feature.copy}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack spacing={2}>
          <Typography variant="h3">Course map preview</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 680 }}>
            The MVP starts with five worlds that move from function intuition into composition, limits, derivatives, and integrals.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {courseWorlds.map((world, index) => (
            <Grid key={world.id} size={{ xs: 12, md: 6, xl: 4 }}>
              <WorldCard world={world} status={index === 0 ? 'available' : 'locked'} progressPercent={0} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
