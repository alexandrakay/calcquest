'use client';

import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import { Box, Card, CardContent, Chip, Slider, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

const TARGET_X = 2;
const CENTER_Y = 4;
const GRAPH_WIDTH = 520;
const GRAPH_HEIGHT = 260;

const evaluateLimitFunction = (x: number) => x + 2;

const xToSvg = (x: number) => ((x + 1) / 6) * GRAPH_WIDTH;
const yToSvg = (y: number) => GRAPH_HEIGHT - ((y - 0) / 8) * GRAPH_HEIGHT;

const steps = [1, 0.5, 0.1, 0.01];

export const LimitApproachVisualizer = () => {
  const [leftStepIndex, setLeftStepIndex] = useState(1);
  const [rightStepIndex, setRightStepIndex] = useState(1);

  const leftDistance = steps[leftStepIndex] ?? steps[1]!;
  const rightDistance = steps[rightStepIndex] ?? steps[1]!;
  const leftX = TARGET_X - leftDistance;
  const rightX = TARGET_X + rightDistance;
  const leftY = evaluateLimitFunction(leftX);
  const rightY = evaluateLimitFunction(rightX);

  const graphPoints = useMemo(() => {
    const values: string[] = [];

    for (let x = -1; x <= 5; x += 0.08) {
      if (Math.abs(x - TARGET_X) < 0.03) {
        continue;
      }

      values.push(`${xToSvg(x)},${yToSvg(evaluateLimitFunction(x))}`);
    }

    return values.join(' ');
  }, []);

  const conclusion =
    Math.abs(leftY - rightY) < 0.05
      ? `Both sides are settling near ${CENTER_Y}, so the two-sided limit exists and equals ${CENTER_Y}.`
      : 'The two sides are not agreeing yet, so keep moving closer to compare the trend.';

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div>
          <Typography variant="h5">Limit Approach Visualizer</Typography>
          <Typography color="text.secondary">
            Move in from the left and right toward x = 2. Watch how the nearby outputs behave, even though the graph has a hole there.
          </Typography>
        </div>

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
            aria-label="Graph of a line with a hole at x equals 2, showing left and right approach points."
          >
            <line x1="0" y1={yToSvg(0)} x2={GRAPH_WIDTH} y2={yToSvg(0)} stroke="rgba(255,255,255,0.22)" />
            <line x1={xToSvg(0)} y1="0" x2={xToSvg(0)} y2={GRAPH_HEIGHT} stroke="rgba(255,255,255,0.22)" />
            <polyline
              fill="none"
              stroke="#82aaff"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={graphPoints}
            />
            <circle
              cx={xToSvg(TARGET_X)}
              cy={yToSvg(CENTER_Y)}
              r="8"
              fill="#08111f"
              stroke="#f4f8ff"
              strokeWidth="3"
            />
            <circle cx={xToSvg(leftX)} cy={yToSvg(leftY)} r="6" fill="#5af2c9" />
            <circle cx={xToSvg(rightX)} cy={yToSvg(rightY)} r="6" fill="#ffb54d" />
            <text x={xToSvg(TARGET_X) + 10} y={yToSvg(CENTER_Y) - 12} fill="#f4f8ff" fontSize="13">
              hole at (2, 4)
            </text>
          </svg>
        </Box>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Typography gutterBottom>Approach from the left</Typography>
            <Slider
              value={leftStepIndex}
              min={0}
              max={steps.length - 1}
              step={1}
              marks={steps.map((step, index) => ({
                value: index,
                label: `${step}`,
              }))}
              onChange={(_, value) => setLeftStepIndex(value as number)}
              valueLabelDisplay="off"
              aria-label="Approach from the left"
            />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={`x = ${leftX.toFixed(2)}`} sx={{ bgcolor: 'rgba(90,242,201,0.12)' }} />
              <Chip label={`f(x) ≈ ${leftY.toFixed(2)}`} sx={{ bgcolor: 'rgba(90,242,201,0.12)' }} />
            </Stack>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography gutterBottom>Approach from the right</Typography>
            <Slider
              value={rightStepIndex}
              min={0}
              max={steps.length - 1}
              step={1}
              marks={steps.map((step, index) => ({
                value: index,
                label: `${step}`,
              }))}
              onChange={(_, value) => setRightStepIndex(value as number)}
              valueLabelDisplay="off"
              aria-label="Approach from the right"
            />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={`x = ${rightX.toFixed(2)}`} sx={{ bgcolor: 'rgba(255,181,77,0.12)' }} />
              <Chip label={`f(x) ≈ ${rightY.toFixed(2)}`} sx={{ bgcolor: 'rgba(255,181,77,0.12)' }} />
            </Stack>
          </Box>
        </Stack>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 4,
            background: 'rgba(130,170,255,0.08)',
            border: '1px solid rgba(130,170,255,0.18)',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <SwapHorizRoundedIcon color="primary" />
            <Typography variant="subtitle1">What this means</Typography>
          </Stack>
          <Typography color="text.secondary">
            As x gets closer to 2 from both sides, the outputs get closer to 4. That nearby behavior is the limit, even though the exact point at x = 2 is missing on the graph.
          </Typography>
          <Typography sx={{ mt: 1.5, fontWeight: 700 }}>{conclusion}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
