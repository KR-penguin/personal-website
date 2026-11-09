import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "./robots";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("robots", () => {
  it("allows all crawlers and points to the sitemap under the site URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.test/site");
    const result = robots();

    expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe("https://example.test/site/sitemap.xml");
  });
});
