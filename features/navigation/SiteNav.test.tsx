import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "@/messages/en.json";
import { mockMatchMedia } from "@/test/matchMedia";
import { SummaryModeProvider } from "@/hooks/useSummaryMode";
import { SiteNav } from "./SiteNav";

function renderSiteNav() {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      <SummaryModeProvider>
        <SiteNav />
      </SummaryModeProvider>
    </NextIntlClientProvider>
  );
}

describe("SiteNav", () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockMatchMedia(false);
  });

  it("renders a nav link for all 7 sections and the summary-mode toggle", () => {
    renderSiteNav();

    expect(screen.getByText(en.nav.home)).toBeInTheDocument();
    expect(screen.getByText(en.founderStory.heading)).toBeInTheDocument();
    expect(screen.getByText(en.careerTimeline.heading)).toBeInTheDocument();
    expect(screen.getByText(en.techLab.heading)).toBeInTheDocument();
    expect(screen.getByText(en.knowledgeCosmos.heading)).toBeInTheDocument();
    expect(screen.getByText(en.philosophy.heading)).toBeInTheDocument();
    expect(screen.getByText(en.contact.heading)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: en.nav.summaryToggle })).toBeInTheDocument();
  });

  it("flips the toggle's aria-pressed state (and summary mode) when clicked", () => {
    renderSiteNav();

    const toggle = screen.getByRole("button", { name: en.nav.summaryToggle });
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(window.localStorage.getItem("summaryMode")).toBe("true");
  });
});
