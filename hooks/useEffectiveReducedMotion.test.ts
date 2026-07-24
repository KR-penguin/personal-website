import { beforeEach, describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { mockMatchMedia } from "@/test/matchMedia";
import { SummaryModeProvider } from "./useSummaryMode";
import { useEffectiveReducedMotion } from "./useEffectiveReducedMotion";

describe("useEffectiveReducedMotion", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("is false when neither OS reduced motion nor summary mode is on", () => {
    mockMatchMedia(false);

    const { result } = renderHook(() => useEffectiveReducedMotion(), {
      wrapper: SummaryModeProvider,
    });

    expect(result.current).toBe(false);
  });

  it("is true when the OS prefers reduced motion, regardless of summary mode", () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useEffectiveReducedMotion(), {
      wrapper: SummaryModeProvider,
    });

    expect(result.current).toBe(true);
  });

  it("is true when summary mode is manually enabled, even without OS reduced motion", () => {
    mockMatchMedia(false);
    window.localStorage.setItem("summaryMode", "true");

    const { result } = renderHook(() => useEffectiveReducedMotion(), {
      wrapper: SummaryModeProvider,
    });

    expect(result.current).toBe(true);
  });
});
