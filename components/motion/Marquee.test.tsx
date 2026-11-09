import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { Marquee } from "./Marquee";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Marquee", () => {
  it("renders its text twice inside a decorative, aria-hidden strip", () => {
    mockMatchMedia(true);
    render(<Marquee text="1 0 1 " speed={20} />);

    const track = screen.getByTestId("marquee-track");
    expect(track.textContent).toBe("1 0 1 1 0 1 ");
    expect(track.parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("stays still when the user prefers reduced motion", () => {
    mockMatchMedia(true);
    const raf = vi.spyOn(window, "requestAnimationFrame");
    render(<Marquee text="1 0 " speed={20} />);

    expect(raf).not.toHaveBeenCalled();
    expect(screen.getByTestId("marquee-track").style.transform).toBe("");
  });

  it("animates with requestAnimationFrame otherwise, and stops on unmount", () => {
    mockMatchMedia(false);
    const raf = vi.spyOn(window, "requestAnimationFrame").mockReturnValue(7);
    const cancel = vi.spyOn(window, "cancelAnimationFrame");
    const { unmount } = render(<Marquee text="1 0 " speed={20} />);

    expect(raf).toHaveBeenCalled();
    unmount();
    expect(cancel).toHaveBeenCalledWith(7);
  });
});
