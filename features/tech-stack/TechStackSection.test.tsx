import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import en from "@/messages/en.json";
import ko from "@/messages/ko.json";

const messages = { current: en as Record<string, Record<string, string>> };

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string) => messages.current[namespace][key],
}));

import { TechStackSection } from "./TechStackSection";
import { techStackContent } from "@/content/techStack";

describe("TechStackSection", () => {
  it("renders every category with its summary and the numbered achievements", async () => {
    messages.current = en;
    render(await TechStackSection({ locale: "en" }));

    expect(screen.getByRole("heading", { level: 2, name: en.techStack.heading })).toBeInTheDocument();
    for (const category of techStackContent.en.categories) {
      expect(screen.getByRole("heading", { level: 3, name: category.title })).toBeInTheDocument();
      expect(screen.getByText(category.summary)).toBeInTheDocument();
    }
    expect(screen.getByText("A.03")).toBeInTheDocument();
    expect(screen.getByText(techStackContent.en.achievements[2].text)).toBeInTheDocument();
  });

  it("names the spaced-out awards heading with the plain word for assistive tech", async () => {
    messages.current = ko;
    render(await TechStackSection({ locale: "ko" }));

    expect(screen.getByRole("heading", { level: 3, name: ko.techStack.achievementsHeading })).toBeInTheDocument();
    expect(screen.getByText("성 과")).toHaveAttribute("aria-hidden", "true");
  });
});
