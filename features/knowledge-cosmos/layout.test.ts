import { describe, expect, it } from "vitest";
import { knowledgeCosmosContent } from "@/content/knowledgeCosmos";
import { computeConceptLayers, computeConceptNodePositions } from "./layout";

describe("computeConceptLayers", () => {
  const concepts = knowledgeCosmosContent.en.concepts;

  it("assigns every node a layer strictly greater than each of its prerequisites' layers", () => {
    const layers = computeConceptLayers(concepts);

    for (const concept of concepts) {
      const layer = layers.get(concept.id);
      expect(layer).toBeDefined();

      for (const prerequisiteId of concept.prerequisiteIds) {
        const prerequisiteLayer = layers.get(prerequisiteId);
        expect(prerequisiteLayer).toBeDefined();
        expect(layer!).toBeGreaterThan(prerequisiteLayer!);
      }
    }
  });

  it("assigns layer 0 to every node with no prerequisites", () => {
    const layers = computeConceptLayers(concepts);

    for (const concept of concepts) {
      if (concept.prerequisiteIds.length === 0) {
        expect(layers.get(concept.id)).toBe(0);
      }
    }
  });

  it("computes a layer for every node in the graph", () => {
    const layers = computeConceptLayers(concepts);
    expect(layers.size).toBe(concepts.length);
  });
});

describe("computeConceptNodePositions", () => {
  const concepts = knowledgeCosmosContent.en.concepts;

  it("produces one position per node, all within the [0, 1] range", () => {
    const positions = computeConceptNodePositions(concepts);

    expect(positions).toHaveLength(concepts.length);
    for (const position of positions) {
      expect(position.x).toBeGreaterThanOrEqual(0);
      expect(position.x).toBeLessThanOrEqual(1);
      expect(position.y).toBeGreaterThanOrEqual(0);
      expect(position.y).toBeLessThanOrEqual(1);
    }
  });

  it("gives every node in the same layer the same y coordinate", () => {
    const positions = computeConceptNodePositions(concepts);
    const yByLayer = new Map<number, number>();

    for (const position of positions) {
      const existingY = yByLayer.get(position.layer);
      if (existingY === undefined) {
        yByLayer.set(position.layer, position.y);
      } else {
        expect(position.y).toBe(existingY);
      }
    }
  });
});
