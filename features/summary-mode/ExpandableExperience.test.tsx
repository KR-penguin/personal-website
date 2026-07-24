import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { SummaryModeProvider } from "@/hooks/useSummaryMode";
import { ExpandableExperience } from "./ExpandableExperience";

function renderWithSummaryMode(initialSummaryMode: boolean) {
  // Reduced motion keeps the new ScrollReveal-wrapped header/toggle region
  // rendering as a plain static div, matching this file's existing
  // instant-conditional-mount assertions.
  mockMatchMedia(true);
  window.localStorage.setItem("summaryMode", String(initialSummaryMode));

  return render(
    <SummaryModeProvider>
      <ExpandableExperience
        title="Demo Title"
        caption="Demo caption"
        expandLabel="Show demo"
        collapseLabel="Hide demo"
        collapsedContent={<p>Collapsed extra</p>}
      >
        <p>Demo content</p>
      </ExpandableExperience>
    </SummaryModeProvider>
  );
}

describe("ExpandableExperience", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts expanded when summary mode is off", () => {
    renderWithSummaryMode(false);

    expect(screen.getByText("Demo content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hide demo" })).toBeInTheDocument();
  });

  it("starts collapsed, showing title/caption/extra content, when summary mode is on", () => {
    renderWithSummaryMode(true);

    expect(screen.queryByText("Demo content")).not.toBeInTheDocument();
    expect(screen.getByText("Demo Title")).toBeInTheDocument();
    expect(screen.getByText("Demo caption")).toBeInTheDocument();
    expect(screen.getByText("Collapsed extra")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show demo" })).toBeInTheDocument();
  });

  it("can always be manually expanded and re-collapsed regardless of summary mode", () => {
    renderWithSummaryMode(true);

    fireEvent.click(screen.getByRole("button", { name: "Show demo" }));
    expect(screen.getByText("Demo content")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Hide demo" }));
    expect(screen.queryByText("Demo content")).not.toBeInTheDocument();
  });
});
