import type { LocalizedContent } from "@/types/content";

export interface QLearningLabels {
  title: string;
  trainButton: string;
  playGreedyButton: string;
  resetButton: string;
  epsilonLabel: string;
  episodesLabel: string;
  legendStart: string;
  legendFrozen: string;
  legendHole: string;
  legendGoal: string;
  heatmapNote: string;
}

export interface QLearningContent {
  caption: string;
  labels: QLearningLabels;
}

export const qLearningContent: LocalizedContent<QLearningContent> = {
  en: {
    caption:
      "Train a tabular Q-learning agent on a 4x4 frozen lake from scratch, right in the browser. Hit Train to watch the Q-value heatmap and epsilon evolve over hundreds of episodes, then Play greedy to watch the learned policy walk from start to goal without ever stepping on a hole.",
    labels: {
      title: "Q-Learning Frozen Lake Lab",
      trainButton: "Train",
      playGreedyButton: "Play greedy",
      resetButton: "Reset",
      epsilonLabel: "epsilon",
      episodesLabel: "episodes",
      legendStart: "start",
      legendFrozen: "frozen",
      legendHole: "hole",
      legendGoal: "goal",
      heatmapNote: "Cell brightness = max Q-value learned for that state.",
    },
  },
  ko: {
    caption:
      "브라우저에서 처음부터 학습하는 4x4 얼어붙은 호수 Q-learning 에이전트입니다. Train을 눌러 수백 에피소드에 걸쳐 Q-value 히트맵과 epsilon이 변화하는 과정을 지켜보고, Play greedy로 학습된 정책이 구멍을 밟지 않고 시작점에서 목표까지 이동하는 모습을 확인해 보세요.",
    labels: {
      title: "Q-Learning 얼어붙은 호수 랩",
      trainButton: "학습(Train)",
      playGreedyButton: "정책 실행(Play greedy)",
      resetButton: "초기화(Reset)",
      epsilonLabel: "epsilon",
      episodesLabel: "에피소드",
      legendStart: "시작",
      legendFrozen: "얼음",
      legendHole: "구멍",
      legendGoal: "목표",
      heatmapNote: "칸의 밝기는 해당 상태에서 학습된 최대 Q-value를 나타냅니다.",
    },
  },
};
