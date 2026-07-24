"use client";

import { useEffect, useRef } from "react";
import type { Grid } from "./logic";
import { renderGridToCanvas } from "./renderGrid";

interface StageMapProps {
  grid: Grid;
  label: string;
  testId: string;
}

// Read-only grayscale rendering of one pipeline stage's output (conv, ReLU,
// or pooled). The wrapping div's data-signature exposes the grid's exact
// values so it can be asserted on in tests without reading canvas pixels
// back (jsdom has no real 2D context).
export function StageMap({ grid, label, testId }: StageMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const signature = grid.map((row) => row.join(",")).join(";");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderGridToCanvas(canvas, grid);
  }, [grid]);

  return (
    <div
      className="flex flex-col items-center gap-1.5"
      data-testid={testId}
      data-signature={signature}
    >
      <canvas
        ref={canvasRef}
        aria-label={`${label}: ${rows} × ${cols}`}
        className="h-20 w-20 rounded border border-white/10 bg-black [image-rendering:pixelated] sm:h-24 sm:w-24"
      />
      <span className="text-xs text-cosmos-text-muted">{label}</span>
      <span className="text-[10px] text-cosmos-text-muted/70">
        {rows} × {cols}
      </span>
    </div>
  );
}
