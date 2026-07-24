import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import en from "@/messages/en.json";

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace?: string) => {
    const flat = en as Record<string, Record<string, string>>;
    return (key: string) => (namespace ? flat[namespace][key] : flat[key.split(".")[0]][key.split(".")[1]]);
  },
}));

import { CareerTimelineView } from "./CareerTimelineView";
import { careerTimelineContent } from "@/content/careerTimeline";

describe("CareerTimelineView", () => {
  it("renders the hobby callout, a milestone, and the notable-moment callout without restating founder-story data", async () => {
    const ui = await CareerTimelineView({ locale: "en" });
    render(ui);

    expect(screen.getByText(careerTimelineContent.en.hobbyCallout)).toBeInTheDocument();
    expect(screen.getByText(careerTimelineContent.en.milestones[0].text)).toBeInTheDocument();
    expect(screen.getByText(careerTimelineContent.en.notableMoment)).toBeInTheDocument();
  });
});
