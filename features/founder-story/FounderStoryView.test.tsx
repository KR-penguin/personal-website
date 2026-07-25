import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import en from "@/messages/en.json";
import { mockMatchMedia } from "@/test/matchMedia";

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace?: string) => {
    const flat = en as Record<string, Record<string, string>>;
    return (key: string) => (namespace ? flat[namespace][key] : flat[key.split(".")[0]][key.split(".")[1]]);
  },
}));

import { FounderStoryView } from "./FounderStoryView";
import { founderStoryContent } from "@/content/founderStory";

describe("FounderStoryView", () => {
  it("renders the OBT user stat, a highlight, and the linked current project", async () => {
    // Reduced motion so StatCounter shows its final value with no
    // IntersectionObserver/rAF wiring required for this smoke test.
    mockMatchMedia(true);

    const ui = await FounderStoryView({ locale: "en" });
    render(ui);

    expect(screen.getByText(/^80$/)).toBeInTheDocument();
    expect(screen.getByText(founderStoryContent.en.highlights[0].text)).toBeInTheDocument();

    const currentProject = founderStoryContent.en.projects.find((project) => project.url);
    expect(currentProject?.url).toBeDefined();
    const link = screen.getByRole("link", {
      name: currentProject!.url!.replace(/^https?:\/\//, ""),
    });
    expect(link).toHaveAttribute("href", currentProject!.url);
  });
});
