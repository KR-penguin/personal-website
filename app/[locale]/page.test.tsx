import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// The real next-intl/server's setRequestLocale assumes an RSC runtime and
// throws under vitest's client-like jsdom environment; page.tsx only needs
// it to be called, not to do anything, here.
vi.mock("next-intl/server", () => ({
  setRequestLocale: () => {},
}));

// Each section is a heavy (often async, client-hook-laden) component with
// its own dedicated test file -- stub them all here so this test can focus
// purely on the page-level <main> landmark wiring.
vi.mock("@/features/hero/HeroSection", () => ({
  HeroSection: () => <div>Hero stub</div>,
}));
vi.mock("@/features/founder-story/FounderStoryView", () => ({
  FounderStoryView: () => <div>Founder stub</div>,
}));
vi.mock("@/features/tech-stack/TechStackSection", () => ({
  TechStackSection: () => <div>Tech Stack stub</div>,
}));
vi.mock("@/features/tech-lab/TechLabSection", () => ({
  TechLabSection: () => <div>Tech Lab stub</div>,
}));
vi.mock("@/features/contact/ContactSection", () => ({
  ContactSection: () => <div>Contact stub</div>,
}));

import LocaleHomePage from "./page";

describe("LocaleHomePage", () => {
  it("wraps every section in a single <main id='main-content'> landmark", async () => {
    const ui = await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    expect(main).toContainElement(screen.getByText("Hero stub"));
    expect(main).toContainElement(screen.getByText("Contact stub"));
  });
});
