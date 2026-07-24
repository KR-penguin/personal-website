"use client";

import { motion } from "framer-motion";
import { useEffectiveReducedMotion } from "@/hooks/useEffectiveReducedMotion";
import { useCountUp } from "./useCountUp";

interface StatCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const CARD_CLASS =
  "flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-cosmos-surface p-6 text-center";

export function StatCounter({ target, prefix = "", suffix = "", label }: StatCounterProps) {
  const { ref, value } = useCountUp(target);
  const reducedMotion = useEffectiveReducedMotion();

  const body = (
    <>
      <span className="font-display text-4xl font-bold text-cosmos-accent">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="text-sm text-cosmos-text-muted">{label}</span>
    </>
  );

  if (reducedMotion) {
    return (
      <div ref={ref} className={CARD_CLASS}>
        {body}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={CARD_CLASS}
    >
      {body}
    </motion.div>
  );
}
