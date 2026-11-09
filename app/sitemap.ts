import type { MetadataRoute } from "next";
import { languageAlternates, pageUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";

// Required for `output: "export"` — this route has no request-time data.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = languageAlternates();

  return [
    {
      url: pageUrl(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    ...routing.locales.map((locale) => ({
      url: pageUrl(locale),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages },
    })),
  ];
}
