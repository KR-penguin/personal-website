"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface PrincipleCardProps {
  title: string;
  explanation: string;
}

export function PrincipleCard({ title, explanation }: PrincipleCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const body = (
    <>
      <h3 className="font-display text-xl font-semibold text-cosmos-accent-secondary">
        {title}
      </h3>
      <p className="mt-2 text-base text-cosmos-text-muted">{explanation}</p>
    </>
  );

  if (prefersReducedMotion) {
    return (
      <div className="rounded-2xl border border-white/10 bg-cosmos-surface p-6">{body}</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-2xl border border-white/10 bg-cosmos-surface p-6"
    >
      {body}
    </motion.div>
  );
}
