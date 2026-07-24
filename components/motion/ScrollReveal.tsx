"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useEffectiveReducedMotion } from "@/hooks/useEffectiveReducedMotion";

type ScrollRevealElement = "div" | "li" | "p";

interface ScrollRevealProps {
  children: ReactNode;
  as?: ScrollRevealElement;
  className?: string;
  /** Stagger delay in seconds, e.g. index * 0.05 for a list. */
  delay?: number;
}

// Shared scroll-entrance treatment reused across sections, matching
// PrincipleCard's fade/slide-up params exactly. Falls back to an instant
// static render (today's behavior) under reduced motion / Summary Mode.
export function ScrollReveal({ children, as = "div", className, delay = 0 }: ScrollRevealProps) {
  const reducedMotion = useEffectiveReducedMotion();

  if (reducedMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const motionProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
    className,
  };

  if (as === "li") {
    return <motion.li {...motionProps}>{children}</motion.li>;
  }
  if (as === "p") {
    return <motion.p {...motionProps}>{children}</motion.p>;
  }
  return <motion.div {...motionProps}>{children}</motion.div>;
}
