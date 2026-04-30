'use client';

import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { Box, Card, CardContent, Chip, MenuItem, Slider, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

const GRAPH_WIDTH = 520;
const GRAPH_HEIGHT = 260;
const DOMAIN_MIN = -3;
const DOMAIN_MAX = 3;
const SAMPLE_STEP = 0.08;

const scenarios = {
  parabola: {
    id: 'parabola',
    label: 'Parabola',
    description: 'This smooth U-shape has a flat tangent at the bottom and positive or negative slopes on either side.',
    curve: (x: number) => x ** 2 - 1,
    derivative: (x: number) => 2 * x,
    stroke: '#ff8a65',
  },
  cubic: {
    id: 'cubic',
    label: 'Cubic wave',
    description: 'This curve bends through the center so you can see slope change from positive to nearly flat and back again.',
    curve: (x: number) => (x ** 3) / 3 - x,
    derivative: (x: number) => x ** 2 - 1,
    stroke: '#82aaff',
  },
} as const;

type ScenarioKey = keyof typeof scenarios;

const xToSvg = (x: number) => ((x - DOMAIN_MIN) / (DOMAIN_MAX - DOMAIN_MIN)) * GRAPH_WIDTH;
const yToSvg = (y: number) => GRAPH_HEIGHT - ((y + 2) / 8) * GRAPH_HEIGHT;

const getSlopeLabel = (slope: number) => {
  if (Math.abs(slope) < 0.15) {
    return 'zero';
  }

  return slope > 0 ? 'positive' : 'negative';
};

export const TangentLineExplorer = () => {
  const [scenarioKey, setScenarioKey] = useState<ScenarioKey>('parabola');
  const [xValue, setXValue] = useState(1.5);
  const scenario = scenarios[scenarioKey];

  const yValue = scenario.curve(xValue);
  const slope = scenario.derivative(xValue);
  const slopeLabel = getSlopeLabel(slope);

  const curvePoints = useMemo(() => {
    const points: string[] = [];

    for (let x = DOMAIN_MIN; x <= DOMAIN_MAX; x += SAMPLE_STEP) {
      points.push(`${xToSvg(x)},${yToSvg(scenario.curve(x))}`);
    }

    return points.join(' ');
  }, [scenario]);

  const tangentLine = useMemo(() => {
    const x1 = DOMAIN_MIN;
    const x2 = DOMAIN_MAX;
    const y1 = yValue + slope * (x1 - xValue);
    const y2 = yValue + slope * (x2 - xValue);

    return {
      x1: xToSvg(x1),
      y1: yToSvg(y1),
      x2: xToSvg(x2),
      y2: yToSvg(y2),
    };
  }, [slope, xValue, yValue]);

  const slopeExplanation =
    slopeLabel === 'positive'
      ? 'The tangent rises as you move to the right, so the derivative is positive here.'
      : slopeLabel === 'negative'
        ? 'The tangent falls as you move to the right, so the derivative is negative here.'
        : 'The tangent is nearly flat here, so the derivative is approximately zero.';

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div>
          <Typography variant="h5">Tangent Line Explorer</Typography>
          <Typography color="text.secondary">
            Slide the point along the curve and watch the tangent line respond. This is the derivative acting like a real-time slope meter.
          </Typography>
        </div>

        <TextField
          select
          label="Curve scenario"
          value={scenarioKey}
          onChange={(event) => setScenarioKey(event.target.value as ScenarioKey)}
          fullWidth
        >
          {Object.values(scenarios).map((entry) => (
            <MenuItem key={entry.id} value={entry.id}>
              {entry.label}
            </MenuItem>
          ))}
        </TextField>

        <Typography color="text.secondary">{scenario.description}</Typography>

        <Box
          sx={{
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
            p: 2,
            overflowX: 'auto',
          }}
        >
          <svg
            viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
            width="100%"
            height="260"
            role="img"
            aria-label="Parabola with a movable point and tangent line showing derivative slope."
          >
            <line x1="0" y1={yToSvg(0)} x2={GRAPH_WIDTH} y2={yToSvg(0)} stroke="rgba(255,255,255,0.22)" />
            <line x1={xToSvg(0)} y1="0" x2={xToSvg(0)} y2={GRAPH_HEIGHT} stroke="rgba(255,255,255,0.22)" />
            <polyline
              fill="none"
              stroke={scenario.stroke}
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={curvePoints}
            />
            <line
              x1={tangentLine.x1}
              y1={tangentLine.y1}
              x2={tangentLine.x2}
              y2={tangentLine.y2}
              stroke="#5af2c9"
              strokeWidth="3"
              strokeDasharray="10 8"
            />
            <circle cx={xToSvg(xValue)} cy={yToSvg(yValue)} r="7" fill="#f4f8ff" stroke="#08111f" strokeWidth="2" />
            <text x={xToSvg(xValue) + 10} y={yToSvg(yValue) - 12} fill="#f4f8ff" fontSize="13">
              active point
            </text>
          </svg>
        </Box>

        <Box>
          <Typography gutterBottom>Move along the curve</Typography>
          <Slider
            value={xValue}
            min={DOMAIN_MIN}
            max={DOMAIN_MAX}
            step={0.1}
            marks={[
              { value: -2, label: '-2' },
              { value: 0, label: '0' },
              { value: 2, label: '2' },
            ]}
            onChange={(_, value) => setXValue(value as number)}
            valueLabelDisplay="auto"
            aria-label="Move point along curve"
          />
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label={scenario.label} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Chip label={`x = ${xValue.toFixed(1)}`} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Chip label={`f(x) = ${yValue.toFixed(2)}`} sx={{ bgcolor: 'rgba(255,138,101,0.12)' }} />
          <Chip label={`slope ≈ ${slope.toFixed(2)}`} sx={{ bgcolor: 'rgba(90,242,201,0.12)' }} />
        </Stack>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 4,
            background: 'rgba(255,138,101,0.08)',
            border: '1px solid rgba(255,138,101,0.18)',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            {slopeLabel === 'positive' ? (
              <TrendingUpRoundedIcon color="secondary" />
            ) : slopeLabel === 'negative' ? (
              <TrendingDownRoundedIcon color="secondary" />
            ) : (
              <TrendingFlatRoundedIcon color="secondary" />
            )}
            <Typography variant="subtitle1">Derivative readout</Typography>
          </Stack>
          <Typography color="text.secondary">{slopeExplanation}</Typography>
          <Typography sx={{ mt: 1.5, fontWeight: 700, textTransform: 'capitalize' }}>
            Slope classification: {slopeLabel}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
