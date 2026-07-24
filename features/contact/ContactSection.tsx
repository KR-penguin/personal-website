import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { CONTACT_EMAIL, contactContent } from "@/content/contact";
import { pickLocale } from "@/lib/content";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

interface ContactSectionProps {
  locale: AppLocale;
}

export async function ContactSection({ locale }: ContactSectionProps) {
  const t = await getTranslations("contact");
  const content = pickLocale(contactContent, locale);

  return (
    <section id="contact" className="w-full bg-cosmos-surface px-6 py-24 sm:px-10">
      <ScrollReveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="font-display text-3xl font-semibold text-cosmos-text sm:text-4xl">
          {t("heading")}
        </h2>
        <p className="text-lg text-cosmos-text-muted">{content.cta}</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-full bg-cosmos-accent px-8 py-3 font-display text-base font-semibold text-cosmos-background transition-colors hover:bg-cosmos-accent-secondary"
        >
          {t("emailButton")}
        </a>
      </ScrollReveal>
    </section>
  );
}
