import { beforeEach, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { SummaryModeProvider, useSummaryMode } from "./useSummaryMode";

describe("useSummaryMode", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("defaults to immersive mode (false) when nothing is stored", () => {
    const { result } = renderHook(() => useSummaryMode(), {
      wrapper: SummaryModeProvider,
    });

    expect(result.current.summaryMode).toBe(false);
  });

  it("persists a manual toggle to localStorage", () => {
    const { result } = renderHook(() => useSummaryMode(), {
      wrapper: SummaryModeProvider,
    });

    act(() => {
      result.current.setSummaryMode(true);
    });

    expect(result.current.summaryMode).toBe(true);
    expect(window.localStorage.getItem("summaryMode")).toBe("true");
  });

  it("hydrates from a previously persisted value on mount", () => {
    window.localStorage.setItem("summaryMode", "true");

    const { result } = renderHook(() => useSummaryMode(), {
      wrapper: SummaryModeProvider,
    });

    expect(result.current.summaryMode).toBe(true);
  });

  it("falls back to immersive mode with a no-op setter when rendered without a provider", () => {
    const { result } = renderHook(() => useSummaryMode());

    expect(result.current.summaryMode).toBe(false);
    expect(() => result.current.setSummaryMode(true)).not.toThrow();
  });
});
