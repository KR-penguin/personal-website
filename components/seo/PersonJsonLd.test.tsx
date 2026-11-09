import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import en from "@/messages/en.json";
import ko from "@/messages/ko.json";
import { heroContent } from "@/content/hero";
import { seoContent } from "@/content/seo";

const MESSAGES_BY_LOCALE: Record<string, Record<string, Record<string, string>>> = {
  en: en as Record<string, Record<string, string>>,
  ko: ko as Record<string, Record<string, string>>,
};

vi.mock("next-intl/server", () => ({
  getTranslations: async ({ locale, namespace }: { locale: string; namespace?: string }) => {
    const messages = MESSAGES_BY_LOCALE[locale];
    return (key: string) => (namespace ? messages[namespace][key] : messages[key.split(".")[0]][key.split(".")[1]]);
  },
}));

import { PersonJsonLd } from "./PersonJsonLd";

const SITE = "https://example.test/site";

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", SITE);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

function readJsonLd(container: HTMLElement) {
  const script = container.querySelector('script[type="application/ld+json"]');
  expect(script).not.toBeNull();
  return JSON.parse(script!.textContent ?? "{}");
}

describe("PersonJsonLd", () => {
  it("renders a schema.org Person reusing the English hero and SEO content", async () => {
    const ui = await PersonJsonLd({ locale: "en" });
    const { container } = render(ui);
    const schema = readJsonLd(container);

    expect(schema).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Person",
      name: en.site.title,
      jobTitle: heroContent.en.roleLine,
      description: seoContent.en.description,
      url: `${SITE}/en/`,
    });
  });

  it("renders a schema.org Person reusing the Korean hero and SEO content", async () => {
    const ui = await PersonJsonLd({ locale: "ko" });
    const { container } = render(ui);
    const schema = readJsonLd(container);

    expect(schema).toMatchObject({
      name: ko.site.title,
      jobTitle: heroContent.ko.roleLine,
      description: seoContent.ko.description,
      url: `${SITE}/ko/`,
    });
  });
});
