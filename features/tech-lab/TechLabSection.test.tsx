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

import { TechLabSection } from "./TechLabSection";
import { techLabIntroContent } from "@/content/techLab/intro";
import { fastInverseSqrtContent } from "@/content/techLab/fastInverseSqrt";
import { qLearningContent } from "@/content/techLab/qLearning";
import { cnnMechanicsContent } from "@/content/techLab/cnnMechanics";

describe("TechLabSection", () => {
  it("renders the section heading, intro, and all three demo labs", async () => {
    // Reduced motion keeps the client demo hooks (rAF training loop, greedy
    // playback timers) from ever kicking off during this smoke test.
    mockMatchMedia(true);

    const ui = await TechLabSection({ locale: "en" });
    render(ui);

    expect(screen.getByText(en.techLab.heading)).toBeInTheDocument();
    expect(screen.getByText(techLabIntroContent.en.intro)).toBeInTheDocument();
    expect(screen.getByText(fastInverseSqrtContent.en.labels.title)).toBeInTheDocument();
    expect(screen.getByText(qLearningContent.en.labels.title)).toBeInTheDocument();
    expect(screen.getByText(cnnMechanicsContent.en.labels.title)).toBeInTheDocument();
  });
});
