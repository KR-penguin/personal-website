import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("renders a link to the target id with the given label", () => {
    render(<SkipLink label="Skip to content" targetId="main-content" />);

    const link = screen.getByRole("link", { name: "Skip to content" });
    expect(link).toHaveAttribute("href", "#main-content");
  });

  it("is visually hidden until focused (sr-only, revealed by focus:not-sr-only)", () => {
    render(<SkipLink label="Skip to content" targetId="main-content" />);

    const link = screen.getByRole("link", { name: "Skip to content" });
    expect(link.className).toContain("sr-only");
    expect(link.className).toContain("focus:not-sr-only");
  });
});
