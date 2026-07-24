import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${siteUrl}/${locale}`])
  );

  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    ...routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages },
    })),
  ];
}
