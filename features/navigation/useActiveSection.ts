"use client";

import { useEffect, useRef, useState } from "react";

export interface SectionIntersection {
  id: string;
  isIntersecting: boolean;
  intersectionRatio: number;
}

// Pure selection logic, unit-testable without any DOM/IntersectionObserver:
// prefer the intersecting section with the highest intersection ratio: falls
// back to the previously active section if nothing currently intersects, so
// the nav highlight doesn't disappear while scrolling between sections.
export function selectActiveSectionId(
  intersections: SectionIntersection[],
  previousActiveId: string | null
): string | null {
  const visible = intersections.filter((entry) => entry.isIntersecting);
  if (visible.length === 0) {
    return previousActiveId;
  }

  return visible.reduce((mostVisible, current) =>
    current.intersectionRatio > mostVisible.intersectionRatio ? current : mostVisible
  ).id;
}

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: [0, 0.25, 0.5, 0.75, 1],
  rootMargin: "-15% 0px -55% 0px",
};

export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);
  const latestBySectionRef = useRef<Map<string, SectionIntersection>>(new Map());

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    latestBySectionRef.current = new Map(
      sectionIds.map((id) => [id, { id, isIntersecting: false, intersectionRatio: 0 }])
    );

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        latestBySectionRef.current.set(entry.target.id, {
          id: entry.target.id,
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
        });
      }

      setActiveId((previousActiveId) =>
        selectActiveSectionId(Array.from(latestBySectionRef.current.values()), previousActiveId)
      );
    }, OBSERVER_OPTIONS);

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
