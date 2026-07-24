import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { FastInverseSqrtLab } from "./FastInverseSqrtLab";
import { accurateInverseSqrt, fastInverseSqrt, formatDecimal } from "./logic";
import { fastInverseSqrtContent } from "@/content/techLab/fastInverseSqrt";

describe("FastInverseSqrtLab", () => {
  it("renders the default x=2 results and updates the displayed values when x changes", () => {
    mockMatchMedia(false);

    render(<FastInverseSqrtLab locale="en" />);

    expect(screen.getByText(fastInverseSqrtContent.en.labels.title)).toBeInTheDocument();
    expect(screen.getByText(formatDecimal(accurateInverseSqrt(2)))).toBeInTheDocument();
    expect(screen.getByText(formatDecimal(fastInverseSqrt(2, 1)))).toBeInTheDocument();

    const numberInput = screen.getByLabelText("x", { selector: "input" });
    fireEvent.change(numberInput, { target: { value: "10" } });

    expect(screen.getByText(formatDecimal(accurateInverseSqrt(10)))).toBeInTheDocument();
    expect(screen.getByText(formatDecimal(fastInverseSqrt(10, 1)))).toBeInTheDocument();
  });

  it("recomputes the fast approximation when switching to 2 iterations", () => {
    mockMatchMedia(false);

    render(<FastInverseSqrtLab locale="en" />);

    // x = 10 keeps the 1- and 2-iteration results distinct at 6 decimal
    // places, unlike the default x = 2 where they round to the same string.
    const numberInput = screen.getByLabelText("x", { selector: "input" });
    fireEvent.change(numberInput, { target: { value: "10" } });

    const twoIterationsButton = screen.getByRole("button", {
      name: fastInverseSqrtContent.en.labels.twoIterations,
    });
    fireEvent.click(twoIterationsButton);

    expect(screen.getByText(formatDecimal(fastInverseSqrt(10, 2)))).toBeInTheDocument();
    expect(screen.queryByText(formatDecimal(fastInverseSqrt(10, 1)))).not.toBeInTheDocument();
    expect(twoIterationsButton).toHaveAttribute("aria-pressed", "true");
  });
});
