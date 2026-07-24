import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/features/hero/HeroSection";
import { FounderStoryView } from "@/features/founder-story/FounderStoryView";
import { CareerTimelineView } from "@/features/career-timeline/CareerTimelineView";
import { TechLabSection } from "@/features/tech-lab/TechLabSection";
import { KnowledgeCosmosSection } from "@/features/knowledge-cosmos/KnowledgeCosmosSection";
import { PhilosophySection } from "@/features/philosophy/PhilosophySection";
import { ContactSection } from "@/features/contact/ContactSection";
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
    <main id="main-content">
      <HeroSection locale={appLocale} />
      <FounderStoryView locale={appLocale} />
      <CareerTimelineView locale={appLocale} />
      <TechLabSection locale={appLocale} />
      <KnowledgeCosmosSection locale={appLocale} />
      <PhilosophySection locale={appLocale} />
      <ContactSection locale={appLocale} />
    </main>
  );
}
