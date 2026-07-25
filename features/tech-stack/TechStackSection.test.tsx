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

import { TechStackSection } from "./TechStackSection";
import { techStackContent } from "@/content/techStack";

describe("TechStackSection", () => {
  it("renders a tech-stack category, an emphasized achievement, and the hobby callout", async () => {
    // Reduced motion keeps the ScrollReveal-wrapped items rendering
    // statically, with no IntersectionObserver/rAF wiring required.
    mockMatchMedia(true);

    const ui = await TechStackSection({ locale: "en" });
    render(ui);

    expect(screen.getByText(techStackContent.en.categories[0].title)).toBeInTheDocument();
    expect(screen.getByText(techStackContent.en.categories[0].items[0])).toBeInTheDocument();
    expect(screen.getByText(techStackContent.en.achievements[0].title)).toBeInTheDocument();
    expect(screen.getByText(techStackContent.en.hobbyCallout)).toBeInTheDocument();
  });
});
