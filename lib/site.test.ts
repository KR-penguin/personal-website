import { afterEach, describe, expect, it } from "vitest";
import { fileUrl, getSiteUrl, pageUrl } from "./site";

describe("getSiteUrl", () => {
  const originalValue = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalValue === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalValue;
    }
  });

  it("falls back to the deployed GitHub Pages URL when NEXT_PUBLIC_SITE_URL is unset", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe("https://kr-penguin.github.io/personal-website");
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    expect(getSiteUrl()).toBe("https://example.com");
  });

  it("builds page URLs with the trailing slash that trailingSlash: true serves them at", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.test/site";
    expect(pageUrl()).toBe("https://example.test/site/");
    expect(pageUrl("ko")).toBe("https://example.test/site/ko/");
  });

  it("builds file URLs without a trailing slash", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.test/site";
    expect(fileUrl("sitemap.xml")).toBe("https://example.test/site/sitemap.xml");
  });
});
