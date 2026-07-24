import type { LocalizedContent } from "@/types/content";

export interface FastInverseSqrtLabels {
  title: string;
  inputLabel: string;
  iterationsLabel: string;
  oneIteration: string;
  twoIterations: string;
  accurateLabel: string;
  fastLabel: string;
  errorLabel: string;
  bitVisualizerTitle: string;
  inputBitsLabel: string;
  reinterpretedBitsLabel: string;
  signLabel: string;
  exponentLabel: string;
  mantissaLabel: string;
  hexLabel: string;
}

export interface FastInverseSqrtContent {
  caption: string;
  labels: FastInverseSqrtLabels;
}

export const fastInverseSqrtContent: LocalizedContent<FastInverseSqrtContent> = {
  en: {
    caption:
      "Drag x and toggle between one and two Newton-Raphson refinement steps to see Quake III's bit-hack approximation converge on the true 1/√x, refinement step by refinement step.",
    labels: {
      title: "Fast Inverse Square Root Lab",
      inputLabel: "x (log scale)",
      iterationsLabel: "Newton-Raphson iterations",
      oneIteration: "1 iteration",
      twoIterations: "2 iterations",
      accurateLabel: "Accurate (1 / √x)",
      fastLabel: "Fast approximation",
      errorLabel: "Relative error",
      bitVisualizerTitle: "IEEE 754 bit pattern",
      inputBitsLabel: "x as float32 bits",
      reinterpretedBitsLabel: "After magic − (i >> 1)",
      signLabel: "sign",
      exponentLabel: "exponent",
      mantissaLabel: "mantissa",
      hexLabel: "hex",
    },
  },
  ko: {
    caption:
      "x 값을 슬라이더로 조절하고 뉴턴-랩슨 보정 단계를 1회와 2회로 전환하면서, Quake III의 비트 연산 근사값이 실제 1/√x에 점점 가까워지는 과정을 확인해 보세요.",
    labels: {
      title: "고속 역제곱근 랩",
      inputLabel: "x (로그 스케일)",
      iterationsLabel: "뉴턴-랩슨 반복 횟수",
      oneIteration: "1회 반복",
      twoIterations: "2회 반복",
      accurateLabel: "정확한 값 (1 / √x)",
      fastLabel: "고속 근사값",
      errorLabel: "상대 오차",
      bitVisualizerTitle: "IEEE 754 비트 패턴",
      inputBitsLabel: "x의 float32 비트",
      reinterpretedBitsLabel: "magic − (i >> 1) 적용 후",
      signLabel: "부호",
      exponentLabel: "지수부",
      mantissaLabel: "가수부",
      hexLabel: "16진수",
    },
  },
};
