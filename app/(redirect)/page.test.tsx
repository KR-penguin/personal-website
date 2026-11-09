import { afterEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import RootPage from "./page";

describe("RootPage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("redirects to the Korean locale when the browser prefers Korean", () => {
    const replace = vi.fn();
    vi.stubGlobal("navigator", { languages: ["ko-KR"], language: "ko-KR" });
    vi.stubGlobal("location", { replace });

    render(<RootPage />);

    expect(replace).toHaveBeenCalledWith("ko/");
  });

  it("redirects to English by default for a non-Korean browser", () => {
    const replace = vi.fn();
    vi.stubGlobal("navigator", { languages: ["en-US"], language: "en-US" });
    vi.stubGlobal("location", { replace });

    render(<RootPage />);

    expect(replace).toHaveBeenCalledWith("en/");
  });
});
