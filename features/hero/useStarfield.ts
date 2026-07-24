"use client";

import { useEffect, useRef, type RefObject } from "react";
import { createStars, drawStarfield, stepStar } from "@/lib/starfield";
import type { Star } from "@/types/starfield";
import { useEffectiveReducedMotion } from "@/hooks/useEffectiveReducedMotion";

const STAR_COUNT = 220;
const DEFAULT_DT = 1 / 60;

interface StarfieldRuntime {
  start: () => void;
  stop: () => void;
}

export function useStarfield(
  canvasRef: RefObject<HTMLCanvasElement | null>
): void {
  const reducedMotion = useEffectiveReducedMotion();
  const runtimeRef = useRef<StarfieldRuntime | null>(null);

  // Set up the canvas, resize handling, and the render loop once per canvas
  // mount. Starting/stopping the loop itself is driven by a separate effect
  // below so toggling reduced motion doesn't recreate/reposition the stars.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frameId: number | null = null;
    let lastTimestamp: number | null = null;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = createStars(STAR_COUNT, width, height);
      drawStarfield(ctx, stars, width, height);
    };

    const tick = (timestamp: number) => {
      const dt =
        lastTimestamp === null ? DEFAULT_DT : (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      stars = stars.map((star) => stepStar(star, width, height, dt));
      drawStarfield(ctx, stars, width, height);
      frameId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frameId !== null) return;
      lastTimestamp = null;
      frameId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (frameId === null) return;
      cancelAnimationFrame(frameId);
      frameId = null;
      drawStarfield(ctx, stars, width, height);
    };

    resize();
    window.addEventListener("resize", resize);
    runtimeRef.current = { start, stop };

    return () => {
      window.removeEventListener("resize", resize);
      if (frameId !== null) cancelAnimationFrame(frameId);
      runtimeRef.current = null;
    };
  }, [canvasRef]);

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!runtime) return;

    if (reducedMotion) {
      runtime.stop();
    } else {
      runtime.start();
    }
  }, [reducedMotion]);
}
