import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";
import { routing, type AppLocale } from "@/i18n/routing";
import { pickLocale } from "@/lib/content";
import { getSiteUrl } from "@/lib/site";
import { seoContent } from "@/content/seo";
import { Providers } from "@/app/providers";
import { SiteNav } from "@/features/navigation/SiteNav";
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

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      locale: OPEN_GRAPH_LOCALE[appLocale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${siteUrl}/${loc}`])
      ),
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
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-cosmos-background font-body text-cosmos-text antialiased">
        <PersonJsonLd locale={locale} />
        <SkipLink label={t("skipToContent")} targetId={MAIN_CONTENT_ID} />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <SiteNav />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
