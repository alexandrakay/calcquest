'use client';

import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { courseWorlds } from '@/data/courseMap';

type ConfidenceLevel = 'new' | 'mixed' | 'confident';
type StudyCadence = 'steady' | 'focused' | 'sprint';

const confidenceOptions: Array<{ value: ConfidenceLevel; label: string; description: string }> = [
  {
    value: 'new',
    label: 'Need a full rebuild',
    description: 'Best if calculus feels rusty and you want a slower on-ramp.',
  },
  {
    value: 'mixed',
    label: 'I know some pieces',
    description: 'Best if you remember some concepts but want a guided refresh.',
  },
  {
    value: 'confident',
    label: 'I mainly need practice',
    description: 'Best if you want a faster pass with targeted review.',
  },
];

const cadenceOptions: Array<{ value: StudyCadence; label: string; xp: number; description: string }> = [
  {
    value: 'steady',
    label: 'Steady pace',
    xp: 60,
    description: 'Great for consistent progress without overload.',
  },
  {
    value: 'focused',
    label: 'Focused push',
    xp: 90,
    description: 'A stronger daily target for learners trying to move faster.',
  },
  {
    value: 'sprint',
    label: 'Assessment sprint',
    xp: 120,
    description: 'Best for short-term intensity before an exam or checkpoint.',
  },
];

const getRecommendedWorlds = (confidence: ConfidenceLevel) => {
  switch (confidence) {
    case 'new':
      return courseWorlds;
    case 'mixed':
      return courseWorlds.filter((world) => world.id !== 'function-foundations').length
        ? [courseWorlds[0]!, ...courseWorlds.slice(2)]
        : courseWorlds;
    case 'confident':
      return courseWorlds.filter((world) => world.id !== 'function-foundations' && world.id !== 'composition');
    default:
      return courseWorlds;
  }
};

const getStartingMessage = (confidence: ConfidenceLevel) => {
  switch (confidence) {
    case 'new':
      return 'Start with Function Factory and build your intuition from the ground up.';
    case 'mixed':
      return 'Warm up with foundations, then move quickly into limits and derivatives.';
    case 'confident':
      return 'Skip the longer ramp-up and spend your energy on core calculus worlds and practice.';
    default:
      return 'Follow the recommended quest order and keep momentum steady.';
  }
};

export const OnboardingPathBuilder = () => {
  const [confidence, setConfidence] = useState<ConfidenceLevel>('mixed');
  const [cadence, setCadence] = useState<StudyCadence>('focused');

  const selectedCadence = cadenceOptions.find((option) => option.value === cadence) ?? cadenceOptions[1]!;
  const selectedConfidence = confidenceOptions.find((option) => option.value === confidence) ?? confidenceOptions[1]!;

  const recommendedWorlds = useMemo(() => getRecommendedWorlds(confidence), [confidence]);
  const dailyXpGoal = selectedCadence.xp;
  const startingMessage = getStartingMessage(confidence);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Typography variant="overline" color="primary.main">
            Choose your quest path
          </Typography>
          <Typography variant="h2">Build a study plan that matches your current confidence.</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
            This lightweight onboarding flow turns your current comfort level and study cadence into a recommended starting sequence for the CalcQuest MVP worlds.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  select
                  label="How confident are you right now?"
                  value={confidence}
                  onChange={(event) => setConfidence(event.target.value as ConfidenceLevel)}
                  fullWidth
                >
                  {confidenceOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <Typography color="text.secondary">{selectedConfidence.description}</Typography>

                <TextField
                  select
                  label="What kind of study pace do you want?"
                  value={cadence}
                  onChange={(event) => setCadence(event.target.value as StudyCadence)}
                  fullWidth
                >
                  {cadenceOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <Typography color="text.secondary">{selectedCadence.description}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip icon={<BoltRoundedIcon />} label={`${dailyXpGoal} XP daily goal`} color="secondary" />
                  <Chip icon={<FlagRoundedIcon />} label={selectedCadence.label} variant="outlined" />
                </Stack>

                <Typography variant="h4">Recommended starting path</Typography>
                <Typography color="text.secondary">{startingMessage}</Typography>

                <Stack spacing={1.5}>
                  {recommendedWorlds.map((world, index) => (
                    <Box
                      key={world.id}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.07)',
                        background: 'rgba(255,255,255,0.03)',
                      }}
                    >
                      <Typography variant="overline" sx={{ color: world.color }}>
                        Step {index + 1}
                      </Typography>
                      <Typography variant="h6">{world.title}</Typography>
                      <Typography color="text.secondary">{world.subtitle}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    background: 'rgba(90,242,201,0.06)',
                    border: '1px solid rgba(90,242,201,0.16)',
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <RouteRoundedIcon color="primary" />
                    <Typography variant="subtitle1">Plan summary</Typography>
                  </Stack>
                  <Typography color="text.secondary">
                    Your current plan favors <strong>{selectedCadence.label.toLowerCase()}</strong> work with a daily goal of <strong>{dailyXpGoal} XP</strong>. You can start with the recommended path now, then use Practice Arena to reinforce weak spots after each world.
                  </Typography>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                  <Button component={Link} href="/login" variant="contained">
                    Start with this plan
                  </Button>
                  <Button component={Link} href="/worlds" variant="outlined">
                    Browse worlds first
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};
