import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { pageUrl } from "@/lib/site";
import { heroContent } from "@/content/hero";
import { seoContent } from "@/content/seo";

interface PersonJsonLdProps {
  locale: AppLocale;
}

// Renders a schema.org Person graph so search engines can attribute the
// site to Sean Channie Quinn directly, reusing the same hero/SEO content
// already shown on the page instead of duplicating copy here.
export async function PersonJsonLd({ locale }: PersonJsonLdProps) {
  const t = await getTranslations({ locale, namespace: "site" });
  const { roleLine } = pickLocale(heroContent, locale);
  const { description } = pickLocale(seoContent, locale);
  const url = pageUrl(locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t("title"),
    jobTitle: roleLine,
    description,
    url,
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the serialized JSON can never prematurely close this tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
