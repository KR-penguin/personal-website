"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MarqueeProps {
  text: string;
  /** Pixels per second; negative scrolls left, positive scrolls right. */
  speed: number;
  className?: string;
  trackClassName?: string;
}

// Decorative ticker strip. The text is rendered twice back to back and the
// track is shifted by up to half its width, so wrapping around is seamless.
export function Marquee({ text, speed, className = "", trackClassName = "" }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion) return;

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const half = track.scrollWidth / 2 || 1;
      let x = (((now - start) / 1000) * speed) % half;
      if (x > 0) x -= half;
      track.style.transform = `translateX(${x}px)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      track.style.transform = "";
    };
  }, [speed, reducedMotion]);

  return (
    <div aria-hidden="true" className={`overflow-hidden py-1.5 ${className}`}>
      <div
        ref={trackRef}
        data-testid="marquee-track"
        className={`whitespace-nowrap text-xs tracking-[.35em] will-change-transform ${trackClassName}`}
      >
        {text}
        {text}
      </div>
    </div>
  );
}
