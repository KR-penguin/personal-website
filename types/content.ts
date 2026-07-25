import type { AppLocale } from "@/i18n/routing";

export type LocalizedContent<T> = Record<AppLocale, T>;

export interface HeroContent {
  roleLine: string;
  tagline: string;
}

export interface SeoContent {
  description: string;
}

export interface FounderStoryStat {
  id: "collaborators" | "teamSizeAvg" | "obtUsers";
  target: number;
  prefix: string;
  suffix: string;
  label: string;
}

export interface FounderStoryHighlight {
  id: string;
  text: string;
}

export interface FounderStoryProject {
  id: string;
  period: string;
  title: string;
  description: string;
  url?: string;
}

export interface FounderStoryContent {
  intro: string;
  stats: FounderStoryStat[];
  highlights: FounderStoryHighlight[];
  projects: FounderStoryProject[];
  processNote: string;
}

export interface TechStackCategory {
  id: string;
  title: string;
  items: string[];
}

export interface Achievement {
  id: "float" | "quake" | "ml";
  title: string;
  text: string;
}

export interface TechStackContent {
  categories: TechStackCategory[];
  achievements: Achievement[];
  hobbyCallout: string;
  mathCallout: string;
}

export interface ContactContent {
  cta: string;
  copyLabel: string;
  copiedLabel: string;
}
