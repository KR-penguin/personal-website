"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const DEFAULT_DURATION_MS = 1500;

interface UseCountUpResult {
  ref: RefObject<HTMLDivElement | null>;
  value: number;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// Counts 0 -> target once the returned ref scrolls into view. Renders the
// final value immediately, with no animation frame scheduled, when the user
// prefers reduced motion.
export function useCountUp(
  target: number,
  durationMs: number = DEFAULT_DURATION_MS
): UseCountUpResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasStartedRef.current) return;
        hasStartedRef.current = true;
        observer.disconnect();

        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / durationMs, 1);
          setValue(Math.round(target * progress));
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, durationMs]);

  return { ref, value };
}
