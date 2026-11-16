import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { CopyButton } from "@/components/CopyButton";
import { SpacedText } from "@/components/typography/SpacedText";
import { AI_INTRO_TEXT, aiIntroContent } from "@/content/aiIntro";
import { pickLocale } from "@/lib/content";

interface AiIntroSectionProps {
  locale: AppLocale;
}

export async function AiIntroSection({ locale }: AiIntroSectionProps) {
  const t = await getTranslations("aiIntro");
  const content = pickLocale(aiIntroContent, locale);

  return (
    <section id="ai-intro" className="border-t-2 border-ink">
      <header className="flex flex-col gap-4 border-b-2 border-ink px-6 py-8">
        <p className="text-xs font-extrabold tracking-[.5em] text-accent">
          <SpacedText>{t("kicker")}</SpacedText>
        </p>
        <h2 className="text-[clamp(36px,5vw,72px)] leading-[1.02] tracking-[-0.03em] text-balance">
          {t("heading")}
        </h2>
      </header>

      <div className="p-6">
        <div className="border-2 border-ink">
          <div className="flex items-center justify-between gap-4 border-b-2 border-ink bg-raised py-2 pr-2 pl-4">
            <span className="truncate text-xs font-semibold text-muted">{content.panelLabel}</span>
            <CopyButton
              text={AI_INTRO_TEXT}
              copyLabel={content.copyLabel}
              copiedLabel={content.copiedLabel}
              className="shrink-0 border-accent bg-accent text-on-accent hover:bg-transparent hover:text-accent"
              fallbackTargetId="ai-intro-text"
            />
          </div>
          {/* Focusable so keyboard users can scroll the long text. */}
          <pre
            id="ai-intro-text"
            tabIndex={0}
            aria-label={content.panelLabel}
            className="max-h-[520px] overflow-y-auto p-4 font-mono text-[13px] leading-[1.7] whitespace-pre-wrap text-ink [overflow-wrap:anywhere] sm:p-6"
          >
            {AI_INTRO_TEXT}
          </pre>
        </div>
      </div>
    </section>
  );
}
