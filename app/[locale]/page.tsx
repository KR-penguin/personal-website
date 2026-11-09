import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Marquee } from "@/components/motion/Marquee";
import { BAND_BITS } from "@/content/marquee";
import { HeroSection } from "@/features/hero/HeroSection";
import { FounderStorySection } from "@/features/founder-story/FounderStorySection";
import { TechStackSection } from "@/features/tech-stack/TechStackSection";
import { ContactSection } from "@/features/contact/ContactSection";
import { SiteFooter } from "@/features/footer/SiteFooter";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const appLocale = hasLocale(routing.locales, locale) ? locale : routing.defaultLocale;

  return (
    <>
      <main id="main-content">
        <HeroSection locale={appLocale} />
        <FounderStorySection locale={appLocale} />
        <Marquee
          text={BAND_BITS}
          speed={-40}
          className="border-y-2 border-ink bg-accent text-on-accent"
          trackClassName="font-bold"
        />
        <TechStackSection locale={appLocale} />
        <ContactSection locale={appLocale} />
      </main>
      <SiteFooter />
    </>
  );
}
