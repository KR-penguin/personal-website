import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { archivo } from "@/app/fonts";
import { routing, type AppLocale } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { getSiteUrl, languageAlternates } from "@/lib/site";
import { OG_IMAGE_SIZE, ogImageUrl } from "@/lib/ogImage";
import { seoContent } from "@/content/seo";
import { LanguageToggle } from "@/features/language/LanguageToggle";
import { SkipLink } from "@/features/navigation/SkipLink";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import "../globals.css";

const MAIN_CONTENT_ID = "main-content";

// Open Graph expects underscore locale tags (en_US), not the bare BCP-47
// codes next-intl routes on.
const OPEN_GRAPH_LOCALE: Record<AppLocale, string> = {
  en: "en_US",
  ko: "ko_KR",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "site" });
  const { description } = pickLocale(seoContent, appLocale);
  const title = t("title");
  const image = { url: ogImageUrl(appLocale), ...OG_IMAGE_SIZE, alt: title, type: "image/png" };

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    openGraph: {
      title,
      description,
      locale: OPEN_GRAPH_LOCALE[appLocale],
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      languages: languageAlternates(),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    // data-scroll-behavior lets Next turn off globals.css's smooth scrolling
    // during route changes (e.g. the KO/EN toggle) so they jump to the top.
    <html lang={locale} className={archivo.variable} data-scroll-behavior="smooth">
      <body className="overflow-x-clip antialiased">
        <PersonJsonLd locale={locale} />
        <SkipLink label={t("skipToContent")} targetId={MAIN_CONTENT_ID} />
        <LanguageToggle locale={locale} label={t("language")} />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
