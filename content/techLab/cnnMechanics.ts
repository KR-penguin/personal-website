import type { LocalizedContent } from "@/types/content";
import type { KernelId } from "@/features/tech-lab/cnn-mechanics/logic";

export interface CnnMechanicsLabels {
  title: string;
  canvasLabel: string;
  clearButton: string;
  kernelLabel: string;
  kernelNames: Record<KernelId, string>;
  strideLabel: string;
  paddingLabel: string;
  poolSizeLabel: string;
  stageInputLabel: string;
  stageConvLabel: string;
  stageReluLabel: string;
  stagePooledLabel: string;
  im2colShapeLabel: string;
}

export interface CnnMechanicsContent {
  caption: string;
  labels: CnnMechanicsLabels;
}

export const cnnMechanicsContent: LocalizedContent<CnnMechanicsContent> = {
  en: {
    caption:
      "Draw a stroke on the grid, then watch a real im2col-based convolution, ReLU, and max pooling run on it step by step. These are fixed illustrative filters demonstrating the mechanics of a CNN's forward pass, not a trained digit classifier.",
    labels: {
      title: "CNN Mechanics Lab",
      canvasLabel: "Drawing canvas",
      clearButton: "Clear",
      kernelLabel: "Kernel",
      kernelNames: {
        horizontalEdge: "Horizontal edge",
        verticalEdge: "Vertical edge",
        sharpen: "Sharpen",
        boxBlur: "Box blur",
        emboss: "Emboss",
      },
      strideLabel: "Stride",
      paddingLabel: "Padding",
      poolSizeLabel: "Pool size",
      stageInputLabel: "Input",
      stageConvLabel: "Conv output",
      stageReluLabel: "ReLU output",
      stagePooledLabel: "Pooled output",
      im2colShapeLabel: "im2col shape (rows × cols)",
    },
  },
  ko: {
    caption:
      "격자에 그림을 그리면 실제 im2col 기반 합성곱, ReLU, 맥스 풀링이 단계별로 실행되는 과정을 확인할 수 있습니다. 여기 쓰인 필터는 CNN 순전파 과정의 작동 원리를 보여주기 위한 고정된 예시 필터이며, 학습된 숫자 분류기가 아닙니다.",
    labels: {
      title: "CNN 연산 원리 랩",
      canvasLabel: "그림 그리기 캔버스",
      clearButton: "지우기",
      kernelLabel: "커널",
      kernelNames: {
        horizontalEdge: "수평 엣지",
        verticalEdge: "수직 엣지",
        sharpen: "샤픈",
        boxBlur: "박스 블러",
        emboss: "엠보스",
      },
      strideLabel: "스트라이드",
      paddingLabel: "패딩",
      poolSizeLabel: "풀 크기",
      stageInputLabel: "입력",
      stageConvLabel: "합성곱 출력",
      stageReluLabel: "ReLU 출력",
      stagePooledLabel: "풀링 출력",
      im2colShapeLabel: "im2col 형태 (행 × 열)",
    },
  },
};
