import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import en from "@/messages/en.json";

vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace?: string) => {
    const flat = en as Record<string, Record<string, string>>;
    return (key: string) => (namespace ? flat[namespace][key] : flat[key.split(".")[0]][key.split(".")[1]]);
  },
}));

vi.mock("@/components/starfield/Starfield", () => ({
  Starfield: () => <canvas data-testid="mock-starfield" />,
}));

import { HeroSection } from "./HeroSection";
import { heroContent } from "@/content/hero";

describe("HeroSection", () => {
  it("renders the site title and locale-specific role line and tagline", async () => {
    const ui = await HeroSection({ locale: "en" });
    render(ui);

    expect(screen.getByText(en.site.title)).toBeInTheDocument();
    expect(screen.getByText(heroContent.en.roleLine)).toBeInTheDocument();
    expect(screen.getByText(heroContent.en.tagline)).toBeInTheDocument();
  });
});
