"use client";

import type { AppLocale } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { qLearningContent } from "@/content/techLab/qLearning";
import { NUM_STATES, cellAt, type CellType } from "./logic";
import { useQLearningLab } from "./useQLearningLab";

interface QLearningLabProps {
  locale: AppLocale;
}

const CELL_GLYPH: Partial<Record<CellType, string>> = {
  S: "S",
  H: "H",
  G: "G",
};

function cellShellClasses(type: CellType): string {
  switch (type) {
    case "S":
      return "border-cosmos-accent-secondary/60 bg-cosmos-background";
    case "H":
      return "border-white/10 bg-black/50";
    case "G":
      return "border-cosmos-accent/70 bg-cosmos-accent/10";
    default:
      return "border-white/10 bg-cosmos-background";
  }
}

function cellGlyphClasses(type: CellType): string {
  switch (type) {
    case "S":
      return "text-cosmos-accent-secondary";
    case "H":
      return "text-cosmos-text-muted";
    case "G":
      return "text-cosmos-accent";
    default:
      return "text-cosmos-text-muted";
  }
}

export function QLearningLab({ locale }: QLearningLabProps) {
  const { caption, labels } = pickLocale(qLearningContent, locale);
  const {
    maxQValues,
    agentState,
    epsilon,
    episodesCompleted,
    totalTrainingEpisodes,
    isTraining,
    isPlaying,
    greedyPath,
    train,
    playGreedy,
    reset,
  } = useQLearningLab();

  // Heatmap brightness is relative to the current best-known state, not an
  // absolute scale, so the visualizer stays legible early in training when
  // every Q-value is still tiny compared to the theoretical ceiling of 1.
  const globalMaxQ = Math.max(0, ...maxQValues);
  const pathSet = new Set(greedyPath ?? []);
  const controlsDisabled = isTraining || isPlaying;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-cosmos-surface p-6">
      <header className="flex flex-col gap-2">
        <h3 className="font-display text-xl font-semibold text-cosmos-text">{labels.title}</h3>
        <p className="text-sm text-cosmos-text-muted">{caption}</p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={train}
          disabled={controlsDisabled}
          className="rounded-full bg-cosmos-accent px-4 py-2 text-sm font-medium text-cosmos-text disabled:cursor-not-allowed disabled:opacity-50"
        >
          {labels.trainButton}
        </button>
        <button
          type="button"
          onClick={playGreedy}
          disabled={controlsDisabled || episodesCompleted === 0}
          className="rounded-full border border-white/10 bg-cosmos-background px-4 py-2 text-sm font-medium text-cosmos-text disabled:cursor-not-allowed disabled:opacity-50"
        >
          {labels.playGreedyButton}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={controlsDisabled}
          className="rounded-full border border-white/10 bg-cosmos-background px-4 py-2 text-sm font-medium text-cosmos-text-muted transition-colors hover:text-cosmos-text disabled:cursor-not-allowed disabled:opacity-50"
        >
          {labels.resetButton}
        </button>

        <div className="ml-auto flex flex-wrap gap-x-4 gap-y-1 text-xs text-cosmos-text-muted">
          <span>
            {labels.epsilonLabel}: {epsilon.toFixed(2)}
          </span>
          <span>
            {labels.episodesLabel}: {episodesCompleted}/{totalTrainingEpisodes}
          </span>
        </div>
      </div>

      <div
        className="mx-auto grid w-full max-w-xs grid-cols-4 gap-1.5 sm:gap-2"
        role="group"
        aria-label={labels.title}
      >
        {Array.from({ length: NUM_STATES }, (_, state) => {
          const type = cellAt(state);
          const maxQ = maxQValues[state] ?? 0;
          const normalizedQ = globalMaxQ > 0 ? Math.max(0, maxQ) / globalMaxQ : 0;
          const isAgent = state === agentState;
          const isOnPath = pathSet.has(state);
          const glyph = CELL_GLYPH[type];

          return (
            <div
              key={state}
              data-testid={`ql-cell-${state}`}
              data-max-q={maxQ}
              data-cell-type={type}
              className={`relative aspect-square overflow-hidden rounded-md border ${cellShellClasses(type)}`}
            >
              {type !== "H" && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-cosmos-accent"
                  style={{ opacity: normalizedQ * 0.6 }}
                />
              )}
              {isOnPath && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-md ring-2 ring-inset ring-cosmos-accent-secondary"
                />
              )}
              <div className="relative flex h-full w-full items-center justify-center">
                {glyph && (
                  <span className={`font-display text-xs font-semibold ${cellGlyphClasses(type)}`}>
                    {glyph}
                  </span>
                )}
              </div>
              {isAgent && (
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                  <span className="h-3 w-3 rounded-full bg-cosmos-accent-secondary shadow-[0_0_6px_2px_rgba(56,189,248,0.6)]" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs text-cosmos-text-muted">
        <LegendSwatch swatchClassName={cellShellClasses("S")} label={labels.legendStart} />
        <LegendSwatch swatchClassName={cellShellClasses("F")} label={labels.legendFrozen} />
        <LegendSwatch swatchClassName={cellShellClasses("H")} label={labels.legendHole} />
        <LegendSwatch swatchClassName={cellShellClasses("G")} label={labels.legendGoal} />
      </div>

      <p className="text-xs text-cosmos-text-muted">{labels.heatmapNote}</p>
    </div>
  );
}

interface LegendSwatchProps {
  swatchClassName: string;
  label: string;
}

function LegendSwatch({ swatchClassName, label }: LegendSwatchProps) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`inline-block h-3 w-3 rounded border ${swatchClassName}`} />
      {label}
    </span>
  );
}
