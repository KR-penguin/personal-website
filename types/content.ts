import type { AppLocale } from "@/i18n/routing";

export type LocalizedContent<T> = Record<AppLocale, T>;

/** Copy that is either identical in every locale or translated per locale. */
export type Text = string | LocalizedContent<string>;

export interface HeroContent {
  roleLine: string;
  tagline: string;
  /** Substring of `tagline` rendered in hollow (outlined) lettering. */
  taglineEmphasis: string;
}

export interface SeoContent {
  description: string;
}

export interface FounderStoryStat {
  id: "collaborators" | "revenue" | "obtUsers";
  label: string;
  value: string;
}

export interface FounderStoryContent {
  stats: FounderStoryStat[];
  processNote: string;
}

export interface WorkImage {
  /** Path under public/, without the deploy base path. */
  src: string;
  alt: Text;
  aspect: "7/3" | "16/9" | "1/1" | "page";
  fit: "cover" | "contain";
  /** Frame colour behind the image (letterboxing, transparent PNGs). */
  backdrop: "raised" | "white" | "black";
}

export interface WorkLink {
  label: Text;
  href: string;
}

export interface WorkFact {
  label: Text;
  value: string;
  emphasis?: boolean;
  /** Click-to-select-all, for values meant to be copied (demo logins). */
  selectable?: boolean;
}

export type WorkBlock =
  | { kind: "summary"; text: Text; highlight?: Text }
  | { kind: "stat"; label: Text; value: Text }
  | { kind: "note"; text: Text }
  | { kind: "badge"; text: Text }
  | { kind: "gallery"; layout: "pair" | "pages" | "logo-and-wide"; images: WorkImage[] }
  | { kind: "links"; links: WorkLink[]; facts?: WorkFact[] }
  | { kind: "repos"; repos: { name: string; href: string }[] }
  | { kind: "facts"; facts: WorkFact[] }
  | { kind: "video"; youtubeId: string; title: Text }
  | { kind: "bullets"; items: Text[] }
  | { kind: "tags"; heading: Text; items: Text[] };

export interface WorkProject {
  id: string;
  title: string;
  /** Dimmed suffix after the title, e.g. a former name. */
  titleNote?: Text;
  /** Lets media-heavy entries use a wider body column. */
  wide?: boolean;
  blocks: WorkBlock[];
}

export interface TechStackCategory {
  id: string;
  title: string;
  summary: string;
}

export interface Achievement {
  id: "job-offer" | "shark-tank" | "contract";
  text: string;
}

export interface TechStackContent {
  categories: TechStackCategory[];
  achievements: Achievement[];
}

export interface ContactContent {
  cta: string;
  copyLabel: string;
  copiedLabel: string;
}
