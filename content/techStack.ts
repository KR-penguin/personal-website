import type { LocalizedContent, TechStackContent } from "@/types/content";

// Grouped by category, not by year — a chronological timeline fragmented the
// information; grouping reads faster and matches how a reader actually scans
// a tech stack.
export const techStackContent: LocalizedContent<TechStackContent> = {
  en: {
    categories: [
      {
        id: "languages",
        title: "Languages & Systems",
        items: ["C", "C++", "Python", "Go", "Lua", "JavaScript / TypeScript", "Dart"],
      },
      {
        id: "game-dev",
        title: "Game Development",
        items: ["Unreal Engine 4 / 5", "Gameplay Ability System (GAS)", "Advanced Locomotion System (ALS)"],
      },
      {
        id: "web",
        title: "Web",
        items: ["React", "Next.js", "Tailwind CSS", "NestJS", "PostgreSQL", "nginx"],
      },
      {
        id: "cloud-devops",
        title: "Cloud & DevOps",
        items: ["AWS", "CI/CD", "Sentry", "DevOps"],
      },
      {
        id: "systems-security",
        title: "Systems & Security",
        items: ["Linux (Kali)", "Computer-architecture-driven optimization", "Cybersecurity (studying)"],
      },
      {
        id: "math-for-ai",
        title: "Math for AI",
        items: [
          "Calculus, linear algebra, probability & statistics",
          "Convergence proofs: metric spaces, Cauchy sequences, contraction mappings, Banach fixed-point theorem",
        ],
      },
    ],
    achievements: [
      {
        id: "float",
        title: "Custom Floating-Point Format",
        text: "High school, year 1: designed a custom floating-point layout (sign · 7-bit exponent · 24-bit mantissa) to fix 0.1 + 0.2 ≠ 0.3 — and found its limits.",
      },
      {
        id: "quake",
        title: "Quake III Fast Inverse Square Root",
        text: "Fully reverse-engineered Quake III's fast inverse square root — the bit-level trick, the Newton-Raphson refinement, and why the classic pointer cast breaks modern strict-aliasing rules.",
      },
      {
        id: "ml",
        title: "ML From Scratch",
        text: "Built Q-learning, an MLP, and a CNN entirely from scratch — no PyTorch, no OpenAI Gym — reaching 99.31% accuracy after tuning dropout, LR decay, and augmentation.",
      },
    ],
    hobbyCallout: "Plays TryHackMe CTF challenges for fun.",
    mathCallout:
      "Studies math specifically to support reinforcement learning. Proved the convergence of the iterative policy evaluation update using the Banach fixed-point theorem, which meant self-teaching function sequences, uniform vs. pointwise convergence, countable/uncountable infinity, metric spaces, completeness, Cauchy sequences, contraction mappings, and several distance metrics along the way.",
  },
  ko: {
    categories: [
      {
        id: "languages",
        title: "언어 & 시스템",
        items: ["C", "C++", "Python", "Go", "Lua", "JavaScript / TypeScript", "Dart"],
      },
      {
        id: "game-dev",
        title: "게임 개발",
        items: ["Unreal Engine 4 / 5", "Gameplay Ability System (GAS)", "Advanced Locomotion System (ALS)"],
      },
      {
        id: "web",
        title: "웹",
        items: ["React", "Next.js", "Tailwind CSS", "NestJS", "PostgreSQL", "nginx"],
      },
      {
        id: "cloud-devops",
        title: "클라우드 & DevOps",
        items: ["AWS", "CI/CD", "Sentry", "DevOps"],
      },
      {
        id: "systems-security",
        title: "시스템 & 보안",
        items: ["Linux (Kali)", "컴퓨터 구조를 활용한 최적화", "사이버 보안 (학습 중)"],
      },
      {
        id: "math-for-ai",
        title: "AI를 위한 수학",
        items: [
          "미적분학, 선형대수학, 확률과 통계",
          "수렴 증명: 거리공간, 코시 수열, 축약사상, 바나흐 고정점 정리",
        ],
      },
    ],
    achievements: [
      {
        id: "float",
        title: "커스텀 부동소수점 포맷",
        text: "고1 때 0.1+0.2≠0.3 문제를 해결하려 부호·7비트 지수부·24비트 가수부로 구성된 커스텀 부동소수점 포맷을 설계 — 그리고 그 한계도 발견함.",
      },
      {
        id: "quake",
        title: "퀘이크 3 빠른 역제곱근",
        text: "퀘이크 3의 빠른 역제곱근을 완전히 분석 — 비트 레벨 트릭, 뉴턴-라프슨 근사, 그리고 고전적인 포인터 캐스팅이 현대 strict aliasing 규칙을 위반하는 이유까지.",
      },
      {
        id: "ml",
        title: "밑바닥부터 구현한 ML",
        text: "PyTorch·OpenAI Gym 없이 Q-learning, MLP, CNN을 처음부터 직접 구현 — Dropout, 학습률 감소, 데이터 증강 등을 튜닝해 정확도 99.31% 달성.",
      },
    ],
    hobbyCallout: "취미로 TryHackMe CTF를 품.",
    mathCallout:
      "강화학습을 뒷받침하기 위해 수학을 공부 중. 반복적 정책평가 수식의 수렴을 바나흐 고정점 정리로 직접 증명하면서 함수열, 균등수렴과 점별수렴, 가산/비가산 무한, 거리공간, 완비성, 코시 수열, 축약사상 등 여러 개념을 독학함.",
  },
};
