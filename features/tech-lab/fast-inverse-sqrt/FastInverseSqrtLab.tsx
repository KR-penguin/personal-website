"use client";

import type { AppLocale } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { fastInverseSqrtContent } from "@/content/techLab/fastInverseSqrt";
import { BitBreakdownRow } from "./BitBreakdownRow";
import { SLIDER_RANGE, formatDecimal, sliderPositionToX, xToSliderPosition } from "./logic";
import { useFastInverseSqrtLab } from "./useFastInverseSqrtLab";
import type { IterationCount } from "./logic";

interface FastInverseSqrtLabProps {
  locale: AppLocale;
}

const ITERATION_OPTIONS: IterationCount[] = [1, 2];

export function FastInverseSqrtLab({ locale }: FastInverseSqrtLabProps) {
  const { caption, labels } = pickLocale(fastInverseSqrtContent, locale);
  const {
    x,
    setX,
    iterations,
    setIterations,
    accurate,
    fast,
    errorPercent,
    inputBits,
    reinterpretedBits,
    prefersReducedMotion,
    minX,
    maxX,
  } = useFastInverseSqrtLab();

  const valueTransitionClass = prefersReducedMotion ? "" : "transition-colors duration-300";

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-cosmos-surface p-6">
      <header className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-semibold text-cosmos-text">{labels.title}</h3>
        <p className="text-sm text-cosmos-text-muted">{caption}</p>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="fisr-x-slider" className="text-sm font-medium text-cosmos-text">
            {labels.inputLabel}
          </label>
          <input
            id="fisr-x-slider"
            type="range"
            min={SLIDER_RANGE.min}
            max={SLIDER_RANGE.max}
            step={0.01}
            value={xToSliderPosition(x)}
            onChange={(event) => setX(sliderPositionToX(Number(event.target.value)))}
            className="w-full accent-cosmos-accent"
            aria-label={labels.inputLabel}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="fisr-x-number" className="text-sm font-medium text-cosmos-text">
            x
          </label>
          <input
            id="fisr-x-number"
            type="number"
            min={minX}
            max={maxX}
            step="any"
            value={x}
            onChange={(event) => setX(Number(event.target.value))}
            className="w-28 rounded-lg border border-white/10 bg-cosmos-background px-3 py-2 text-sm text-cosmos-text"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-cosmos-text">{labels.iterationsLabel}</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label={labels.iterationsLabel}>
          {ITERATION_OPTIONS.map((count) => (
            <button
              key={count}
              type="button"
              aria-pressed={iterations === count}
              onClick={() => setIterations(count)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                iterations === count
                  ? "bg-cosmos-accent text-cosmos-text"
                  : "border border-white/10 bg-cosmos-background text-cosmos-text-muted hover:text-cosmos-text"
              }`}
            >
              {count === 1 ? labels.oneIteration : labels.twoIterations}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-cosmos-background p-4">
          <p className="text-xs uppercase tracking-wide text-cosmos-text-muted">{labels.accurateLabel}</p>
          <p className={`font-display text-lg font-semibold text-cosmos-text ${valueTransitionClass}`}>
            {formatDecimal(accurate)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-cosmos-background p-4">
          <p className="text-xs uppercase tracking-wide text-cosmos-text-muted">{labels.fastLabel}</p>
          <p
            className={`font-display text-lg font-semibold text-cosmos-accent-secondary ${valueTransitionClass}`}
          >
            {formatDecimal(fast)}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-cosmos-background p-4">
          <p className="text-xs uppercase tracking-wide text-cosmos-text-muted">{labels.errorLabel}</p>
          <p className={`font-display text-lg font-semibold text-cosmos-accent ${valueTransitionClass}`}>
            {formatDecimal(errorPercent, 4)}%
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-medium text-cosmos-text">{labels.bitVisualizerTitle}</h4>
        <BitBreakdownRow
          label={labels.inputBitsLabel}
          hexLabel={labels.hexLabel}
          bits={inputBits}
          signLabel={labels.signLabel}
          exponentLabel={labels.exponentLabel}
          mantissaLabel={labels.mantissaLabel}
        />
        <BitBreakdownRow
          label={labels.reinterpretedBitsLabel}
          hexLabel={labels.hexLabel}
          bits={reinterpretedBits}
          signLabel={labels.signLabel}
          exponentLabel={labels.exponentLabel}
          mantissaLabel={labels.mantissaLabel}
        />
      </div>
    </div>
  );
}
