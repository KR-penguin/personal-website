import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

describe("usePrefersReducedMotion", () => {
  it("reflects the current prefers-reduced-motion media query", () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
  });

  it("returns false when reduced motion is not preferred", () => {
    mockMatchMedia(false);

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
  });
});
