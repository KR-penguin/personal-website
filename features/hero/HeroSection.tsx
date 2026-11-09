import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { Marquee } from "@/components/motion/Marquee";
import { heroContent } from "@/content/hero";
import { HERO_BITS } from "@/content/marquee";
import { pickLocale } from "@/lib/content";
import { HeroWordmark } from "./HeroWordmark";

interface HeroSectionProps {
  locale: AppLocale;
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations("hero");
  const tSite = await getTranslations("site");
  const { tagline, taglineEmphasis } = pickLocale(heroContent, locale);

  const emphasisAt = tagline.indexOf(taglineEmphasis);
  const before = tagline.slice(0, emphasisAt);
  const after = tagline.slice(emphasisAt + taglineEmphasis.length);

  return (
    <section id="hero" className="relative flex min-h-screen flex-col justify-between">
      <Marquee
        text={HERO_BITS}
        speed={28}
        className="border-b-2 border-rule"
        trackClassName="text-muted tabular-nums"
      />

      <HeroWordmark lineOne={t("lineOne")} lineTwo={t("lineTwo")} />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] border-t-2 border-ink">
        <div className="border-r-2 border-rule p-6">
          <h1 className="text-[clamp(48px,7vw,104px)] leading-none tracking-[-0.03em]">
            {tSite("title")}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 p-6">
          <p className="text-center text-[clamp(14px,1.8vw,28px)] leading-[1.3] font-semibold sm:whitespace-nowrap">
            {/* The English line is roughly twice as long, so it runs smaller to stay on one line. */}
            <span className={locale === "en" ? "text-[.72em]" : undefined}>
              {before}
              <span className="text-outline font-black">{taglineEmphasis}</span>
              {after}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
