'use client';

import ViewAgendaRoundedIcon from '@mui/icons-material/ViewAgendaRounded';
import { Box, Card, CardContent, Chip, Slider, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

const GRAPH_WIDTH = 520;
const GRAPH_HEIGHT = 260;
const DOMAIN_MIN = 0;
const DOMAIN_MAX = 4;
const SAMPLE_STEP = 0.04;

const curve = (x: number) => 0.5 * x ** 2 + 1;
const xToSvg = (x: number) => ((x - DOMAIN_MIN) / (DOMAIN_MAX - DOMAIN_MIN)) * GRAPH_WIDTH;
const yToSvg = (y: number) => GRAPH_HEIGHT - (y / 10) * GRAPH_HEIGHT;

const rectangleCounts = [2, 4, 8, 16];

export const AreaUnderCurveVisualizer = () => {
  const [rectangleIndex, setRectangleIndex] = useState(1);
  const rectangleCount = rectangleCounts[rectangleIndex] ?? rectangleCounts[1]!;

  const curvePoints = useMemo(() => {
    const points: string[] = [];

    for (let x = DOMAIN_MIN; x <= DOMAIN_MAX; x += SAMPLE_STEP) {
      points.push(`${xToSvg(x)},${yToSvg(curve(x))}`);
    }

    return points.join(' ');
  }, []);

  const rectangles = useMemo(() => {
    const width = (DOMAIN_MAX - DOMAIN_MIN) / rectangleCount;

    return Array.from({ length: rectangleCount }, (_, index) => {
      const x = DOMAIN_MIN + index * width;
      const height = curve(x + width / 2);
      return {
        x,
        width,
        height,
        area: height * width,
      };
    });
  }, [rectangleCount]);

  const estimatedArea = rectangles.reduce((total, rectangle) => total + rectangle.area, 0);

  const explanation =
    rectangleCount <= 4
      ? 'With only a few wide rectangles, the estimate is rough but still shows the accumulation idea.'
      : 'Smaller, thinner rectangles track the curve more closely, so the area estimate improves.';

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div>
          <Typography variant="h5">Area Under Curve Visualizer</Typography>
          <Typography color="text.secondary">
            Watch the area estimate build from rectangles. Integration starts as repeated accumulation, then gets more accurate as the slices get thinner.
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
            aria-label="Graph showing area under a curve approximated with rectangles."
          >
            <line x1="0" y1={yToSvg(0)} x2={GRAPH_WIDTH} y2={yToSvg(0)} stroke="rgba(255,255,255,0.22)" />
            <line x1={xToSvg(0)} y1="0" x2={xToSvg(0)} y2={GRAPH_HEIGHT} stroke="rgba(255,255,255,0.22)" />

            {rectangles.map((rectangle, index) => (
              <rect
                key={`${rectangleCount}-${index}`}
                x={xToSvg(rectangle.x)}
                y={yToSvg(rectangle.height)}
                width={xToSvg(rectangle.x + rectangle.width) - xToSvg(rectangle.x)}
                height={yToSvg(0) - yToSvg(rectangle.height)}
                fill="rgba(249, 199, 79, 0.28)"
                stroke="rgba(249, 199, 79, 0.8)"
                strokeWidth="1.5"
              />
            ))}

            <polyline
              fill="none"
              stroke="#f9c74f"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={curvePoints}
            />
          </svg>
        </Box>

        <Box>
          <Typography gutterBottom>Rectangle count</Typography>
          <Slider
            value={rectangleIndex}
            min={0}
            max={rectangleCounts.length - 1}
            step={1}
            marks={rectangleCounts.map((count, index) => ({
              value: index,
              label: `${count}`,
            }))}
            onChange={(_, value) => setRectangleIndex(value as number)}
            valueLabelDisplay="off"
            aria-label="Change rectangle count"
          />
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label={`interval: [0, 4]`} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Chip label={`rectangles: ${rectangleCount}`} sx={{ bgcolor: 'rgba(249,199,79,0.12)' }} />
          <Chip label={`estimated area ≈ ${estimatedArea.toFixed(2)}`} sx={{ bgcolor: 'rgba(90,242,201,0.12)' }} />
        </Stack>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 4,
            background: 'rgba(249,199,79,0.08)',
            border: '1px solid rgba(249,199,79,0.18)',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <ViewAgendaRoundedIcon color="secondary" />
            <Typography variant="subtitle1">Accumulation readout</Typography>
          </Stack>
          <Typography color="text.secondary">
            Each rectangle is one small contribution to the total. Integration is the idea of adding all of those contributions together.
          </Typography>
          <Typography sx={{ mt: 1.5 }}>{explanation}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
