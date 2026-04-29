import { describe, expect, it } from 'vitest';

import { evaluateComposition } from '@/lib/math/evaluateComposition';

const functions = [
  { id: 'f', label: 'f(x) = x^2 + 2', evaluate: (x: number) => x ** 2 + 2 },
  { id: 'g', label: 'g(x) = sqrt(x - 2)', evaluate: (x: number) => Math.sqrt(x - 2) },
];

describe('evaluateComposition', () => {
  it('evaluates fog in the correct order', () => {
    const result = evaluateComposition(functions, ['g', 'f'], 6);
    expect(result.finalValue).toBe(6);
    expect(result.isDomainError).toBe(false);
  });

  it('flags a domain error when sqrt receives an invalid input', () => {
    const result = evaluateComposition(functions, ['g', 'f'], 1);
    expect(result.isDomainError).toBe(true);
  });
});
