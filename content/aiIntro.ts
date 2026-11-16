import type { AiIntroContent, LocalizedContent } from "@/types/content";

export { AI_INTRO_TEXT } from "./aiIntroText";

export const aiIntroContent: LocalizedContent<AiIntroContent> = {
  en: {
    panelLabel: "Self-introduction for AI assistants",
    copyLabel: "Copy",
    copiedLabel: "Copied!",
  },
  ko: {
    panelLabel: "AI 어시스턴트용 자기소개",
    copyLabel: "복사",
    copiedLabel: "복사됨!",
  },
};
