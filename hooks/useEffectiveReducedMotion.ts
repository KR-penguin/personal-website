"use client";

import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useSummaryMode } from "./useSummaryMode";

// Decorative animation should be suppressed both when the OS requests
// reduced motion AND when the user has manually opted into Summary Mode.
// This is the hook every animation-gating call site should use instead of
// usePrefersReducedMotion() directly.
export function useEffectiveReducedMotion(): boolean {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { summaryMode } = useSummaryMode();
  return prefersReducedMotion || summaryMode;
}
