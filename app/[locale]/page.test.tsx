import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// The real next-intl/server's setRequestLocale assumes an RSC runtime and
// throws under vitest's client-like jsdom environment; page.tsx only needs
// it to be called, not to do anything, here.
vi.mock("next-intl/server", () => ({
  setRequestLocale: () => {},
}));

// Each section is an async server component with its own dedicated test
// file -- stub them all here so this test can focus purely on page wiring.
vi.mock("@/features/hero/HeroSection", () => ({
  HeroSection: () => <div>Hero stub</div>,
}));
vi.mock("@/features/founder-story/FounderStorySection", () => ({
  FounderStorySection: () => <div>Founder stub</div>,
}));
vi.mock("@/features/tech-stack/TechStackSection", () => ({
  TechStackSection: () => <div>Tech Stack stub</div>,
}));
vi.mock("@/features/contact/ContactSection", () => ({
  ContactSection: () => <div>Contact stub</div>,
}));
vi.mock("@/features/footer/SiteFooter", () => ({
  SiteFooter: () => <footer>Footer stub</footer>,
}));
vi.mock("@/components/motion/Marquee", () => ({
  Marquee: () => <div>Marquee stub</div>,
}));

import LocaleHomePage from "./page";

describe("LocaleHomePage", () => {
  it("wraps every section in a single <main id='main-content'> landmark, footer after it", async () => {
    const ui = await LocaleHomePage({ params: Promise.resolve({ locale: "en" }) });
    render(ui);

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("id", "main-content");
    const sections = ["Hero stub", "Founder stub", "Marquee stub", "Tech Stack stub", "Contact stub"];
    expect(Array.from(main.children).map((child) => child.textContent)).toEqual(sections);
    expect(main).not.toContainElement(screen.getByText("Footer stub"));
  });
});
