import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { useCountUp } from "./useCountUp";

describe("useCountUp", () => {
  it("exposes the target value immediately without scheduling an animation frame when reduced motion is preferred", () => {
    mockMatchMedia(true);
    window.requestAnimationFrame = vi.fn(() => 0);

    const { result } = renderHook(() => useCountUp(80));

    expect(result.current.value).toBe(80);
    expect(window.requestAnimationFrame).not.toHaveBeenCalled();
  });
});
