import type { AppLocale } from "@/i18n/routing";

export type LocalizedContent<T> = Record<AppLocale, T>;

export interface HeroContent {
  roleLine: string;
  tagline: string;
}

export interface FounderStoryStat {
  id: "collaborators" | "teamSizeAvg" | "obtUsers";
  target: number;
  prefix: string;
  suffix: string;
  label: string;
}

export interface FounderStoryTimelineEntry {
  year: string;
  text: string;
}

export interface FounderStoryContent {
  intro: string;
  stats: FounderStoryStat[];
  timeline: FounderStoryTimelineEntry[];
  processNote: string;
}

export interface CareerMilestone {
  year: string;
  text: string;
}

export interface DeepDiveTeaser {
  id: "float" | "quake" | "ml";
  text: string;
}

export interface CareerTimelineContent {
  milestones: CareerMilestone[];
  hobbyCallout: string;
  mathCallout: string;
  deepDiveTeasers: DeepDiveTeaser[];
  notableMoment: string;
}

export interface SandcastlePrinciple {
  id: string;
  title: string;
  explanation: string;
}

export interface PhilosophyContent {
  originStory: string;
  worldview: string;
  principles: SandcastlePrinciple[];
}

export interface ContactContent {
  cta: string;
}

export interface KnowledgeCosmosConcept {
  id: string;
  title: string;
  explanation: string;
  prerequisiteIds: string[];
}

export interface KnowledgeCosmosContent {
  intro: string;
  concepts: KnowledgeCosmosConcept[];
}
