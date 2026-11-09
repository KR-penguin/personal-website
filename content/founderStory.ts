import type { FounderStoryContent, LocalizedContent, WorkProject } from "@/types/content";

export const founderStoryContent: LocalizedContent<FounderStoryContent> = {
  en: {
    stats: [
      { id: "collaborators", label: "Collaborators", value: "80+" },
      { id: "revenue", label: "Revenue", value: "$8000+" },
      { id: "obtUsers", label: "Open Beta users", value: "160" },
    ],
    processNote: "Run on a custom Agile method built from 6+ years of leading teams.",
  },
  ko: {
    stats: [
      { id: "collaborators", label: "협업 인원", value: "80+명" },
      { id: "revenue", label: "수익", value: "$8000+" },
      { id: "obtUsers", label: "OBT 출시 유저 수", value: "160" },
    ],
    processNote: "6년 이상의 팀 운영 경험을 기반으로 한 Custom Agile 방식으로 운영.",
  },
};

const VIEW_ON_GITHUB = "Code — GitHub";
const PAPER_PDF = "Paper — PDF";

// Shared, locale-independent structure: links, media, and ordering are the
// same in both languages, so only the copy itself is localized per field.
export const workProjects: WorkProject[] = [
  {
    id: "smart-note",
    title: "Smart Note",
    blocks: [
      {
        kind: "summary",
        text: {
          en: "Personalized AI tutor, 3D objects & simulations, digital note app",
          ko: "개인화 AI tutor, 3D 오브젝트/시뮬레이션, 디지털 노트앱",
        },
      },
      {
        kind: "stat",
        label: { en: "Current users:", ko: "현재 유저수 :" },
        value: { en: "160+", ko: "160+명" },
      },
      {
        kind: "gallery",
        layout: "pair",
        images: [
          {
            src: "/images/work/smartnote-app.webp",
            alt: { en: "Smart Note app", ko: "Smart Note 앱 화면" },
            aspect: "16/9",
            fit: "cover",
            backdrop: "raised",
          },
          {
            src: "/images/work/smartnote-landing.webp",
            alt: { en: "Smart Note landing page", ko: "Smart Note 랜딩 페이지" },
            aspect: "16/9",
            fit: "cover",
            backdrop: "raised",
          },
        ],
      },
      {
        kind: "links",
        links: [{ label: "learnupsmartnote.com", href: "https://learnupsmartnote.com" }],
      },
    ],
  },
  {
    id: "without-pytorch",
    title: "Without pytorch series (Building AI)",
    blocks: [
      {
        kind: "summary",
        text: {
          en: "A learning project that builds AI from scratch, without libraries",
          ko: "AI를 library없이 처음부터 구현하는 학습 프로젝트",
        },
      },
      {
        kind: "repos",
        repos: [
          { name: "Actor-Critic", href: "https://github.com/KR-penguin/Actor-Critic-without-pytorch" },
          { name: "CNN", href: "https://github.com/KR-penguin/Simple-CNN-without-pytorch" },
          { name: "MLP", href: "https://github.com/KR-penguin/MLP-without-pytorch" },
          { name: "Q-learning", href: "https://github.com/KR-penguin/Q-learning-without-pytorch" },
        ],
      },
    ],
  },
  {
    id: "skanmeskin",
    title: "Skanmeskin",
    titleNote: { en: "(formerly Pickmeskin)", ko: "(구 Pickmeskin)" },
    blocks: [
      {
        kind: "summary",
        text: {
          en: "Face-recognition-based digital skin diagnosis & treatment service",
          ko: "얼굴 인식 기반 피부 진단/치료 디지털 서비스",
        },
        highlight: { en: "(Contract: $6500)", ko: "(외주 : $6500)" },
      },
      {
        kind: "gallery",
        layout: "pair",
        images: [
          {
            src: "/images/work/skanmeskin-analysis.webp",
            alt: { en: "Skanmeskin oil and moisture analysis", ko: "Skanmeskin 유·수분 분석 화면" },
            aspect: "16/9",
            fit: "cover",
            backdrop: "raised",
          },
          {
            src: "/images/work/skanmeskin-summary.webp",
            alt: { en: "Skanmeskin overall results", ko: "Skanmeskin 종합 결과 화면" },
            aspect: "16/9",
            fit: "cover",
            backdrop: "raised",
          },
        ],
      },
      {
        kind: "links",
        links: [{ label: "app.pickmeskin.app", href: "https://app.pickmeskin.app" }],
        facts: [
          { label: { en: "Store code", ko: "매장 코드" }, value: "DEMO01", selectable: true },
          { label: { en: "Password", ko: "접근 암호" }, value: "DEMO2026!", selectable: true },
        ],
      },
    ],
  },
  {
    id: "c-elegans",
    title: "C. elegans Neural Simulation",
    blocks: [
      {
        kind: "summary",
        text: {
          en: "Research that models the C. elegans nervous system with the AdEx neuron model and adds interaction with temperature",
          ko: "C. elegans의 신경망을 AdEx 모델로 구현하고, 온도와의 상호작용까지 추가한 연구",
        },
      },
      { kind: "badge", text: "Report submitted to a national science research program." },
      {
        kind: "gallery",
        layout: "pages",
        images: [
          {
            src: "/images/work/celegans-p1.webp",
            alt: {
              en: "Paper — neuron voltage changes in response to odor stimuli",
              ko: "논문 — 냄새 자극에 대한 뉴런 전압 변화",
            },
            aspect: "page",
            fit: "cover",
            backdrop: "white",
          },
          {
            src: "/images/work/celegans-p2.webp",
            alt: {
              en: "Paper — simulation view and stimulus experiments",
              ko: "논문 — 시뮬레이션 화면과 자극 실험",
            },
            aspect: "page",
            fit: "cover",
            backdrop: "white",
          },
          {
            src: "/images/work/celegans-p3.webp",
            alt: { en: "Paper — AdEx model equations", ko: "논문 — AdEx 모델 수식" },
            aspect: "page",
            fit: "cover",
            backdrop: "white",
          },
        ],
      },
      {
        kind: "links",
        links: [
          { label: VIEW_ON_GITHUB, href: "https://github.com/KR-penguin/C.-elegans-Neural-Simulation" },
          {
            label: PAPER_PDF,
            href: "https://drive.google.com/file/d/1i7JOeo8ADi9gqTl6kn-6VZ_HRy5H2PCB/view?usp=drive_link",
          },
        ],
      },
    ],
  },
  {
    id: "learn-up",
    title: "Learn Up! - AI RPG Learning",
    wide: true,
    blocks: [
      {
        kind: "summary",
        text: {
          en: "An AI-powered pixel learning RPG that turns your study notes into real-time, turn-based combat stages.",
          ko: "공부 노트를 실시간 턴제 전투 스테이지로 바꿔주는 AI 기반 픽셀 학습 RPG.",
        },
      },
      {
        kind: "gallery",
        layout: "pair",
        images: [
          {
            src: "/images/work/learnup-gameplay.webp",
            alt: { en: "Learn Up! gameplay", ko: "Learn Up! 게임 플레이 화면" },
            aspect: "7/3",
            fit: "contain",
            backdrop: "raised",
          },
          {
            src: "/images/work/learnup-playstore.webp",
            alt: { en: "Learn Up! Google Play store listing", ko: "Learn Up! Google Play 스토어 페이지" },
            aspect: "7/3",
            fit: "cover",
            backdrop: "raised",
          },
        ],
      },
      {
        kind: "links",
        links: [
          {
            label: { en: "View on Google Play", ko: "Google Play에서 보기" },
            href: "https://play.google.com/store/apps/details?id=com.nplus.learnup&hl=en",
          },
        ],
      },
    ],
  },
  {
    id: "curriculum-learning",
    title: "Curriculum-Learning-Effectiveness-Study",
    blocks: [
      {
        kind: "summary",
        text: {
          en: "Research that started from one question: does AI, like people, learn better when it starts with easy data?",
          ko: "AI도 사람처럼 쉬운 데이터부터 학습하면 더 잘 학습할까? 라는 질문에서 시작된 연구",
        },
      },
      { kind: "badge", text: "Report submitted to the Gyeongsangnam-do Science Education Center." },
      {
        kind: "gallery",
        layout: "pages",
        images: [
          {
            src: "/images/work/curriculum-p1.webp",
            alt: { en: "Paper — cover page", ko: "논문 표지" },
            aspect: "page",
            fit: "cover",
            backdrop: "white",
          },
          {
            src: "/images/work/curriculum-p10.webp",
            alt: { en: "Paper — experimental design summary", ko: "논문 — 실험 설계 요약" },
            aspect: "page",
            fit: "cover",
            backdrop: "white",
          },
          {
            src: "/images/work/curriculum-p12.webp",
            alt: { en: "Paper — full results table", ko: "논문 — 전체 결과 표" },
            aspect: "page",
            fit: "cover",
            backdrop: "white",
          },
        ],
      },
      {
        kind: "links",
        links: [
          {
            label: VIEW_ON_GITHUB,
            href: "https://github.com/KR-penguin/Curriculum-Learning-Effectiveness-Study",
          },
          {
            label: PAPER_PDF,
            // Same Drive file as the C. elegans paper — exactly as given in the design.
            href: "https://drive.google.com/file/d/1i7JOeo8ADi9gqTl6kn-6VZ_HRy5H2PCB/view?usp=drive_link",
          },
        ],
      },
    ],
  },
  {
    id: "kodo",
    title: "Kodo Project",
    titleNote: "(PPO Brawl Stars AI)",
    blocks: [
      { kind: "badge", text: { en: "● In progress", ko: "● 현재 진행중" } },
      {
        kind: "summary",
        text: {
          en: "A project building an AI scrim (practice match) environment for pro players, using PPO, LSTM networks, computer vision and more",
          ko: "PPO, LSTM 신경망, CV 등을 사용해 프로게이머 AI 스크림(연습게임) 환경 구축 프로젝트",
        },
      },
      {
        kind: "bullets",
        items: [
          { en: "North America's #1 pro player on board", ko: "북미 1등 프로게이머 참여중" },
          { en: "Prior researchers on board", ko: "선행 연구자들 참여중" },
        ],
      },
      {
        kind: "gallery",
        layout: "logo-and-wide",
        images: [
          {
            src: "/images/work/kodo-logo.webp",
            alt: { en: "Kodo Project logo", ko: "Kodo Project 로고" },
            aspect: "1/1",
            fit: "cover",
            backdrop: "black",
          },
          {
            src: "/images/work/kodo-gameplay.webp",
            alt: { en: "Kodo Project training environment", ko: "Kodo Project 학습 환경 화면" },
            aspect: "7/3",
            fit: "cover",
            backdrop: "raised",
          },
        ],
      },
      {
        kind: "tags",
        heading: { en: "GOALS", ko: "목표" },
        items: [
          { en: "Beyond pro-level skill", ko: "프로 이상의 실력" },
          "xAI",
          { en: "CV-based", ko: "CV 기반" },
          { en: "Robust to environment changes", ko: "환경 변경 내성" },
        ],
      },
      {
        kind: "links",
        links: [
          {
            label: { en: "Official website — kodoresearch.org", ko: "공식 웹사이트 — kodoresearch.org" },
            href: "https://kodoresearch.org/",
          },
        ],
      },
    ],
  },
  {
    id: "hacked",
    title: "Hacked",
    blocks: [
      {
        kind: "summary",
        text: {
          en: "A PvP strategy hacking game built with multiprocessing, the command design pattern, a relay server and more",
          ko: "multiprocessing, command design pattern, relay server 등의 기술을 이용한 PVP 전략 해킹 게임",
        },
      },
      {
        kind: "note",
        text: {
          en: "Encouragement Award — 2025 National Youth Open SW GAME Coding Contest with Python, co-hosted by Hanyang University",
          ko: "한양대와 함께하는 2025 전국 청소년 오픈 SW GAME 코딩대회 with 파이썬 대회 장려상 수상",
        },
      },
      {
        kind: "facts",
        facts: [
          { label: { en: "Team", ko: "팀 이름" }, value: "BitDesigner" },
          { label: { en: "Prize", ko: "상금" }, value: "$110", emphasis: true },
        ],
      },
      {
        kind: "video",
        youtubeId: "UYLskgJujEc",
        title: { en: "Hacked introduction video", ko: "Hacked 소개 영상" },
      },
    ],
  },
  {
    id: "killing-mode",
    title: "Killing Mode",
    blocks: [
      {
        kind: "summary",
        text: {
          en: "A shooting game built with UE5, C++ and ALS",
          ko: "UE5 + C++ + ALS 을 사용해 만든 슈팅 게임",
        },
      },
      {
        kind: "video",
        youtubeId: "lbId723VoiQ",
        title: { en: "Killing Mode video", ko: "Killing Mode 영상" },
      },
    ],
  },
];
