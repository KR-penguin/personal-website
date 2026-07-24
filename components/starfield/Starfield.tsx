"use client";

import { useRef } from "react";
import { useStarfield } from "@/features/hero/useStarfield";

interface StarfieldProps {
  className?: string;
}

export function Starfield({ className }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useStarfield(canvasRef);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
