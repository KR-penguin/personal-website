import type { Grid } from "./logic";

// Renders a Grid of arbitrary numeric values (raw 0-255 pixel intensities,
// or signed conv/ReLU output) as a min-max-stretched grayscale bitmap onto a
// canvas's backing store, one grid cell per physical pixel. CSS on the
// <canvas> element handles the visual upscaling. No-ops when the browser
// can't provide a 2D context (e.g. canvas-less test environments).
export function renderGridToCanvas(canvas: HTMLCanvasElement, grid: Grid): void {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  if (rows === 0 || cols === 0) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  if (canvas.width !== cols) canvas.width = cols;
  if (canvas.height !== rows) canvas.height = rows;

  let min = Infinity;
  let max = -Infinity;
  for (const row of grid) {
    for (const value of row) {
      if (value < min) min = value;
      if (value > max) max = value;
    }
  }
  const range = max - min || 1;

  const imageData = ctx.createImageData(cols, rows);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const normalized = Math.round(((grid[y][x] - min) / range) * 255);
      const idx = (y * cols + x) * 4;
      imageData.data[idx] = normalized;
      imageData.data[idx + 1] = normalized;
      imageData.data[idx + 2] = normalized;
      imageData.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}
