import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import en from "@/messages/en.json";
import ko from "@/messages/ko.json";
import { mockMatchMedia } from "@/test/matchMedia";

const messages = { current: en as Record<string, Record<string, string>> };

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) => (key: string) => messages.current[namespace][key],
}));

import { HeroSection } from "./HeroSection";
import { heroContent } from "@/content/hero";

describe("HeroSection", () => {
  it("renders the name as the page heading and the tagline with its emphasised phrase", async () => {
    mockMatchMedia(true);
    messages.current = en;
    render(await HeroSection({ locale: "en" }));

    expect(screen.getByRole("heading", { level: 1, name: en.site.title })).toBeInTheDocument();
    const emphasis = screen.getByText(heroContent.en.taglineEmphasis);
    expect(emphasis).toHaveClass("text-outline");
    expect(emphasis.closest("p")).toHaveTextContent(heroContent.en.tagline);
    expect(screen.getByText(en.hero.lineOne)).toBeInTheDocument();
    expect(screen.getByText(en.hero.lineTwo)).toBeInTheDocument();
  });

  it("keeps the Korean emphasis at the start of the tagline", async () => {
    mockMatchMedia(true);
    messages.current = ko;
    render(await HeroSection({ locale: "ko" }));

    expect(screen.getByRole("heading", { level: 1, name: ko.site.title })).toBeInTheDocument();
    const emphasis = screen.getByText(heroContent.ko.taglineEmphasis);
    expect(emphasis.closest("p")).toHaveTextContent(heroContent.ko.tagline);
  });
});
