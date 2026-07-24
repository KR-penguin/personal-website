"use client";

import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { useEffectiveReducedMotion } from "@/hooks/useEffectiveReducedMotion";
import { useSummaryMode } from "@/hooks/useSummaryMode";
import { useActiveSection } from "./useActiveSection";

// Order matches the Orbit Map spec: Hero, Founder Story, Career Timeline,
// Tech Lab, Knowledge Cosmos, Philosophy, Contact. Six of these reuse each
// section's existing `*.heading` message key; only Hero needs a nav-specific
// label since it has no heading key of its own.
const SECTION_LINKS = [
  { id: "hero", messageKey: "nav.home" },
  { id: "founder-story", messageKey: "founderStory.heading" },
  { id: "career-timeline", messageKey: "careerTimeline.heading" },
  { id: "tech-lab", messageKey: "techLab.heading" },
  { id: "knowledge-cosmos", messageKey: "knowledgeCosmos.heading" },
  { id: "philosophy", messageKey: "philosophy.heading" },
  { id: "contact", messageKey: "contact.heading" },
] as const;

const SECTION_IDS = SECTION_LINKS.map((link) => link.id);

export function SiteNav() {
  const t = useTranslations();
  const activeId = useActiveSection(SECTION_IDS);
  const reducedMotion = useEffectiveReducedMotion();
  const { summaryMode, setSummaryMode } = useSummaryMode();

  const handleLinkClick = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <nav
      aria-label={t("nav.ariaLabel")}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-2 overflow-x-auto bg-cosmos-background/85 px-4 py-2 backdrop-blur sm:justify-center sm:gap-3"
    >
      <ul className="flex items-center gap-1 sm:gap-2">
        {SECTION_LINKS.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={handleLinkClick(link.id)}
              aria-current={activeId === link.id ? "true" : undefined}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                activeId === link.id
                  ? "bg-cosmos-accent text-cosmos-background"
                  : "text-cosmos-text-muted hover:text-cosmos-text"
              }`}
            >
              {t(link.messageKey)}
            </a>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setSummaryMode(!summaryMode)}
        aria-pressed={summaryMode}
        className={`whitespace-nowrap rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
          summaryMode
            ? "bg-cosmos-accent-secondary text-cosmos-background"
            : "bg-cosmos-background text-cosmos-text-muted hover:text-cosmos-text"
        }`}
      >
        {t("nav.summaryToggle")}
      </button>
    </nav>
  );
}
