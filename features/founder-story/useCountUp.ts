"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const DEFAULT_DURATION_MS = 1500;

interface UseCountUpResult {
  ref: RefObject<HTMLDivElement | null>;
  value: number;
}

// Counts 0 -> target once the returned ref scrolls into view. Renders the
// final value immediately, with no animation frame scheduled, when the user
// prefers reduced motion — and snaps to the final value if that preference
// changes live mid-animation.
export function useCountUp(
  target: number,
  durationMs: number = DEFAULT_DURATION_MS
): UseCountUpResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    const node = ref.current;
    if (!node || hasStartedRef.current) return;

    let frameId: number | null = null;
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
            frameId = requestAnimationFrame(step);
          }
        };
        frameId = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [target, durationMs, reducedMotion]);

  return { ref, value: reducedMotion ? target : value };
}
