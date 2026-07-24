import { describe, expect, it } from "vitest";
import {
  KERNELS,
  KERNEL_IDS,
  conv,
  createEmptyGrid,
  im2col,
  maxPool,
  outputSize,
  paintDab,
  pointerToCell,
  relu,
  type Grid,
} from "./logic";

// Independent brute-force nested-loop oracle for 2D convolution, written
// separately from the implementation under test so it cannot share a bug
// with im2col/conv.
function bruteForceConv(
  input: Grid,
  kernel: number[],
  kernelSize: number,
  stride: number,
  padding: number
): Grid {
  const height = input.length;
  const width = input[0].length;
  const paddedHeight = height + 2 * padding;
  const paddedWidth = width + 2 * padding;

  const padded: Grid = Array.from({ length: paddedHeight }, () =>
    new Array(paddedWidth).fill(0)
  );
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      padded[y + padding][x + padding] = input[y][x];
    }
  }

  const outHeight = Math.floor((height + 2 * padding - kernelSize) / stride) + 1;
  const outWidth = Math.floor((width + 2 * padding - kernelSize) / stride) + 1;

  const output: Grid = Array.from({ length: outHeight }, () =>
    new Array(outWidth).fill(0)
  );

  for (let oy = 0; oy < outHeight; oy++) {
    for (let ox = 0; ox < outWidth; ox++) {
      let sum = 0;
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          sum += padded[oy * stride + ky][ox * stride + kx] * kernel[ky * kernelSize + kx];
        }
      }
      output[oy][ox] = sum;
    }
  }

  return output;
}

const HAND_INPUT: Grid = [
  [1, 2, 3, 0, 1],
  [4, 5, 6, 1, 0],
  [7, 8, 9, 0, 1],
  [1, 0, 1, 2, 3],
  [0, 1, 0, 1, 2],
];

// A simple, deliberately non-symmetric 3x3 kernel — asymmetric so a
// transposition or index-order bug in im2col/conv would be caught.
const HAND_KERNEL = [1, 0, -1, 2, 0, -2, 1, 0, -1];

describe("im2col + conv", () => {
  it.each([
    { stride: 1, padding: 0 },
    { stride: 1, padding: 1 },
    { stride: 2, padding: 1 },
  ])("matches a brute-force oracle for stride=$stride padding=$padding", ({ stride, padding }) => {
    const outHeight = outputSize(HAND_INPUT.length, 3, stride, padding);
    const outWidth = outputSize(HAND_INPUT[0].length, 3, stride, padding);

    const matrix = im2col(HAND_INPUT, 3, stride, padding);
    const actual = conv(matrix, HAND_KERNEL, outHeight, outWidth);
    const expected = bruteForceConv(HAND_INPUT, HAND_KERNEL, 3, stride, padding);

    expect(actual).toEqual(expected);
  });

  it("produces one im2col row per output position, each row length kernelSize^2", () => {
    const matrix = im2col(HAND_INPUT, 3, 1, 0);
    const outHeight = outputSize(HAND_INPUT.length, 3, 1, 0);
    const outWidth = outputSize(HAND_INPUT[0].length, 3, 1, 0);

    expect(matrix.length).toBe(outHeight * outWidth);
    expect(matrix.every((row) => row.length === 9)).toBe(true);
  });
});

describe("outputSize", () => {
  it.each([
    { size: 5, kernelSize: 3, stride: 1, padding: 0 },
    { size: 5, kernelSize: 3, stride: 2, padding: 1 },
    { size: 4, kernelSize: 2, stride: 2, padding: 0 },
    { size: 6, kernelSize: 3, stride: 1, padding: 1 },
    { size: 32, kernelSize: 3, stride: 1, padding: 1 },
  ])(
    "matches im2col's actual row/col count for size=$size kernelSize=$kernelSize stride=$stride padding=$padding",
    ({ size, kernelSize, stride, padding }) => {
      const input: Grid = Array.from({ length: size }, (_, y) =>
        Array.from({ length: size }, (_, x) => y * size + x)
      );

      const expectedSide = outputSize(size, kernelSize, stride, padding);
      const matrix = im2col(input, kernelSize, stride, padding);

      expect(matrix.length).toBe(expectedSide * expectedSide);
      if (matrix.length > 0) {
        expect(matrix[0].length).toBe(kernelSize * kernelSize);
      }
    }
  );

  it("matches the well-known formula floor((H + 2p - k) / s) + 1", () => {
    expect(outputSize(5, 3, 1, 0)).toBe(3);
    expect(outputSize(5, 3, 2, 1)).toBe(3);
    expect(outputSize(4, 2, 2, 0)).toBe(2);
    expect(outputSize(6, 3, 1, 1)).toBe(6);
  });
});

describe("relu", () => {
  it("clamps negative values to zero and passes positive values through", () => {
    const input: Grid = [
      [-1, 2],
      [3, -4],
    ];

    expect(relu(input)).toEqual([
      [0, 2],
      [3, 0],
    ]);
  });
});

describe("maxPool", () => {
  it("takes the max of each non-overlapping window", () => {
    const input: Grid = [
      [1, 3, 2, 4],
      [5, 6, 1, 2],
      [7, 8, 3, 4],
      [1, 2, 9, 0],
    ];

    expect(maxPool(input, 2, 2)).toEqual([
      [6, 4],
      [8, 9],
    ]);
  });

  it("respects overlapping windows when stride < poolSize", () => {
    const input: Grid = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    // poolSize=2, stride=1 -> outputSize(3,2,1,0) = 2
    expect(maxPool(input, 2, 1)).toEqual([
      [5, 6],
      [8, 9],
    ]);
  });
});

describe("KERNELS", () => {
  it("defines a flattened 3x3 kernel for every KernelId", () => {
    for (const id of KERNEL_IDS) {
      const kernel = KERNELS[id];
      expect(kernel.size).toBe(3);
      expect(kernel.weights).toHaveLength(9);
    }
  });
});

describe("createEmptyGrid", () => {
  it("creates a size x size grid of zeros", () => {
    const grid = createEmptyGrid(4);
    expect(grid).toHaveLength(4);
    expect(grid.every((row) => row.length === 4 && row.every((v) => v === 0))).toBe(true);
  });
});

describe("paintDab", () => {
  it("stamps a (2*radius+1) square of the given intensity, clamped to bounds", () => {
    const grid = createEmptyGrid(4);
    const result = paintDab(grid, 0, 0, 1, 255);

    expect(result).toEqual([
      [255, 255, 0, 0],
      [255, 255, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it("returns the same reference when nothing changes", () => {
    const grid = paintDab(createEmptyGrid(4), 1, 1, 0, 0);
    const result = paintDab(grid, 1, 1, 0, 0);
    expect(result).toBe(grid);
  });
});

describe("pointerToCell", () => {
  const rect = { left: 10, top: 20, width: 320, height: 320 };

  it("maps a point to the corresponding cell index for a resolution x resolution grid", () => {
    expect(pointerToCell(10, 20, rect, 32)).toEqual({ row: 0, col: 0 });
    expect(pointerToCell(10 + 319, 20 + 319, rect, 32)).toEqual({ row: 31, col: 31 });
    expect(pointerToCell(10 + 160, 20 + 160, rect, 32)).toEqual({ row: 16, col: 16 });
  });

  it("returns null when the point falls outside the rect or the rect is degenerate", () => {
    expect(pointerToCell(0, 0, rect, 32)).toBeNull();
    expect(pointerToCell(50, 50, { left: 0, top: 0, width: 0, height: 0 }, 32)).toBeNull();
  });
});
