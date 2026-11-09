import { routing } from "@/i18n/routing";

const DEPLOYED_URL = "https://kr-penguin.github.io/personal-website";

// Single source of truth for the site's absolute origin (including the
// GitHub Pages repo path), reused by metadata, the OG image, robots.txt,
// and sitemap.xml. Overridable via NEXT_PUBLIC_SITE_URL (e.g. for a future
// custom domain, or localhost during `next dev`, which doesn't need exact
// production URLs).
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEPLOYED_URL;
}

// Absolute URL of a page. next.config.ts sets trailingSlash: true, so every
// page lives at a path ending in "/" and the slash-less form only redirects
// there — URLs handed to crawlers (sitemap, hreflang, JSON-LD) keep the slash.
export function pageUrl(path = ""): string {
  return `${getSiteUrl()}/${path ? `${path}/` : ""}`;
}

// Absolute URL of a static file (sitemap.xml, og.png, ...): no trailing slash.
export function fileUrl(path: string): string {
  return `${getSiteUrl()}/${path}`;
}

// hreflang set shared by every page and the sitemap: one entry per locale,
// plus x-default for "/", which picks a language from the browser.
export function languageAlternates(): Record<string, string> {
  return {
    ...Object.fromEntries(routing.locales.map((locale) => [locale, pageUrl(locale)])),
    "x-default": pageUrl(),
  };
}
