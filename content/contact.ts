import type { ContactContent, LocalizedContent } from "@/types/content";

export const CONTACT_EMAIL = "kkwonsc@gmail.com";

export const contactContent: LocalizedContent<ContactContent> = {
  en: {
    cta: "Open to conversations with investors and collaborators.",
    copyLabel: "Copy email",
    copiedLabel: "Copied!",
  },
  ko: {
    cta: "투자자·협업 파트너와의 대화를 항상 환영합니다.",
    copyLabel: "이메일 복사",
    copiedLabel: "복사됨!",
  },
};
