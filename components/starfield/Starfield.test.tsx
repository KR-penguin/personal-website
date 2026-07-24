import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Starfield } from "./Starfield";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

function mockCanvasContext() {
  const context = {
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    fill: vi.fn(),
    arc: vi.fn(),
    setTransform: vi.fn(),
    fillStyle: "",
  };
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    context as unknown as CanvasRenderingContext2D
  );
  return context;
}

describe("Starfield", () => {
  beforeEach(() => {
    mockCanvasContext();
    window.requestAnimationFrame = vi.fn(() => 0);
    window.cancelAnimationFrame = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a canvas element without throwing", () => {
    mockMatchMedia(false);

    const { container } = render(<Starfield />);

    expect(container.querySelector("canvas")).toBeInTheDocument();
  });

  it("does not start an animation loop when reduced motion is preferred", () => {
    mockMatchMedia(true);

    render(<Starfield />);

    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });
});
