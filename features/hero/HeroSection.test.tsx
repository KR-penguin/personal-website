import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import en from "@/messages/en.json";

vi.mock("next-intl/server", () => ({
  getTranslations: async () => {
    const flat = en as Record<string, Record<string, string>>;
    return (key: string) => {
      const [namespace, field] = key.split(".");
      return flat[namespace][field];
    };
  },
}));

vi.mock("@/components/starfield/Starfield", () => ({
  Starfield: () => <canvas data-testid="mock-starfield" />,
}));

import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  it("renders the site title text", async () => {
    const ui = await HeroSection();
    render(ui);

    expect(screen.getByText(en.site.title)).toBeInTheDocument();
  });
});
