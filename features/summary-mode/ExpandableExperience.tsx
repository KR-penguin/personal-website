"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useSummaryMode } from "@/hooks/useSummaryMode";

interface ExpandableExperienceProps {
  title: string;
  caption: string;
  expandLabel: string;
  collapseLabel: string;
  /** Extra content shown only in the collapsed state, alongside title+caption. */
  collapsedContent?: ReactNode;
  children: ReactNode;
}

// Shared collapse/expand shell for every heavy interactive experience on the
// site (Tech Lab demos, Knowledge Cosmos constellation). Summary Mode only
// sets the *default* open/closed state -- the user can always toggle it
// manually regardless of mode, and a manual choice always wins over later
// Summary Mode changes.
export function ExpandableExperience({
  title,
  caption,
  expandLabel,
  collapseLabel,
  collapsedContent,
  children,
}: ExpandableExperienceProps) {
  const { summaryMode } = useSummaryMode();
  const [isExpanded, setIsExpanded] = useState(!summaryMode);
  const hasManualOverrideRef = useRef(false);

  useEffect(() => {
    if (hasManualOverrideRef.current) return;
    setIsExpanded(!summaryMode);
  }, [summaryMode]);

  const toggle = () => {
    hasManualOverrideRef.current = true;
    setIsExpanded((current) => !current);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Only the title/caption/toggle region gets the scroll-entrance
          fade -- the heavy children below mount/unmount on isExpanded and
          shouldn't replay or fight that transition. */}
      <ScrollReveal className="flex flex-col gap-4">
        {!isExpanded && (
          <header className="flex flex-col gap-2">
            <h3 className="font-display text-xl font-semibold text-cosmos-text">{title}</h3>
            <p className="text-sm text-cosmos-text-muted">{caption}</p>
            {collapsedContent}
          </header>
        )}

        <button
          type="button"
          onClick={toggle}
          aria-expanded={isExpanded}
          className="self-start rounded-full border border-white/10 bg-cosmos-background px-4 py-2 text-sm font-medium text-cosmos-text-muted transition-colors hover:text-cosmos-text"
        >
          {isExpanded ? collapseLabel : expandLabel}
        </button>
      </ScrollReveal>

      {isExpanded && children}
    </div>
  );
}
