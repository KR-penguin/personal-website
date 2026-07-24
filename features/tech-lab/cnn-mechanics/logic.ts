export type Grid = number[][];

export type KernelId =
  | "horizontalEdge"
  | "verticalEdge"
  | "sharpen"
  | "boxBlur"
  | "emboss";

export interface FixedKernel {
  id: KernelId;
  size: number;
  weights: number[];
}

export const KERNEL_IDS: readonly KernelId[] = [
  "horizontalEdge",
  "verticalEdge",
  "sharpen",
  "boxBlur",
  "emboss",
];

export const KERNELS: Record<KernelId, FixedKernel> = {
  horizontalEdge: {
    id: "horizontalEdge",
    size: 3,
    weights: [-1, -1, -1, 0, 0, 0, 1, 1, 1],
  },
  verticalEdge: {
    id: "verticalEdge",
    size: 3,
    weights: [-1, 0, 1, -1, 0, 1, -1, 0, 1],
  },
  sharpen: {
    id: "sharpen",
    size: 3,
    weights: [0, -1, 0, -1, 5, -1, 0, -1, 0],
  },
  boxBlur: {
    id: "boxBlur",
    size: 3,
    weights: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
  },
  emboss: {
    id: "emboss",
    size: 3,
    weights: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
  },
};

export function outputSize(
  inputSize: number,
  kernelSize: number,
  stride: number,
  padding: number
): number {
  return Math.max(
    0,
    Math.floor((inputSize + 2 * padding - kernelSize) / stride) + 1
  );
}

function padGrid(input: Grid, padding: number): Grid {
  if (padding === 0) return input;

  const height = input.length;
  const width = input[0]?.length ?? 0;
  const paddedHeight = height + 2 * padding;
  const paddedWidth = width + 2 * padding;

  const result: Grid = Array.from({ length: paddedHeight }, () =>
    new Array(paddedWidth).fill(0)
  );

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      result[y + padding][x + padding] = input[y][x];
    }
  }

  return result;
}

// Each row of the returned matrix is one flattened kxk receptive-field
// window, in row-major raster order over the output positions — the
// standard im2col layout that turns convolution into a matrix multiply.
export function im2col(
  input: Grid,
  kernelSize: number,
  stride: number,
  padding: number
): number[][] {
  const height = input.length;
  const width = input[0]?.length ?? 0;
  const outHeight = outputSize(height, kernelSize, stride, padding);
  const outWidth = outputSize(width, kernelSize, stride, padding);
  const padded = padGrid(input, padding);

  const rows: number[][] = [];
  for (let oy = 0; oy < outHeight; oy++) {
    for (let ox = 0; ox < outWidth; ox++) {
      const row: number[] = [];
      const startY = oy * stride;
      const startX = ox * stride;
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          row.push(padded[startY + ky][startX + kx]);
        }
      }
      rows.push(row);
    }
  }

  return rows;
}

export function conv(
  im2colMatrix: number[][],
  flattenedKernel: number[],
  outHeight: number,
  outWidth: number
): Grid {
  if (outHeight <= 0 || outWidth <= 0) return [];

  const output: Grid = Array.from({ length: outHeight }, () =>
    new Array(outWidth).fill(0)
  );

  for (let i = 0; i < im2colMatrix.length; i++) {
    const row = im2colMatrix[i];
    let sum = 0;
    for (let k = 0; k < flattenedKernel.length; k++) {
      sum += row[k] * flattenedKernel[k];
    }
    const oy = Math.floor(i / outWidth);
    const ox = i % outWidth;
    if (oy < outHeight) output[oy][ox] = sum;
  }

  return output;
}

export function relu(map: Grid): Grid {
  return map.map((row) => row.map((value) => Math.max(0, value)));
}

export function maxPool(map: Grid, poolSize: number, stride: number): Grid {
  const height = map.length;
  const width = map[0]?.length ?? 0;
  const outHeight = outputSize(height, poolSize, stride, 0);
  const outWidth = outputSize(width, poolSize, stride, 0);

  const output: Grid = Array.from({ length: outHeight }, () =>
    new Array(outWidth).fill(0)
  );

  for (let oy = 0; oy < outHeight; oy++) {
    for (let ox = 0; ox < outWidth; ox++) {
      let max = -Infinity;
      const startY = oy * stride;
      const startX = ox * stride;
      for (let py = 0; py < poolSize; py++) {
        for (let px = 0; px < poolSize; px++) {
          const y = startY + py;
          const x = startX + px;
          if (y < height && x < width) {
            max = Math.max(max, map[y][x]);
          }
        }
      }
      output[oy][ox] = max === -Infinity ? 0 : max;
    }
  }

  return output;
}

export function createEmptyGrid(size: number): Grid {
  return Array.from({ length: size }, () => new Array(size).fill(0));
}

// Additive brush stamp used by the drawable canvas: paints a (2*radius+1)
// square of `intensity` centered on (row, col), clamped to the grid bounds.
// Returns the same array reference when nothing actually changed so callers
// relying on referential equality (React state, useMemo) can skip work.
export function paintDab(
  grid: Grid,
  row: number,
  col: number,
  radius: number,
  intensity: number = 255
): Grid {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  if (rows === 0 || cols === 0) return grid;

  let changed = false;
  const next = grid.map((r) => r.slice());

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const y = row + dy;
      const x = col + dx;
      if (y < 0 || y >= rows || x < 0 || x >= cols) continue;
      if (next[y][x] !== intensity) {
        next[y][x] = intensity;
        changed = true;
      }
    }
  }

  return changed ? next : grid;
}

export interface PointerRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

// Maps a pointer/mouse client position over an element's bounding rect to a
// grid cell index, given the grid is rendered at `resolution` x `resolution`.
// Returns null when the rect is degenerate (e.g. not yet laid out) or the
// point falls outside it.
export function pointerToCell(
  clientX: number,
  clientY: number,
  rect: PointerRect,
  resolution: number
): { row: number; col: number } | null {
  if (rect.width <= 0 || rect.height <= 0 || resolution <= 0) return null;

  const relX = clientX - rect.left;
  const relY = clientY - rect.top;
  if (relX < 0 || relY < 0 || relX >= rect.width || relY >= rect.height) {
    return null;
  }

  const col = Math.min(resolution - 1, Math.floor((relX / rect.width) * resolution));
  const row = Math.min(resolution - 1, Math.floor((relY / rect.height) * resolution));
  return { row, col };
}
