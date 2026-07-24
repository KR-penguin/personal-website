import type { CareerTimelineContent, LocalizedContent } from "@/types/content";

// Deliberately separate from founderStory.ts: this tracks engineering skills
// growth, not the founder/business trajectory. Do not merge the two datasets.
export const careerTimelineContent: LocalizedContent<CareerTimelineContent> = {
  en: {
    milestones: [
      { year: "2018", text: "Starts programming." },
      { year: "2021", text: "Completes C; enters Linux via Kali Linux." },
      {
        year: "2022",
        text: "Completes Python, Go, Lua, HTML/CSS; enters Unreal Engine 4 via C++; completes Git.",
      },
      {
        year: "2023",
        text: "Completes general UE5 & C++ features; completes OOP.",
      },
      {
        year: "2024",
        text: "Completes advanced UE5/C++ features (GAS, ALS); learns JavaScript and Dart.",
      },
      {
        year: "2025",
        text: "Completes frontend (React, Tailwind CSS, TypeScript) and backend (NestJS, PostgreSQL, nginx); learns CI/CD, Sentry, AWS.",
      },
      {
        year: "2026",
        text: "Studying Next.js, backend, AI, cybersecurity, computer-architecture-driven optimization, and DevOps.",
      },
    ],
    hobbyCallout: "Plays TryHackMe CTF challenges for fun.",
    mathCallout:
      "Studies math specifically to support reinforcement learning — calculus, linear algebra, probability & statistics. Proved the convergence of the iterative policy evaluation update using the Banach fixed-point theorem, which meant self-teaching function sequences, uniform vs. pointwise convergence, countable/uncountable infinity, metric spaces, completeness, Cauchy sequences, contraction mappings, Manhattan/Euclidean/L_p/max-norm distances, and epsilon-N arguments along the way.",
    deepDiveTeasers: [
      {
        id: "float",
        text: "High school, year 1: designed a custom floating-point layout (sign · 7-bit exponent · 24-bit mantissa) to fix 0.1 + 0.2 ≠ 0.3 — and found its limits.",
      },
      {
        id: "quake",
        text: "Fully reverse-engineered Quake III's fast inverse square root — the bit-level trick, the Newton-Raphson refinement, and why the classic pointer cast breaks modern strict-aliasing rules.",
      },
      {
        id: "ml",
        text: "Built Q-learning, an MLP, and a CNN entirely from scratch — no PyTorch, no OpenAI Gym — reaching 99.31% accuracy after tuning dropout, LR decay, and augmentation.",
      },
    ],
    notableMoment:
      "Middle school, 7th grade: after experiencing what he felt was unfair treatment from a teacher during an after-school programming class, he remotely hacked every computer in the school's computer lab and forced them all to blue-screen — undetected, because he had already made sure the teacher's admin console couldn't see his own screen.",
  },
  ko: {
    milestones: [
      { year: "2018", text: "프로그래밍 입문." },
      { year: "2021", text: "C언어 학습 완료, Kali Linux로 리눅스 입문." },
      {
        year: "2022",
        text: "Python, Go, Lua, HTML, CSS 학습 완료 + C++ 활용한 UE4 입문, Git 학습 완료.",
      },
      { year: "2023", text: "UE5 & C++ 전반적 기능 학습 완료, OOP 학습 완료." },
      {
        year: "2024",
        text: "UE5&C++ 고급 기능(GAS, ALS 등) 학습 완료, JavaScript 학습 완료, Dart 학습 완료.",
      },
      {
        year: "2025",
        text: "FE(React, Tailwind CSS, TypeScript) 학습 완료, BE(Nest, PostgreSQL, nginx) 학습 완료, CI/CD, Sentry, AWS 학습 완료.",
      },
      {
        year: "2026",
        text: "Next.js, 백엔드, AI, 사이버 보안, 컴퓨터 구조를 활용한 최적화, DevOps 등 추가 학습 중.",
      },
    ],
    hobbyCallout: "취미로 TryHackMe CTF를 품.",
    mathCallout:
      "강화학습을 위해 수학(미적분학, 선형대수학, 확률과 통계)을 공부 중. 반복적 정책평가 수식의 수렴을 바나흐 고정점 정리로 직접 증명하면서 함수열, 균등수렴과 점별수렴, 가산/비가산 무한, 거리공간, 완비성, 코시 수열, 축약사상, 맨해튼/유클리드/L_p/최대노름 거리, Epsilon-N 논법까지 독학함.",
    deepDiveTeasers: [
      {
        id: "float",
        text: "고1 때 0.1+0.2≠0.3 문제를 해결하려 부호·7비트 지수부·24비트 가수부로 구성된 커스텀 부동소수점 포맷을 설계 — 그리고 그 한계도 발견함.",
      },
      {
        id: "quake",
        text: "퀘이크 3의 빠른 역제곱근을 완전히 분석 — 비트 레벨 트릭, 뉴턴-라프슨 근사, 그리고 고전적인 포인터 캐스팅이 현대 strict aliasing 규칙을 위반하는 이유까지.",
      },
      {
        id: "ml",
        text: "PyTorch·OpenAI Gym 없이 Q-learning, MLP, CNN을 처음부터 직접 구현 — Dropout, 학습률 감소, 데이터 증강 등을 튜닝해 정확도 99.31% 달성.",
      },
    ],
    notableMoment:
      "중학교 1학년, 방과후 프로그래밍 수업에서 선생님으로부터 겪은 부조리 이후 학교 컴퓨터실 전체 컴퓨터를 원격 해킹해 블루스크린(BSOD)을 띄움 — 사전에 선생님의 관리자 화면에서 자신의 화면이 보이지 않도록 막아둔 덕분에 들키지 않음.",
  },
};
