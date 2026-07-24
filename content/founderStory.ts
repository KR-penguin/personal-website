import type { FounderStoryContent, LocalizedContent } from "@/types/content";

export const founderStoryContent: LocalizedContent<FounderStoryContent> = {
  en: {
    intro:
      "Nine projects. 70–80 collaborators. A team that went from a handful of classmates to a mostly-international crew run in English. Here's the trajectory.",
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
    timeline: [
      { year: "2020", text: "First collaboration begins — Project 1." },
      { year: "2021", text: "Recruits additional members." },
      { year: "2022", text: "Team becomes actively productive — Project 2." },
      {
        year: "2023",
        text: "Recruits members from the adult workforce for the first time — Projects 3 and 4.",
      },
      {
        year: "2024",
        text: "Team grows to mostly adults; adopts Scrum and Jira — Project 5.",
      },
      {
        year: "2024",
        text: "Disbands the team to focus on science-high-school entrance exams; builds a solo Unreal Engine 5 project using the Advanced Locomotion System — Project 6.",
      },
      {
        year: "2024",
        text: "Reforms the team with 3 members — Project 7. Programming runs on Scrum, Art/Sound runs on Kanban.",
      },
      {
        year: "2025",
        text: "Goes global — recruits international teammates; the team becomes almost entirely non-Korean — Project 8. Switches from Jira to ClickUp.",
      },
      {
        year: "2026-02",
        text: "Negotiates a $2,450 Unreal Engine 5 contract (70–80 hours of work) with a French influencer, entirely in English over a call — ultimately can't take it due to school and his own startup.",
      },
      {
        year: "2026-06",
        text: "A YC-affiliated matching service offers a six-figure-plus salary to join another startup — contingent on relocating to the US immediately. Declines.",
      },
      {
        year: "2026-07",
        text: "Project 8 launches its Open Beta — 80 users at launch, strong reception, rapid iteration on user feedback. Also receives an invitation to appear on Shark Tank Korea.",
      },
      {
        year: "2026 (ongoing)",
        text: "Project 9's demo is complete and its Open Beta is in preparation — an AI education startup built around a Socratic AI tutor, hands-on 2D/3D manipulable concept components, exam-realistic quizzes (with a UX trick that grades free-response answers in the background while the user is still working through multiple-choice), a gamified 'Knowledge Cosmos' progress map, and a standalone LaTeX/Markdown workspace.",
      },
    ],
    processNote:
      "Operating model evolved from Scrum to Kanban to a custom Agile system: work collapsed into two stages (Cycle, Task), daily standups replaced by async Discord, multiple meetings merged into one 'Cycle Review,' every task capped at 3 days, and work-in-progress capped at 2 tasks per person to force code review participation.",
  },
  ko: {
    intro:
      "9개의 프로젝트. 70~80명의 협업. 소수의 동급생으로 시작해 대부분 외국인으로 구성된, 영어로 운영되는 팀까지. 그 궤적입니다.",
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
    timeline: [
      { year: "2020", text: "협업 시작 — 첫 번째 프로젝트." },
      { year: "2021", text: "멤버 추가 모집." },
      { year: "2022", text: "활발히 활동 시작 — 두 번째 프로젝트." },
      { year: "2023", text: "성인층 멤버 합류 — 세, 네 번째 프로젝트." },
      {
        year: "2024",
        text: "대부분 성인층으로 구성; Scrum과 Jira 도입 — 다섯 번째 프로젝트.",
      },
      {
        year: "2024",
        text: "과학고 입시 준비를 위해 팀을 해체하고, UE5의 ALS를 활용한 개인 프로젝트 진행 — 여섯 번째 프로젝트.",
      },
      {
        year: "2024",
        text: "3명으로 팀 재결성 — 일곱 번째 프로젝트. Programming는 Scrum, Art/Sound는 Kanban으로 운영.",
      },
      {
        year: "2025",
        text: "글로벌 팀으로 전환 — 외국인 팀원 모집, 팀원 대부분이 외국인으로 구성 — 여덟 번째 프로젝트. Jira에서 ClickUp으로 전환.",
      },
      {
        year: "2026-02",
        text: "프랑스 인플루언서와 영어로 통화 협상해 UE5 작업(70~80시간) 대가로 $2,450 규모의 외주를 얻어냈으나, 학교와 자신의 사업 때문에 결국 진행하지 못함.",
      },
      {
        year: "2026-06",
        text: "YC matching service에서 합류 시 최소 6자리 이상의 연봉을 제안받음 — 미국 즉시 이주가 조건이라 수락하지 못함.",
      },
      {
        year: "2026-07",
        text: "여덟 번째 프로젝트 OBT 출시 — 유저 80명, 반응 좋음, 피드백을 받아 빠르게 개선 중. Shark Tank Korea로부터 출연 제의도 받음.",
      },
      {
        year: "2026 (ongoing)",
        text: "아홉 번째 프로젝트, demo 개발 완료 및 OBT 준비 중 — 소크라테스식 AI 튜터, 직접 조작 가능한 2D/3D 개념 컴포넌트, 현실 시험 난이도의 정밀 퀴즈(서술형을 미리 채점해 채점 대기시간을 없애는 UX), 게임화된 '지식 우주' 진행 맵, LaTeX/마크다운 독립형 노트 워크스테이션을 갖춘 AI 교육 스타트업.",
      },
    ],
    processNote:
      "운영 방식은 Scrum → Kanban → 커스텀 애자일로 진화: Cycle/Task 2단계로 구조 단순화, 데일리 스크럼 대신 디스코드 비동기 소통, 여러 회의를 하나의 'Cycle Review'로 통합, 모든 태스크는 최대 3일 이내로 분할, 코드 리뷰 참여를 위해 1인당 진행+리뷰 태스크 총합 2개로 제한.",
  },
};
