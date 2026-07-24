"use client";

import type { KnowledgeCosmosConcept } from "@/types/content";
import { useConstellationGraph } from "./useConstellationGraph";

interface ConstellationGraphProps {
  concepts: KnowledgeCosmosConcept[];
  ariaLabel: string;
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

export function ConstellationGraph({ concepts, ariaLabel }: ConstellationGraphProps) {
  const { nodes, selectedConcept, highlightedPrerequisiteIds, selectNode } =
    useConstellationGraph(concepts);
  const positionById = new Map(nodes.map((node) => [node.id, node]));

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-cosmos-surface p-6">
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        role="img"
        aria-label={ariaLabel}
        className="h-auto w-full"
      >
        {nodes.flatMap((node) =>
          node.concept.prerequisiteIds.map((prerequisiteId) => {
            const prerequisiteNode = positionById.get(prerequisiteId);
            if (!prerequisiteNode) return null;

            const isHighlighted =
              selectedConcept?.id === node.id && highlightedPrerequisiteIds.has(prerequisiteId);

            return (
              <line
                key={`${node.id}-${prerequisiteId}`}
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
              className="cursor-pointer focus:outline-none"
            >
              <circle
                cx={toSvgX(node.x)}
                cy={toSvgY(node.y)}
                r={isSelected ? 10 : 7}
                className={isSelected ? "fill-cosmos-accent" : "fill-cosmos-accent-secondary"}
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

      {selectedConcept && (
        <div
          role="note"
          data-testid="concept-explanation"
          className="rounded-xl border border-white/10 bg-cosmos-background p-4"
        >
          <h4 className="font-display text-base font-semibold text-cosmos-accent-secondary">
            {selectedConcept.title}
          </h4>
          <p className="mt-2 text-sm text-cosmos-text-muted">{selectedConcept.explanation}</p>
        </div>
      )}
    </div>
  );
}
