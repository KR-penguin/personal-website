import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { SpacedText } from "@/components/typography/SpacedText";
import { techStackContent } from "@/content/techStack";
import { pickLocale } from "@/lib/content";

interface TechStackSectionProps {
  locale: AppLocale;
}

export async function TechStackSection({ locale }: TechStackSectionProps) {
  const t = await getTranslations("techStack");
  const { categories, achievements } = pickLocale(techStackContent, locale);

  return (
    <section id="tech-stack" className="bg-raised">
      <header className="flex flex-col gap-4 border-b-2 border-ink px-6 py-8">
        <p className="text-xs font-extrabold tracking-[.5em] text-accent">
          <SpacedText>{t("kicker")}</SpacedText>
        </p>
        <h2 className="text-[clamp(44px,6vw,88px)] leading-none tracking-[-0.03em]">
          {t("heading")}
        </h2>
      </header>

      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className="grid grid-cols-1 gap-1 border-b-2 border-rule px-6 py-4 last:border-ink sm:grid-cols-[minmax(160px,1fr)_minmax(0,2fr)] sm:gap-6"
          >
            <h3 className="text-sm">{category.title}</h3>
            <p className="text-[17px] leading-[1.5] font-semibold">{category.summary}</p>
          </li>
        ))}
      </ul>

      <div className="border-b-2 border-ink px-6 pt-8 pb-4">
        <h3 className="text-[clamp(32px,4vw,56px)] leading-none font-black tracking-[.3em] font-stretch-125%">
          <SpacedText>{t("achievementsHeading")}</SpacedText>
        </h3>
      </div>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] border-b-2 border-ink">
        {achievements.map((achievement, index) => (
          <li
            key={achievement.id}
            className="flex flex-col gap-4 border-rule p-6 [&:not(:last-child)]:border-r-2"
          >
            <span className="font-display text-[56px] leading-none font-black text-accent font-stretch-125%">
              A.{String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-[22px] leading-[1.3] font-extrabold text-pretty">
              {achievement.text}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
