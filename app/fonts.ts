import { Archivo } from "next/font/google";

// Shared font definition (one hosted instance) for both root documents:
// app/[locale]/layout.tsx and app/global-not-found.tsx. The variable width
// axis is needed for the design's expanded (font-stretch 110–125%) display
// lettering. Hangul has no Archivo glyphs and falls back to the system UI
// font, as in the design.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});
