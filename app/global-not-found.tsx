import type { Metadata } from "next";
import { archivo } from "@/app/fonts";
import { BASE_PATH } from "@/lib/basePath";
import "./globals.css";

// The app has two root layouts (app/(redirect)/ and app/[locale]/), so there
// is no single layout to compose a 404 from; Next's docs prescribe
// global-not-found for exactly that case. It bypasses normal rendering, so it
// is a full document with its own styles and font. The static export writes
// it to out/404.html, which GitHub Pages serves for every unmatched URL.
// (Next adds the noindex robots tag to this page on its own.)
export const metadata: Metadata = {
  title: "404 — Page not found",
};

const LOCALE_LINKS = [
  { href: `${BASE_PATH}/ko/`, lang: "ko", label: "한국어로 돌아가기" },
  { href: `${BASE_PATH}/en/`, lang: "en", label: "Back to English" },
];

export default function GlobalNotFound() {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="overflow-x-clip antialiased">
        <main className="flex min-h-screen flex-col justify-between">
          <p className="px-6 pt-8 text-xs font-extrabold tracking-[.5em] text-accent">
            <span aria-hidden="true">4 0 4</span>
            <span className="sr-only">404</span>
          </p>
          <h1 className="overflow-hidden px-6 py-6 text-[clamp(64px,12vw,200px)] leading-[.92] font-black tracking-[-0.05em]">
            Not found
          </h1>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] border-t-2 border-ink">
            <p className="border-r-2 border-rule p-6 text-[clamp(18px,2vw,24px)] leading-[1.3] font-bold text-pretty">
              This page doesn&apos;t exist.{" "}
              <span lang="ko" className="text-muted">
                페이지를 찾을 수 없습니다.
              </span>
            </p>
            <div className="flex flex-wrap content-start gap-3 p-6">
              {LOCALE_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  lang={link.lang}
                  hrefLang={link.lang}
                  className="flex min-w-[200px] items-center justify-between gap-6 border-2 border-ink px-3.5 py-2.5 text-sm font-extrabold text-ink transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
