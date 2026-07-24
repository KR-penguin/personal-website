import { afterEach, describe, expect, it } from "vitest";
import { getSiteUrl } from "./site";

describe("getSiteUrl", () => {
  const originalValue = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalValue === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalValue;
    }
  });

  it("falls back to localhost when NEXT_PUBLIC_SITE_URL is unset", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    expect(getSiteUrl()).toBe("https://example.com");
  });
});
