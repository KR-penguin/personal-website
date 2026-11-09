import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import en from "@/messages/en.json";
import ko from "@/messages/ko.json";
import { seoContent } from "@/content/seo";

const MESSAGES_BY_LOCALE: Record<string, Record<string, Record<string, string>>> = {
  en: en as Record<string, Record<string, string>>,
  ko: ko as Record<string, Record<string, string>>,
};

// next/font/google requires Next.js's build-time font loader, which isn't
// available under vitest; stub it with the same shape (a `variable` class).
vi.mock("next/font/google", () => ({
  Archivo: () => ({ variable: "--font-archivo" }),
}));

// Mirrors the {locale, namespace} call shape LocaleLayout's generateMetadata
// actually uses (see app/[locale]/layout.tsx).
vi.mock("next-intl/server", () => ({
  getTranslations: async ({ locale, namespace }: { locale: string; namespace?: string }) => {
    const messages = MESSAGES_BY_LOCALE[locale];
    return (key: string) => (namespace ? messages[namespace][key] : messages[key.split(".")[0]][key.split(".")[1]]);
  },
}));

import { generateMetadata } from "./layout";

const SITE = "https://example.test/site";

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", SITE);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("generateMetadata", () => {
  it("returns the English title, description, and OG/Twitter metadata", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });

    expect(metadata.title).toBe(en.site.title);
    expect(metadata.description).toBe(seoContent.en.description);
    expect(metadata.openGraph).toMatchObject({
      title: en.site.title,
      description: seoContent.en.description,
      locale: "en_US",
      type: "website",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: en.site.title,
      description: seoContent.en.description,
    });
  });

  it("returns the Korean title, description, and OG/Twitter metadata", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: "ko" }) });

    expect(metadata.title).toBe(ko.site.title);
    expect(metadata.description).toBe(seoContent.ko.description);
    expect(metadata.openGraph).toMatchObject({
      title: ko.site.title,
      description: seoContent.ko.description,
      locale: "ko_KR",
      type: "website",
    });
  });

  it("sets metadataBase and hreflang alternates for both locales", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });

    expect(metadata.metadataBase?.toString()).toBe(SITE);
    expect(metadata.alternates?.languages).toEqual({
      en: `${SITE}/en/`,
      ko: `${SITE}/ko/`,
      "x-default": `${SITE}/`,
    });
  });

  it("points the OG and Twitter card image at the locale's .png file", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: "ko" }) });
    const image = {
      url: `${SITE}/ko/og.png`,
      width: 1200,
      height: 630,
      alt: ko.site.title,
      type: "image/png",
    };

    expect(metadata.openGraph?.images).toEqual([image]);
    expect(metadata.twitter?.images).toEqual([image]);
  });
});
