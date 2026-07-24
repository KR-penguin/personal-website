import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { ConstellationGraph } from "./ConstellationGraph";
import { knowledgeCosmosContent } from "@/content/knowledgeCosmos";

const concepts = knowledgeCosmosContent.en.concepts;

describe("ConstellationGraph", () => {
  it("does not nest interactive nodes inside an image role, and hides decorative edges from assistive tech", () => {
    mockMatchMedia(true);
    const { container } = render(<ConstellationGraph concepts={concepts} />);

    expect(container.querySelector("svg[role='img']")).not.toBeInTheDocument();
    const lines = container.querySelectorAll("line");
    expect(lines.length).toBeGreaterThan(0);
    lines.forEach((line) => {
      expect(line).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("gives keyboard-focused nodes a visible focus-visible outline instead of suppressing it outright", () => {
    mockMatchMedia(true);
    render(<ConstellationGraph concepts={concepts} />);

    // SVG elements expose `.className` as an SVGAnimatedString, not a plain
    // string, so read the raw attribute instead.
    const firstNode = screen.getByRole("button", { name: concepts[0].title });
    const classAttr = firstNode.getAttribute("class") ?? "";
    expect(classAttr).not.toBe("cursor-pointer focus:outline-none");
    expect(classAttr).toContain("focus-visible:outline");
  });

  it("marks the concept-explanation panel as an aria-live region so selection is announced", () => {
    mockMatchMedia(true);
    render(<ConstellationGraph concepts={concepts} />);

    fireEvent.click(screen.getByRole("button", { name: concepts[0].title }));

    const panel = screen.getByTestId("concept-explanation");
    expect(panel).toHaveAttribute("aria-live", "polite");
  });
});
