"use client";

import { useMemo, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  MAX_X,
  MIN_X,
  accurateInverseSqrt,
  clampX,
  fastInverseSqrt,
  floatToBits,
  magicReinterpretBits,
  relativeErrorPercent,
  type BitBreakdown,
  type IterationCount,
} from "./logic";

const DEFAULT_X = 2;

interface UseFastInverseSqrtLabResult {
  x: number;
  setX: (next: number) => void;
  iterations: IterationCount;
  setIterations: (next: IterationCount) => void;
  accurate: number;
  fast: number;
  errorPercent: number;
  inputBits: BitBreakdown;
  reinterpretedBits: BitBreakdown;
  prefersReducedMotion: boolean;
  minX: number;
  maxX: number;
}

export function useFastInverseSqrtLab(): UseFastInverseSqrtLabResult {
  const [x, setXState] = useState(DEFAULT_X);
  const [iterations, setIterations] = useState<IterationCount>(1);
  const prefersReducedMotion = usePrefersReducedMotion();

  const setX = (next: number) => setXState(clampX(next));

  const derived = useMemo(() => {
    const accurate = accurateInverseSqrt(x);
    const fast = fastInverseSqrt(x, iterations);
    return {
      accurate,
      fast,
      errorPercent: relativeErrorPercent(fast, accurate),
      inputBits: floatToBits(x),
      reinterpretedBits: magicReinterpretBits(x),
    };
  }, [x, iterations]);

  return {
    x,
    setX,
    iterations,
    setIterations,
    prefersReducedMotion,
    minX: MIN_X,
    maxX: MAX_X,
    ...derived,
  };
}
