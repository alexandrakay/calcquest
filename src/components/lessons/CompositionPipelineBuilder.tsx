'use client';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import { Alert, Box, Button, Card, CardContent, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import { evaluateComposition, type PipelineFunction } from '@/lib/math/evaluateComposition';

const functions: PipelineFunction[] = [
  {
    id: 'f',
    label: 'f(x) = x^2 + 2',
    evaluate: (x: number) => x ** 2 + 2,
  },
  {
    id: 'g',
    label: 'g(x) = sqrt(x - 2)',
    evaluate: (x: number) => Math.sqrt(x - 2),
  },
];

const orderOptions = [
  { label: '(f o g)(x)', value: ['g', 'f'] },
  { label: '(g o f)(x)', value: ['f', 'g'] },
];

export const CompositionPipelineBuilder = ({
  onSolved,
}: {
  onSolved?: (isCorrect: boolean) => void;
}) => {
  const [inputValue, setInputValue] = useState(6);
  const [selectedOrderLabel, setSelectedOrderLabel] = useState(orderOptions[0]!.label);
  const [guess, setGuess] = useState('');
  const [hintIndex, setHintIndex] = useState(0);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const selectedOrder = orderOptions.find((option) => option.label === selectedOrderLabel) ?? orderOptions[0]!;

  const result = useMemo(
    () => evaluateComposition(functions, selectedOrder.value, Number(inputValue)),
    [inputValue, selectedOrder.value],
  );

  const isCorrect = Number(guess) === result.finalValue && !result.isDomainError;

  const submit = () => {
    setHasCheckedAnswer(true);
    onSolved?.(isCorrect);
    if (!isCorrect) {
      setHintIndex((index) => Math.min(index + 1, 1));
    }
  };

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div>
          <Typography variant="h5">Pipeline Builder</Typography>
          <Typography color="text.secondary">
            Pick the function order, run the input through the chain, and predict the final output before revealing it.
          </Typography>
        </div>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            select
            label="Function order"
            value={selectedOrderLabel}
            onChange={(event) => {
              setSelectedOrderLabel(event.target.value);
              setHasCheckedAnswer(false);
            }}
            fullWidth
          >
            {orderOptions.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Input x"
            type="number"
            value={inputValue}
            onChange={(event) => {
              setInputValue(Number(event.target.value));
              setHasCheckedAnswer(false);
            }}
            fullWidth
          />
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {selectedOrder.value.map((functionId, index) => {
            const fn = functions.find((entry) => entry.id === functionId)!;
            const step = result.steps[index];

            return (
              <Box
                key={`${selectedOrderLabel}-${fn.id}`}
                sx={{
                  flex: 1,
                  p: 2.25,
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <Typography variant="overline" color="primary.main">
                  Step {index + 1}
                </Typography>
                <Typography variant="h6">{fn.label}</Typography>
                <Typography color="text.secondary">
                  {hasCheckedAnswer && step
                    ? `Input ${step.input} -> Output ${Number.isNaN(step.output) ? 'Domain error' : step.output}`
                    : 'Output hidden until you check your answer'}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        <TextField
          label="Your predicted output"
          value={guess}
          onChange={(event) => {
            setGuess(event.target.value);
            setHasCheckedAnswer(false);
          }}
          fullWidth
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button variant="contained" onClick={submit}>
            Check answer
          </Button>
          <Button
            variant="outlined"
            startIcon={<RestartAltRoundedIcon />}
            onClick={() => {
              setInputValue(6);
              setSelectedOrderLabel(orderOptions[0]!.label);
              setGuess('');
              setHintIndex(0);
              setHasCheckedAnswer(false);
            }}
          >
            Reset puzzle
          </Button>
        </Stack>

        {hasCheckedAnswer && result.isDomainError ? (
          <Alert severity="warning" icon={<ErrorRoundedIcon />}>
            This pipeline hits a domain error. That means one function received an input it cannot handle.
          </Alert>
        ) : null}

        {hasCheckedAnswer && guess ? (
          isCorrect ? (
            <Alert severity="success" icon={<CheckCircleRoundedIcon />}>
              Nice work. You respected the order of operations and the pipeline returns {result.finalValue}.
            </Alert>
          ) : (
            <Alert severity="info" icon={<TipsAndUpdatesRoundedIcon />}>
              Hint: {hintIndex === 0 ? 'Start with the inner function first.' : 'Track the output of step 1 before feeding it into step 2.'}
            </Alert>
          )
        ) : null}

        <Box sx={{ p: 2.5, borderRadius: 4, background: 'rgba(90,242,201,0.06)' }}>
          <Typography variant="subtitle1" gutterBottom>
            Plain-English explanation
          </Typography>
          <Typography color="text.secondary">
            {selectedOrder.label} means the result from the first block becomes the input to the second block. This is the same mental model as chaining utility functions in code.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
