const LOCALHOST_FALLBACK = "http://localhost:3000";

// Single source of truth for the site's absolute origin. No production
// domain is chosen yet, so every consumer (metadata, OG image, robots,
// sitemap) falls back to localhost until NEXT_PUBLIC_SITE_URL is set.
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? LOCALHOST_FALLBACK;
}
