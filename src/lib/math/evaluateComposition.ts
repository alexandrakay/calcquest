export interface PipelineFunction {
  id: string;
  label: string;
  evaluate: (x: number) => number;
}

export interface CompositionResult {
  steps: Array<{
    functionId: string;
    input: number;
    output: number;
  }>;
  finalValue: number;
  isDomainError: boolean;
}

export const evaluateComposition = (
  functions: PipelineFunction[],
  order: string[],
  input: number,
): CompositionResult => {
  const steps: CompositionResult['steps'] = [];
  let current = input;

  for (const functionId of order) {
    const fn = functions.find((entry) => entry.id === functionId);

    if (!fn) {
      continue;
    }

    const next = fn.evaluate(current);
    steps.push({ functionId: fn.id, input: current, output: next });
    current = next;

    if (Number.isNaN(next) || !Number.isFinite(next)) {
      return {
        steps,
        finalValue: next,
        isDomainError: true,
      };
    }
  }

  return {
    steps,
    finalValue: current,
    isDomainError: false,
  };
};
