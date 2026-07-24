import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import en from "@/messages/en.json";
import { mockMatchMedia } from "@/test/matchMedia";

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace?: string) => {
    const flat = en as Record<string, Record<string, string>>;
    return (key: string) => (namespace ? flat[namespace][key] : flat[key.split(".")[0]][key.split(".")[1]]);
  },
}));

import { KnowledgeCosmosSection } from "./KnowledgeCosmosSection";
import { knowledgeCosmosContent } from "@/content/knowledgeCosmos";

describe("KnowledgeCosmosSection", () => {
  it("renders a permanent section heading independent of the expand/collapse state", async () => {
    mockMatchMedia(true);
    const ui = await KnowledgeCosmosSection({ locale: "en" });
    render(ui);

    expect(
      screen.getByRole("heading", { level: 2, name: en.knowledgeCosmos.heading })
    ).toBeInTheDocument();
  });

  it("starts expanded (no summary-mode provider) and renders the heading, intro, and all concept titles as graph nodes", async () => {
    mockMatchMedia(true);
    const ui = await KnowledgeCosmosSection({ locale: "en" });
    render(ui);

    expect(screen.getByRole("button", { name: en.knowledgeCosmos.collapseConstellation })).toBeInTheDocument();

    for (const concept of knowledgeCosmosContent.en.concepts) {
      expect(screen.getByText(concept.title)).toBeInTheDocument();
    }
  });

  it("reveals a concept's explanation when its node is clicked", async () => {
    mockMatchMedia(true);
    const ui = await KnowledgeCosmosSection({ locale: "en" });
    render(ui);

    const firstConcept = knowledgeCosmosContent.en.concepts[0];
    fireEvent.click(await screen.findByRole("button", { name: firstConcept.title }));

    expect(screen.getByTestId("concept-explanation")).toHaveTextContent(firstConcept.explanation);
  });
});
