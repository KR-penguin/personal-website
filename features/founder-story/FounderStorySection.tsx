import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { SpacedText } from "@/components/typography/SpacedText";
import { founderStoryContent, workProjects } from "@/content/founderStory";
import { pickLocale, resolveText } from "@/lib/content";
import { WorkBlock } from "./WorkBlock";

interface FounderStorySectionProps {
  locale: AppLocale;
}

const pad = (value: number, width: number) => String(value).padStart(width, "0");

// Row grid shared by each project's title row and body: an index column, then
// the content. Collapses to a single column on narrow screens.
const ROW_GRID = "grid grid-cols-1 sm:grid-cols-[minmax(120px,160px)_minmax(0,1fr)]";

export async function FounderStorySection({ locale }: FounderStorySectionProps) {
  const t = await getTranslations("founderStory");
  const { stats, processNote } = pickLocale(founderStoryContent, locale);
  const total = pad(workProjects.length, 2);

  return (
    <section id="founder-story" className="border-t-2 border-ink">
      <header className="border-b-2 border-rule px-6 py-8">
        <h2 className="text-[clamp(44px,6vw,88px)] leading-none tracking-[-0.03em]">
          {t("heading")}
        </h2>
      </header>

      <dl
        aria-label={t("statsLabel")}
        className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border-b-2 border-ink"
      >
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className="flex flex-col gap-2 border-rule p-6 [&:not(:last-child)]:border-r-2"
          >
            <dt className="text-xs font-semibold text-muted">
              ({pad(index + 1, 2)}) {stat.label}
            </dt>
            <dd className="font-display text-[clamp(48px,6vw,88px)] leading-none font-black tracking-[-0.04em] text-accent font-stretch-115%">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink px-6 pt-8 pb-4">
        <h3 className="text-[clamp(32px,4vw,56px)] leading-none font-black tracking-[.3em] font-stretch-125%">
          <SpacedText>{t("work")}</SpacedText>
        </h3>
        <span className="text-xs font-semibold text-muted tabular-nums">/ {total}</span>
      </div>

      <ul>
        {workProjects.map((project, index) => {
          const number = index + 1;
          return (
            <li key={project.id} className="border-b-2 border-rule last:border-ink">
              <div className={`${ROW_GRID} items-baseline gap-1 px-6 py-4 sm:gap-6`}>
                <span className="text-xs font-semibold tabular-nums opacity-65">
                  #w{pad(number, 3)}-{pad(number, 4)}/{total}
                </span>
                <h4 className="text-[clamp(22px,2.4vw,34px)] leading-[1.1] tracking-[-0.02em] [overflow-wrap:anywhere]">
                  {project.title}
                  {project.titleNote && (
                    <>
                      {" "}
                      <span className="font-semibold opacity-55">
                        {resolveText(project.titleNote, locale)}
                      </span>
                    </>
                  )}
                </h4>
              </div>
              <div className={`${ROW_GRID} gap-6 px-6 pt-2 pb-6`}>
                <span aria-hidden="true" className="hidden sm:block" />
                <div
                  className={`flex flex-col gap-3 text-muted ${project.wide ? "max-w-[960px]" : "max-w-[720px]"}`}
                >
                  {project.blocks.map((block, blockIndex) => (
                    <WorkBlock key={`${block.kind}-${blockIndex}`} block={block} locale={locale} />
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))]">
        <p className="border-r-2 border-rule p-6 text-xs font-extrabold tracking-[.5em] text-accent">
          <SpacedText>{t("process")}</SpacedText>
        </p>
        <p className="p-6 text-[15px] leading-[1.6] text-pretty text-muted">{processNote}</p>
      </div>
    </section>
  );
}
