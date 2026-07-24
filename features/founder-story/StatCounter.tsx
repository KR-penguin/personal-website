"use client";

import { useCountUp } from "./useCountUp";

interface StatCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export function StatCounter({ target, prefix = "", suffix = "", label }: StatCounterProps) {
  const { ref, value } = useCountUp(target);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-cosmos-surface p-6 text-center"
    >
      <span className="font-display text-4xl font-bold text-cosmos-accent">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="text-sm text-cosmos-text-muted">{label}</span>
    </div>
  );
}
