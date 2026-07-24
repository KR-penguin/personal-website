export interface ConceptLayoutInput {
  id: string;
  prerequisiteIds: string[];
}

export interface ConceptNodePosition {
  id: string;
  layer: number;
  /** Index of this node within its layer, left-to-right. */
  column: number;
  /** Normalized [0, 1] horizontal position within its layer. */
  x: number;
  /** Normalized [0, 1] vertical position, one row per layer. */
  y: number;
}

// Topological depth: a node with no prerequisites sits at layer 0, otherwise
// its layer is 1 + the deepest layer among its prerequisites. This is a pure
// computation (no physics simulation) suitable for a static constellation
// layout.
export function computeConceptLayers(concepts: ConceptLayoutInput[]): Map<string, number> {
  const byId = new Map(concepts.map((concept) => [concept.id, concept]));
  const layerCache = new Map<string, number>();

  function resolveLayer(id: string, visiting: Set<string>): number {
    const cached = layerCache.get(id);
    if (cached !== undefined) return cached;

    if (visiting.has(id)) {
      throw new Error(`Cycle detected in knowledge cosmos graph at node "${id}"`);
    }

    const concept = byId.get(id);
    if (!concept) {
      throw new Error(`Unknown prerequisite id "${id}"`);
    }

    if (concept.prerequisiteIds.length === 0) {
      layerCache.set(id, 0);
      return 0;
    }

    visiting.add(id);
    const layer =
      1 +
      Math.max(
        ...concept.prerequisiteIds.map((prerequisiteId) => resolveLayer(prerequisiteId, visiting))
      );
    visiting.delete(id);

    layerCache.set(id, layer);
    return layer;
  }

  for (const concept of concepts) {
    resolveLayer(concept.id, new Set());
  }

  return layerCache;
}

// Lays nodes out top-to-bottom by layer (deeper layer = further down),
// evenly spaced left-to-right within each layer, in normalized [0, 1]
// coordinates a caller can scale to any viewBox/canvas size.
export function computeConceptNodePositions(
  concepts: ConceptLayoutInput[]
): ConceptNodePosition[] {
  const layers = computeConceptLayers(concepts);
  const maxLayer = Math.max(0, ...Array.from(layers.values()));

  const idsByLayer = new Map<number, string[]>();
  for (const concept of concepts) {
    const layer = layers.get(concept.id)!;
    const bucket = idsByLayer.get(layer) ?? [];
    bucket.push(concept.id);
    idsByLayer.set(layer, bucket);
  }

  const positions: ConceptNodePosition[] = [];
  for (const [layer, ids] of idsByLayer) {
    ids.forEach((id, column) => {
      const x = ids.length === 1 ? 0.5 : column / (ids.length - 1);
      const y = maxLayer === 0 ? 0.5 : layer / maxLayer;
      positions.push({ id, layer, column, x, y });
    });
  }

  return positions;
}
