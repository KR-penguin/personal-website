"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface HeroWordmarkProps {
  lineOne: string;
  lineTwo: string;
}

const LINE_CLASS =
  "whitespace-nowrap pl-6 font-display text-[clamp(48px,11.5vw,220px)] font-black leading-[.86] tracking-[-0.04em] uppercase font-stretch-125% will-change-transform";

// Two oversized lines that drift apart as the page scrolls, with a spinning
// asterisk mark. Static when the user prefers reduced motion.
export function HeroWordmark({ lineOne, lineTwo }: HeroWordmarkProps) {
  const lineOneRef = useRef<HTMLDivElement>(null);
  const lineTwoRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<SVGSVGElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const one = lineOneRef.current;
    const two = lineTwoRef.current;
    const star = starRef.current;

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const y = window.scrollY;
      if (one) one.style.transform = `translateX(${-y * 0.35}px)`;
      if (two) two.style.transform = `translateX(${y * 0.25}px)`;
      if (star) star.style.transform = `rotate(${t * 40 + y * 0.3}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      for (const el of [one, two, star]) {
        if (el) el.style.transform = "";
      }
    };
  }, [reducedMotion]);

  return (
    <div className="overflow-hidden py-4">
      <div ref={lineOneRef} className={LINE_CLASS}>
        {lineOne}
      </div>
      <div ref={lineTwoRef} className={`flex items-center gap-[.12em] ${LINE_CLASS}`}>
        <svg
          ref={starRef}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3.2}
          strokeLinecap="square"
          className="size-[.72em] flex-none text-accent"
        >
          <path d="M12 3v18" />
          <path d="M19.8 7.5 4.2 16.5" />
          <path d="M4.2 7.5l15.6 9" />
        </svg>
        <span>{lineTwo}</span>
      </div>
    </div>
  );
}
