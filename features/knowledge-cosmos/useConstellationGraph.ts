"use client";

import { useMemo, useState } from "react";
import type { KnowledgeCosmosConcept } from "@/types/content";
import { computeConceptNodePositions, type ConceptNodePosition } from "./layout";

export interface ConstellationNode extends ConceptNodePosition {
  concept: KnowledgeCosmosConcept;
}

export interface UseConstellationGraphResult {
  nodes: ConstellationNode[];
  selectedConcept: KnowledgeCosmosConcept | null;
  /** Prerequisite ids of the currently selected node, for edge highlighting. */
  highlightedPrerequisiteIds: Set<string>;
  selectNode: (id: string) => void;
}

// Separates selection state (which node is clicked, which edges highlight)
// from the SVG rendering in ConstellationGraph.tsx.
export function useConstellationGraph(
  concepts: KnowledgeCosmosConcept[]
): UseConstellationGraphResult {
  const nodes = useMemo<ConstellationNode[]>(() => {
    const positions = computeConceptNodePositions(concepts);
    const conceptById = new Map(concepts.map((concept) => [concept.id, concept]));
    return positions.map((position) => ({
      ...position,
      concept: conceptById.get(position.id)!,
    }));
  }, [concepts]);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedConcept = useMemo(
    () => nodes.find((node) => node.id === selectedId)?.concept ?? null,
    [nodes, selectedId]
  );

  const highlightedPrerequisiteIds = useMemo(
    () => new Set(selectedConcept?.prerequisiteIds ?? []),
    [selectedConcept]
  );

  const selectNode = (id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  return { nodes, selectedConcept, highlightedPrerequisiteIds, selectNode };
}
