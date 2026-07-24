import type { LocalizedContent } from "@/types/content";

export interface TechLabIntroContent {
  intro: string;
}

// Short, demo-focused intro for the Tech Lab section. Deliberately does not
// repeat the "why he built this" framing that already lives in
// content/careerTimeline.ts's deep-dive teasers (float/quake/ml) — this is
// just a plain-text pointer to the fact that these are real, hands-on builds.
export const techLabIntroContent: LocalizedContent<TechLabIntroContent> = {
  en: {
    intro:
      "Three from-scratch demos you can actually operate, not just watch — no math or ML library doing the work behind the scenes. Move the controls below and see each algorithm run live in your browser.",
  },
  ko: {
    intro:
      "수학·ML 라이브러리 없이 처음부터 직접 구현한, 눈으로만 보는 게 아니라 직접 조작해 볼 수 있는 세 가지 데모입니다. 아래 컨트롤을 움직이며 각 알고리즘이 브라우저에서 실제로 동작하는 과정을 확인해 보세요.",
  },
};
