import { afterEach, describe, expect, it, vi } from "vitest";

async function loadBasePath() {
  vi.resetModules();
  return import("./basePath");
}

describe("BASE_PATH", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is the domain root when NEXT_PUBLIC_BASE_PATH is unset (Vercel, next dev)", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", undefined);
    const { BASE_PATH, assetPath } = await loadBasePath();
    expect(BASE_PATH).toBe("");
    expect(assetPath("/images/a.webp")).toBe("/images/a.webp");
  });

  it("uses NEXT_PUBLIC_BASE_PATH when set (the GitHub Pages build)", async () => {
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/personal-website");
    const { BASE_PATH, assetPath } = await loadBasePath();
    expect(BASE_PATH).toBe("/personal-website");
    expect(assetPath("/images/a.webp")).toBe("/personal-website/images/a.webp");
  });
});
