import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { SpacedText } from "@/components/typography/SpacedText";
import { CONTACT_EMAIL, contactContent } from "@/content/contact";
import { pickLocale } from "@/lib/content";
import { CopyEmailButton } from "./CopyEmailButton";

interface ContactSectionProps {
  locale: AppLocale;
}

export async function ContactSection({ locale }: ContactSectionProps) {
  const t = await getTranslations("contact");
  const content = pickLocale(contactContent, locale);

  return (
    // The default accent focus ring would vanish on the accent background.
    <section
      id="contact"
      className="border-t-2 border-ink bg-accent text-on-accent [&_:focus-visible]:outline-on-accent"
    >
      <div className="flex justify-between gap-4 px-6 pt-8 text-xs font-extrabold tracking-[.5em]">
        <span>
          <SpacedText>{t("kicker")}</SpacedText>
        </span>
        <span aria-hidden="true">04</span>
      </div>
      <div className="overflow-hidden py-6">
        <h2 className="px-6 text-[clamp(72px,14vw,240px)] leading-[.92] font-black tracking-[-0.05em]">
          {t("heading")}
        </h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] border-t-2 border-on-accent">
        <div className="flex flex-col gap-4 border-r-2 border-on-accent p-6">
          <p className="text-[clamp(20px,2vw,28px)] leading-[1.3] font-bold text-pretty">
            {content.cta}
          </p>
        </div>
        <div className="flex flex-col gap-6 p-6">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-display text-[clamp(24px,3vw,44px)] leading-none font-extrabold tracking-[-0.02em] break-all underline decoration-[3px] underline-offset-8 select-all font-stretch-110%"
          >
            {CONTACT_EMAIL}
          </a>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex min-w-[200px] justify-between gap-6 border-2 border-on-accent bg-on-accent px-4 py-3 text-[15px] font-extrabold text-accent transition-colors hover:bg-transparent hover:text-on-accent"
            >
              <span>{t("emailButton")}</span>
              <span aria-hidden="true">→</span>
            </a>
            <CopyEmailButton
              email={CONTACT_EMAIL}
              copyLabel={content.copyLabel}
              copiedLabel={content.copiedLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
