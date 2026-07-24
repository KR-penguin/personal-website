import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("allows all crawlers and points to the sitemap", () => {
    const result = robots();

    expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toBe("http://localhost:3000/sitemap.xml");
  });
});
