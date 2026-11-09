import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import en from "@/messages/en.json";
import ko from "@/messages/ko.json";
import { seoContent } from "@/content/seo";
import { generateMetadata } from "./layout";

const SITE = "https://example.test/site";

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", SITE);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("redirect root layout metadata", () => {
  it("gives the language-neutral / page a title with both names and a description", () => {
    const metadata = generateMetadata();

    expect(metadata.title).toBe(`${en.site.title} · ${ko.site.title}`);
    expect(metadata.description).toBe(seoContent.en.description);
  });

  // Link-preview crawlers don't run the client-side redirect, so "/" itself
  // must carry the social card.
  it("carries an OG and Twitter card that uses the English og.png", () => {
    const metadata = generateMetadata();

    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({ url: `${SITE}/en/og.png`, width: 1200, height: 630, type: "image/png" }),
    ]);
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.twitter?.images).toEqual(metadata.openGraph?.images);
  });

  it("joins the locale pages' hreflang set as x-default", () => {
    expect(generateMetadata().alternates?.languages).toEqual({
      en: `${SITE}/en/`,
      ko: `${SITE}/ko/`,
      "x-default": `${SITE}/`,
    });
  });
});
