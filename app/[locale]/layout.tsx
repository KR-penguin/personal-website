import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Providers } from "@/app/providers";
import { SiteNav } from "@/features/navigation/SiteNav";
import { SkipLink } from "@/features/navigation/SkipLink";
import "../globals.css";

const MAIN_CONTENT_ID = "main-content";

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
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: t("title"),
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
