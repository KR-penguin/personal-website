import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { ScrollReveal } from "./ScrollReveal";

describe("ScrollReveal", () => {
  it("renders children as a plain static element under reduced motion", () => {
    mockMatchMedia(true);
    render(
      <ScrollReveal as="li" className="test-class">
        <span>Reveal content</span>
      </ScrollReveal>
    );

    const content = screen.getByText("Reveal content");
    expect(content).toBeInTheDocument();

    const wrapper = content.closest("li");
    expect(wrapper).toHaveClass("test-class");
    expect(wrapper).not.toHaveAttribute("style");
  });

  it("renders children inside a motion element (with inline animation styles) when motion is allowed", () => {
    mockMatchMedia(false);
    render(
      <ScrollReveal as="div" className="test-class">
        <span>Reveal content</span>
      </ScrollReveal>
    );

    const content = screen.getByText("Reveal content");
    const wrapper = content.closest("div");
    expect(wrapper).toHaveClass("test-class");
    // framer-motion applies the initial animation state as an inline style
    // before whileInView triggers, unlike the reduced-motion static branch.
    expect(wrapper).toHaveAttribute("style");
  });
});
