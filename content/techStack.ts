import type { LocalizedContent, TechStackContent } from "@/types/content";

export const techStackContent: LocalizedContent<TechStackContent> = {
  en: {
    categories: [
      { id: "ai", title: "AI", summary: "LSTM, Transformer, PPO and more" },
      {
        id: "languages",
        title: "Languages & Systems",
        summary: "C / C++ / Python / Go / Lua / JavaScript · TypeScript / Dart",
      },
      {
        id: "math",
        title: "Math",
        summary:
          "Calculus, linear algebra, probability & statistics — metric spaces, Cauchy sequences, contraction mappings, Banach fixed-point theorem",
      },
      {
        id: "cloud-devops",
        title: "Cloud & DevOps",
        summary: "AWS / CI/CD / Sentry / DevOps / Agile (Scrum · Kanban)",
      },
      {
        id: "game-dev",
        title: "Game Development",
        summary:
          "Unreal Engine 4 / 5 — Gameplay Ability System (GAS) — Advanced Locomotion System (ALS)",
      },
      {
        id: "web-app",
        title: "Web / App",
        summary: "React / Next.js / Tailwind CSS / NestJS / PostgreSQL / nginx",
      },
    ],
    achievements: [
      { id: "job-offer", text: "Received a job offer with a six-figure-plus salary" },
      { id: "shark-tank", text: "Invited to appear on Shark Tank Korea" },
      { id: "contract", text: "Built a demo in two days and won a $6500 contract" },
    ],
  },
  ko: {
    categories: [
      { id: "ai", title: "AI", summary: "LSTM, Transformer, PPO 등" },
      {
        id: "languages",
        title: "언어 & 시스템",
        summary: "C / C++ / Python / Go / Lua / JavaScript · TypeScript / Dart",
      },
      {
        id: "math",
        title: "수학",
        summary:
          "미적분학, 선형대수학, 확률과 통계 — 거리공간, 코시 수열, 축약사상, 바나흐 고정점 정리",
      },
      {
        id: "cloud-devops",
        title: "클라우드 & DevOps",
        summary: "AWS / CI/CD / Sentry / DevOps / Agile (Scrum · Kanban)",
      },
      {
        id: "game-dev",
        title: "게임 개발",
        summary:
          "Unreal Engine 4 / 5 — Gameplay Ability System (GAS) — Advanced Locomotion System (ALS)",
      },
      {
        id: "web-app",
        title: "웹/앱",
        summary: "React / Next.js / Tailwind CSS / NestJS / PostgreSQL / nginx",
      },
    ],
    achievements: [
      { id: "job-offer", text: "최소 6자리 이상의 연봉 일자리 제안을 받음" },
      { id: "shark-tank", text: "샤크 탱크 코리아 출연 제안 받음" },
      { id: "contract", text: "데모 버전을 이틀만에 구현해 $6500 계약 따냄" },
    ],
  },
};
