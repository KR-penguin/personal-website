import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists the root and both locale home pages", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toEqual([
      "http://localhost:3000",
      "http://localhost:3000/en",
      "http://localhost:3000/ko",
    ]);
  });

  it("cross-links each entry's hreflang alternates to both locales", () => {
    const entries = sitemap();

    for (const entry of entries) {
      expect(entry.alternates?.languages).toMatchObject({
        en: "http://localhost:3000/en",
        ko: "http://localhost:3000/ko",
      });
    }
  });
});
