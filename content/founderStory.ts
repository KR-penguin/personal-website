import type { FounderStoryContent, LocalizedContent } from "@/types/content";

export const founderStoryContent: LocalizedContent<FounderStoryContent> = {
  en: {
    intro:
      "Nine projects. 70–80 collaborators. A team that went from a handful of classmates to a mostly-international crew run in English.",
    stats: [
      {
        id: "collaborators",
        target: 80,
        prefix: "70–",
        suffix: "",
        label: "people collaborated with",
      },
      {
        id: "teamSizeAvg",
        target: 10,
        prefix: "~",
        suffix: "",
        label: "average team size",
      },
      {
        id: "obtUsers",
        target: 80,
        prefix: "",
        suffix: "",
        label: "Open Beta users at launch",
      },
    ],
    highlights: [
      { id: "shark-tank", text: "Invited to appear on Shark Tank Korea." },
      {
        id: "yc-offer",
        text: "Offered a six-figure-plus salary by a YC-affiliated matching service to join another startup — declined because it required relocating to the US immediately.",
      },
      {
        id: "contract",
        text: "Negotiated a $2,450 Unreal Engine 5 contract with a French influencer, entirely in English over a call.",
      },
      {
        id: "obt",
        text: "Launched Project 8's Open Beta to 80 users, with strong reception and rapid iteration on feedback.",
      },
    ],
    projects: [
      {
        id: "project-1",
        period: "2020",
        title: "Project 1",
        description: "First collaborative project — the start of leading teams.",
      },
      {
        id: "project-2",
        period: "2022",
        title: "Project 2",
        description: "Team became actively productive.",
      },
      {
        id: "project-3-4",
        period: "2023",
        title: "Projects 3–4",
        description: "First projects with adult collaborators.",
      },
      {
        id: "project-5",
        period: "2024",
        title: "Project 5",
        description: "Mostly-adult team; adopted Scrum and Jira.",
      },
      {
        id: "project-6",
        period: "2024",
        title: "Project 6 — Solo",
        description:
          "A solo Unreal Engine 5 project using the Advanced Locomotion System, built while preparing for science-high-school entrance exams.",
      },
      {
        id: "project-7",
        period: "2024",
        title: "Project 7",
        description: "Team reformed with 3 members — Scrum for programming, Kanban for art/sound.",
      },
      {
        id: "project-8",
        period: "2025–2026",
        title: "Project 8",
        description: "Went global — an almost entirely international team, run in English.",
      },
      {
        id: "project-9",
        period: "2026 — current",
        title: "Project 9",
        description:
          "An AI education startup: a Socratic AI tutor, hands-on 2D/3D concept components, exam-realistic quizzes, a gamified 'Knowledge Cosmos' progress map, and a standalone LaTeX/Markdown workspace. Demo complete, Open Beta in preparation.",
        url: "https://npluslearnup.win",
      },
    ],
    processNote:
      "Operating model evolved from Scrum to Kanban to a custom Agile system: work collapsed into two stages (Cycle, Task), daily standups replaced by async Discord, multiple meetings merged into one 'Cycle Review,' every task capped at 3 days, and work-in-progress capped at 2 tasks per person to force code review participation.",
  },
  ko: {
    intro:
      "9개의 프로젝트. 70~80명의 협업. 소수의 동급생으로 시작해 대부분 외국인으로 구성된, 영어로 운영되는 팀까지.",
    stats: [
      {
        id: "collaborators",
        target: 80,
        prefix: "70~",
        suffix: "명",
        label: "협업 인원",
      },
      {
        id: "teamSizeAvg",
        target: 10,
        prefix: "",
        suffix: "명 내외",
        label: "평균 팀 규모",
      },
      {
        id: "obtUsers",
        target: 80,
        prefix: "",
        suffix: "명",
        label: "OBT 출시 유저 수",
      },
    ],
    highlights: [
      { id: "shark-tank", text: "Shark Tank Korea 출연 제의를 받음." },
      {
        id: "yc-offer",
        text: "YC matching service로부터 최소 6자리 연봉을 제안받음 — 미국 즉시 이주 조건이라 수락하지 않음.",
      },
      {
        id: "contract",
        text: "프랑스 인플루언서와 영어로 협상해 $2,450 규모의 UE5 외주 계약을 얻어냄.",
      },
      {
        id: "obt",
        text: "여덟 번째 프로젝트 OBT를 유저 80명에게 출시 — 반응 좋음, 빠른 피드백 반영.",
      },
    ],
    projects: [
      {
        id: "project-1",
        period: "2020",
        title: "프로젝트 1",
        description: "첫 협업 프로젝트 — 팀을 이끄는 여정의 시작.",
      },
      {
        id: "project-2",
        period: "2022",
        title: "프로젝트 2",
        description: "활발히 활동을 시작한 프로젝트.",
      },
      {
        id: "project-3-4",
        period: "2023",
        title: "프로젝트 3–4",
        description: "성인 팀원과 함께한 첫 프로젝트들.",
      },
      {
        id: "project-5",
        period: "2024",
        title: "프로젝트 5",
        description: "대부분 성인으로 구성된 팀; Scrum과 Jira 도입.",
      },
      {
        id: "project-6",
        period: "2024",
        title: "프로젝트 6 — 개인",
        description: "과학고 입시 준비 중 진행한 UE5 ALS 기반 개인 프로젝트.",
      },
      {
        id: "project-7",
        period: "2024",
        title: "프로젝트 7",
        description: "3명으로 재결성한 팀 — 프로그래밍은 Scrum, 아트/사운드는 Kanban.",
      },
      {
        id: "project-8",
        period: "2025~2026",
        title: "프로젝트 8",
        description: "글로벌 팀으로 전환 — 거의 전원 외국인, 영어로 운영.",
      },
      {
        id: "project-9",
        period: "2026 — 현재",
        title: "프로젝트 9",
        description:
          "AI 교육 스타트업: 소크라테스식 AI 튜터, 직접 조작 가능한 2D/3D 개념 컴포넌트, 현실 시험 난이도의 정밀 퀴즈, 게임화된 '지식 우주' 진행 맵, LaTeX/마크다운 워크스페이스. Demo 개발 완료, OBT 준비 중.",
        url: "https://npluslearnup.win",
      },
    ],
    processNote:
      "운영 방식은 Scrum → Kanban → 커스텀 애자일로 진화: Cycle/Task 2단계로 구조 단순화, 데일리 스크럼 대신 디스코드 비동기 소통, 여러 회의를 하나의 'Cycle Review'로 통합, 모든 태스크는 최대 3일 이내로 분할, 코드 리뷰 참여를 위해 1인당 진행+리뷰 태스크 총합 2개로 제한.",
  },
};
