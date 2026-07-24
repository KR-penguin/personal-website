"use client";

import { useCallback, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
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
  type KernelId,
  type PointerRect,
} from "./logic";

export const CANVAS_RESOLUTION = 32;
const BRUSH_RADIUS = 1;
const DEFAULT_KERNEL_ID: KernelId = "verticalEdge";

export type StrideOption = 1 | 2;
export type PaddingOption = 0 | 1;
export type PoolSizeOption = 2 | 3;

export interface ShapeInfo {
  rows: number;
  cols: number;
}

export interface UseCnnMechanicsLabResult {
  resolution: number;
  kernelIds: readonly KernelId[];
  pixels: Grid;
  kernelId: KernelId;
  stride: StrideOption;
  padding: PaddingOption;
  poolSize: PoolSizeOption;
  reducedMotion: boolean;
  convOutput: Grid;
  reluOutput: Grid;
  pooledOutput: Grid;
  im2colShape: ShapeInfo;
  pooledShape: ShapeInfo;
  setKernelId: (id: KernelId) => void;
  setStride: (value: StrideOption) => void;
  setPadding: (value: PaddingOption) => void;
  setPoolSize: (value: PoolSizeOption) => void;
  paintAtPointer: (clientX: number, clientY: number, rect: PointerRect) => void;
  clear: () => void;
}

// Owns the CNN Mechanics Lab's interaction/animation state: the drawn pixel
// matrix, the selected kernel/stride/padding/pool-size, and the derived
// conv -> ReLU -> maxPool pipeline recomputed from the pure functions in
// ./logic. All actual math lives in logic.ts; this hook only wires DOM
// pointer coordinates to it and memoizes the pipeline.
export function useCnnMechanicsLab(
  resolution: number = CANVAS_RESOLUTION
): UseCnnMechanicsLabResult {
  const [pixels, setPixels] = useState<Grid>(() => createEmptyGrid(resolution));
  const [kernelId, setKernelId] = useState<KernelId>(DEFAULT_KERNEL_ID);
  const [stride, setStride] = useState<StrideOption>(1);
  const [padding, setPadding] = useState<PaddingOption>(1);
  const [poolSize, setPoolSize] = useState<PoolSizeOption>(2);
  const reducedMotion = usePrefersReducedMotion();

  const paintAtPointer = useCallback(
    (clientX: number, clientY: number, rect: PointerRect) => {
      const cell = pointerToCell(clientX, clientY, rect, resolution);
      if (!cell) return;
      setPixels((prev) => paintDab(prev, cell.row, cell.col, BRUSH_RADIUS));
    },
    [resolution]
  );

  const clear = useCallback(() => {
    setPixels(createEmptyGrid(resolution));
  }, [resolution]);

  const kernel = KERNELS[kernelId];

  const im2colMatrix = useMemo(
    () => im2col(pixels, kernel.size, stride, padding),
    [pixels, kernel.size, stride, padding]
  );

  const convHeight = outputSize(pixels.length, kernel.size, stride, padding);
  const convWidth = outputSize(pixels[0]?.length ?? 0, kernel.size, stride, padding);

  const convOutput = useMemo(
    () => conv(im2colMatrix, kernel.weights, convHeight, convWidth),
    [im2colMatrix, kernel.weights, convHeight, convWidth]
  );

  const reluOutput = useMemo(() => relu(convOutput), [convOutput]);

  // Pool stride is fixed equal to pool size (standard non-overlapping
  // pooling) — the UI only exposes a single pool-size control, per spec.
  const pooledOutput = useMemo(
    () => maxPool(reluOutput, poolSize, poolSize),
    [reluOutput, poolSize]
  );

  const im2colShape: ShapeInfo = {
    rows: im2colMatrix.length,
    cols: kernel.size * kernel.size,
  };
  const pooledShape: ShapeInfo = {
    rows: pooledOutput.length,
    cols: pooledOutput[0]?.length ?? 0,
  };

  return {
    resolution,
    kernelIds: KERNEL_IDS,
    pixels,
    kernelId,
    stride,
    padding,
    poolSize,
    reducedMotion,
    convOutput,
    reluOutput,
    pooledOutput,
    im2colShape,
    pooledShape,
    setKernelId,
    setStride,
    setPadding,
    setPoolSize,
    paintAtPointer,
    clear,
  };
}
