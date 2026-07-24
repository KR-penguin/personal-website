"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { AppLocale } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { cnnMechanicsContent } from "@/content/techLab/cnnMechanics";
import type { KernelId } from "./logic";
import { renderGridToCanvas } from "./renderGrid";
import { StageMap } from "./StageMap";
import { useCnnMechanicsLab, type PaddingOption, type PoolSizeOption, type StrideOption } from "./useCnnMechanicsLab";

interface CnnMechanicsLabProps {
  locale: AppLocale;
}

const STRIDE_OPTIONS: StrideOption[] = [1, 2];
const PADDING_OPTIONS: PaddingOption[] = [0, 1];
const POOL_SIZE_OPTIONS: PoolSizeOption[] = [2, 3];

function toggleButtonClass(active: boolean): string {
  return `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
    active
      ? "bg-cosmos-accent text-cosmos-text"
      : "border border-white/10 bg-cosmos-background text-cosmos-text-muted hover:text-cosmos-text"
  }`;
}

export function CnnMechanicsLab({ locale }: CnnMechanicsLabProps) {
  const { caption, labels } = pickLocale(cnnMechanicsContent, locale);
  const {
    kernelIds,
    pixels,
    kernelId,
    stride,
    padding,
    poolSize,
    convOutput,
    reluOutput,
    pooledOutput,
    im2colShape,
    setKernelId,
    setStride,
    setPadding,
    setPoolSize,
    paintAtPointer,
    clear,
  } = useCnnMechanicsLab();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderGridToCanvas(canvas, pixels);
  }, [pixels]);

  const paintFromEvent = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    paintAtPointer(event.clientX, event.clientY, rect);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    // Not implemented in jsdom; guarded so tests can dispatch pointer events.
    event.currentTarget.setPointerCapture?.(event.pointerId);
    paintFromEvent(event);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    paintFromEvent(event);
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-cosmos-surface p-6">
      <header className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-semibold text-cosmos-text">{labels.title}</h3>
        <p className="text-sm text-cosmos-text-muted">{caption}</p>
      </header>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <canvas
          ref={canvasRef}
          aria-label={labels.canvasLabel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          onPointerCancel={stopDrawing}
          className="h-40 w-40 touch-none rounded border border-white/10 bg-black [image-rendering:pixelated] cursor-crosshair sm:h-48 sm:w-48"
        />
        <button
          type="button"
          onClick={clear}
          className="rounded-full border border-white/10 bg-cosmos-background px-4 py-2 text-sm font-medium text-cosmos-text-muted hover:text-cosmos-text"
        >
          {labels.clearButton}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-cosmos-text">{labels.kernelLabel}</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label={labels.kernelLabel}>
          {kernelIds.map((id: KernelId) => (
            <button
              key={id}
              type="button"
              aria-pressed={kernelId === id}
              onClick={() => setKernelId(id)}
              className={toggleButtonClass(kernelId === id)}
            >
              {labels.kernelNames[id]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-cosmos-text">{labels.strideLabel}</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label={labels.strideLabel}>
            {STRIDE_OPTIONS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={stride === value}
                onClick={() => setStride(value)}
                className={toggleButtonClass(stride === value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-cosmos-text">{labels.paddingLabel}</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label={labels.paddingLabel}>
            {PADDING_OPTIONS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={padding === value}
                onClick={() => setPadding(value)}
                className={toggleButtonClass(padding === value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-cosmos-text">{labels.poolSizeLabel}</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label={labels.poolSizeLabel}>
            {POOL_SIZE_OPTIONS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={poolSize === value}
                onClick={() => setPoolSize(value)}
                className={toggleButtonClass(poolSize === value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-cosmos-background p-4">
        <p className="text-xs uppercase tracking-wide text-cosmos-text-muted">{labels.im2colShapeLabel}</p>
        <p className="font-display text-lg font-semibold text-cosmos-accent-secondary">
          {im2colShape.rows} × {im2colShape.cols}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
        <StageMap grid={pixels} label={labels.stageInputLabel} testId="cnn-stage-input" />
        <StageMap grid={convOutput} label={labels.stageConvLabel} testId="cnn-stage-conv" />
        <StageMap grid={reluOutput} label={labels.stageReluLabel} testId="cnn-stage-relu" />
        <StageMap grid={pooledOutput} label={labels.stagePooledLabel} testId="cnn-stage-pooled" />
      </div>
    </div>
  );
}
