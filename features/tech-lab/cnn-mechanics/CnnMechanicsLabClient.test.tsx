import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { cnnMechanicsContent } from "@/content/techLab/cnnMechanics";
import { CnnMechanicsLabClient } from "./CnnMechanicsLabClient";

describe("CnnMechanicsLabClient", () => {
  it("lazy-loads and renders the real CnnMechanicsLab (ssr:false, client-only)", async () => {
    mockMatchMedia(false);
    render(<CnnMechanicsLabClient locale="en" />);

    // Content only appears once next/dynamic's client-only import resolves.
    expect(await screen.findByText(cnnMechanicsContent.en.labels.title)).toBeInTheDocument();
    expect(screen.getByLabelText(cnnMechanicsContent.en.labels.canvasLabel)).toBeInTheDocument();
  });
});
