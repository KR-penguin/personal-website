import Image from "next/image";
import type { AppLocale } from "@/i18n/routing";
import type { WorkBlock as WorkBlockData, WorkFact, WorkImage, WorkLink } from "@/types/content";
import { SpacedText } from "@/components/typography/SpacedText";
import { assetPath } from "@/lib/basePath";
import { resolveText } from "@/lib/content";

interface WorkBlockProps {
  block: WorkBlockData;
  locale: AppLocale;
}

const GALLERY_LAYOUT: Record<Extract<WorkBlockData, { kind: "gallery" }>["layout"], string> = {
  pair: "grid-cols-[repeat(auto-fit,minmax(260px,1fr))]",
  pages: "grid-cols-[repeat(auto-fit,minmax(180px,1fr))]",
  "logo-and-wide": "grid-cols-[minmax(0,3fr)_minmax(0,7fr)] items-start",
};

const GALLERY_SIZES: Record<Extract<WorkBlockData, { kind: "gallery" }>["layout"], string> = {
  pair: "(min-width: 640px) 480px, 100vw",
  pages: "(min-width: 640px) 240px, 100vw",
  "logo-and-wide": "(min-width: 640px) 500px, 70vw",
};

const ASPECT: Record<WorkImage["aspect"], string> = {
  "7/3": "aspect-[7/3]",
  "16/9": "aspect-video",
  "1/1": "aspect-square",
  page: "aspect-[1/1.414]",
};

const BACKDROP: Record<WorkImage["backdrop"], string> = {
  raised: "bg-raised",
  white: "bg-white",
  black: "bg-black",
};

const OUTLINE_BUTTON =
  "flex items-center justify-between gap-6 border-2 border-ink px-3.5 py-2.5 text-sm font-extrabold text-ink transition-colors hover:border-accent hover:bg-accent hover:text-on-accent";

export function WorkBlock({ block, locale }: WorkBlockProps) {
  const text = (value: Parameters<typeof resolveText>[0]) => resolveText(value, locale);

  switch (block.kind) {
    case "summary":
      return (
        <p className="text-[15px] leading-[1.55] text-pretty text-ink">
          {text(block.text)}
          {block.highlight && (
            <>
              {" "}
              <span className="font-extrabold text-accent">{text(block.highlight)}</span>
            </>
          )}
        </p>
      );

    case "stat":
      return (
        <p className="text-[13px] font-semibold">
          {text(block.label)} <span className="font-extrabold text-accent">{text(block.value)}</span>
        </p>
      );

    case "note":
      return <p className="text-sm leading-[1.45] text-pretty">{text(block.text)}</p>;

    case "badge":
      return (
        <p className="self-start border-2 border-accent px-2 py-1 text-xs font-bold tracking-[.02em] text-accent">
          {text(block.text)}
        </p>
      );

    case "gallery":
      return (
        <div className={`grid gap-3 ${GALLERY_LAYOUT[block.layout]}`}>
          {block.images.map((image) => (
            <div
              key={image.src}
              className={`relative overflow-hidden border-2 border-ink ${ASPECT[image.aspect]} ${BACKDROP[image.backdrop]}`}
            >
              <Image
                src={assetPath(image.src)}
                alt={text(image.alt)}
                fill
                // Static export: there is no image optimizer, the WebP files are pre-sized.
                unoptimized
                sizes={GALLERY_SIZES[block.layout]}
                className={image.fit === "contain" ? "object-contain" : "object-cover object-top"}
              />
            </div>
          ))}
        </div>
      );

    case "links":
      return (
        <div className="flex flex-wrap items-stretch gap-3">
          {block.links.map((link) => (
            <ExternalButton
              key={link.href + text(link.label)}
              link={link}
              locale={locale}
              minWidth={block.links.length > 1 ? "min-w-[200px]" : "min-w-[220px]"}
            />
          ))}
          {block.facts && <FactsList facts={block.facts} locale={locale} />}
        </div>
      );

    case "repos":
      return (
        <ul className="border-t-2 border-ink">
          {block.repos.map((repo, index) => (
            <li key={repo.href} className="border-b-2 border-rule">
              <a
                href={repo.href}
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-baseline gap-4 px-3.5 py-2.5 text-ink transition-colors hover:bg-accent hover:text-on-accent"
              >
                <span className="text-xs font-semibold tabular-nums opacity-65">
                  ({String(index + 1).padStart(2, "0")})
                </span>
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span className="font-display text-lg font-extrabold">{repo.name}</span>
                  <span className="text-xs font-semibold [overflow-wrap:anywhere] opacity-70">
                    {repo.href.replace(/^https:\/\//, "")}
                  </span>
                </span>
                <span aria-hidden="true" className="font-extrabold">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      );

    case "facts":
      return (
        <div className="self-start">
          <FactsList facts={block.facts} locale={locale} />
        </div>
      );

    case "video":
      return (
        <div className="aspect-video border-2 border-ink bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${block.youtubeId}`}
            title={text(block.title)}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="block size-full border-0"
          />
        </div>
      );

    case "bullets":
      return (
        <ul className="border-t-2 border-ink">
          {block.items.map((item) => (
            <li
              key={text(item)}
              className="grid grid-cols-[24px_minmax(0,1fr)] gap-2 border-b-2 border-rule py-2 text-sm leading-[1.45] font-semibold text-ink"
            >
              <span aria-hidden="true" className="text-accent">
                —
              </span>
              <span>{text(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "tags":
      return (
        <div className="my-2 flex flex-col gap-3">
          <p className="text-xs font-extrabold tracking-[.5em] text-accent">
            <SpacedText>{text(block.heading)}</SpacedText>
          </p>
          <ul className="flex flex-wrap gap-2">
            {block.items.map((item) => (
              <li
                key={text(item)}
                className="border-2 border-ink px-2.5 py-1.5 text-[13px] font-bold text-ink"
              >
                {text(item)}
              </li>
            ))}
          </ul>
        </div>
      );
  }
}

function ExternalButton({
  link,
  locale,
  minWidth,
}: {
  link: WorkLink;
  locale: AppLocale;
  minWidth: string;
}) {
  return (
    <a href={link.href} target="_blank" rel="noreferrer" className={`${OUTLINE_BUTTON} ${minWidth}`}>
      <span>{resolveText(link.label, locale)}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function FactsList({ facts, locale }: { facts: WorkFact[]; locale: AppLocale }) {
  return (
    <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-0.5 border-2 border-rule px-3.5 py-2 text-[13px] leading-[1.4]">
      {facts.map((fact) => (
        <div key={fact.value} className="contents">
          <dt>{resolveText(fact.label, locale)}</dt>
          <dd
            className={`font-extrabold ${fact.emphasis ? "text-accent" : "text-ink"} ${
              fact.selectable ? "select-all tabular-nums" : ""
            }`}
          >
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
