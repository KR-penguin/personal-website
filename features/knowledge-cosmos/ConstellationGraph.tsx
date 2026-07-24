"use client";

import type { KnowledgeCosmosConcept } from "@/types/content";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useConstellationGraph } from "./useConstellationGraph";

interface ConstellationGraphProps {
  concepts: KnowledgeCosmosConcept[];
}

const VIEW_WIDTH = 800;
const VIEW_HEIGHT = 460;
const PADDING_X = 70;
const PADDING_Y = 50;

function toSvgX(x: number): number {
  return PADDING_X + x * (VIEW_WIDTH - PADDING_X * 2);
}

function toSvgY(y: number): number {
  return PADDING_Y + y * (VIEW_HEIGHT - PADDING_Y * 2);
}

export function ConstellationGraph({ concepts }: ConstellationGraphProps) {
  const { nodes, selectedConcept, highlightedPrerequisiteIds, selectNode } =
    useConstellationGraph(concepts);
  const positionById = new Map(nodes.map((node) => [node.id, node]));

  return (
    <ScrollReveal className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-cosmos-surface p-6">
      {/* No role/aria-label here: nesting keyboard-focusable g[role=button]
          nodes inside role="img" is an ARIA anti-pattern, and the section's
          own heading already names this graphic. */}
      {/* min-w keeps node labels/circles legible below ~640px by scrolling
          instead of shrinking the whole coordinate system illegibly small. */}
      <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="h-auto w-full min-w-[640px]">
        {nodes.flatMap((node) =>
          node.concept.prerequisiteIds.map((prerequisiteId) => {
            const prerequisiteNode = positionById.get(prerequisiteId);
            if (!prerequisiteNode) return null;

            const isHighlighted =
              selectedConcept?.id === node.id && highlightedPrerequisiteIds.has(prerequisiteId);

            return (
              <line
                key={`${node.id}-${prerequisiteId}`}
                aria-hidden="true"
                x1={toSvgX(node.x)}
                y1={toSvgY(node.y)}
                x2={toSvgX(prerequisiteNode.x)}
                y2={toSvgY(prerequisiteNode.y)}
                className={isHighlighted ? "stroke-cosmos-accent-secondary" : "stroke-white/15"}
                strokeWidth={isHighlighted ? 2 : 1}
              />
            );
          })
        )}

        {nodes.map((node) => {
          const isSelected = selectedConcept?.id === node.id;
          return (
            <g
              key={node.id}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={node.concept.title}
              onClick={() => selectNode(node.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectNode(node.id);
                }
              }}
              className="cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cosmos-accent-secondary"
            >
              <circle
                cx={toSvgX(node.x)}
                cy={toSvgY(node.y)}
                r={isSelected ? 10 : 7}
                className={`transition-[fill,r] duration-150 ${
                  isSelected
                    ? "fill-cosmos-accent"
                    : "fill-cosmos-accent-secondary hover:fill-cosmos-accent-secondary/80"
                }`}
              />
              <text
                x={toSvgX(node.x)}
                y={toSvgY(node.y) - 14}
                textAnchor="middle"
                className="fill-cosmos-text text-[10px]"
              >
                {node.concept.title}
              </text>
            </g>
          );
        })}
      </svg>
      </div>

      {selectedConcept && (
        <div
          role="note"
          aria-live="polite"
          data-testid="concept-explanation"
          className="rounded-xl border border-white/10 bg-cosmos-background p-4"
        >
          <h4 className="font-display text-base font-semibold text-cosmos-accent-secondary">
            {selectedConcept.title}
          </h4>
          <p className="mt-2 text-sm text-cosmos-text-muted">{selectedConcept.explanation}</p>
        </div>
      )}
    </ScrollReveal>
  );
}
