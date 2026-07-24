"use client";

import { useEffect, type RefObject } from "react";
import { createStars, drawStarfield, stepStar } from "@/lib/starfield";
import type { Star } from "@/types/starfield";

const STAR_COUNT = 220;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const DEFAULT_DT = 1 / 60;

export function useStarfield(
  canvasRef: RefObject<HTMLCanvasElement | null>
): void {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

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

    const startAnimation = () => {
      if (frameId !== null) return;
      lastTimestamp = null;
      frameId = requestAnimationFrame(tick);
    };

    const stopAnimation = () => {
      if (frameId === null) return;
      cancelAnimationFrame(frameId);
      frameId = null;
    };

    resize();
    window.addEventListener("resize", resize);

    if (!motionQuery.matches) {
      startAnimation();
    }

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stopAnimation();
        drawStarfield(ctx, stars, width, height);
      } else {
        startAnimation();
      }
    };

    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", resize);
      motionQuery.removeEventListener("change", handleMotionChange);
      stopAnimation();
    };
  }, [canvasRef]);
}
