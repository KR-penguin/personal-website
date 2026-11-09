import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import sitemap from "./sitemap";

const SITE = "https://example.test/site";

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", SITE);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("sitemap", () => {
  it("lists the root and both locale home pages at their trailing-slash URLs", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual([`${SITE}/`, `${SITE}/en/`, `${SITE}/ko/`]);
  });

  it("cross-links each entry to both locales, with the language-picking root as x-default", () => {
    for (const entry of sitemap()) {
      expect(entry.alternates?.languages).toEqual({
        en: `${SITE}/en/`,
        ko: `${SITE}/ko/`,
        "x-default": `${SITE}/`,
      });
    }
  });
});
