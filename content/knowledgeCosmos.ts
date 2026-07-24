import type { KnowledgeCosmosContent, LocalizedContent } from "@/types/content";

// Exact concept dependency graph behind the Banach fixed-point convergence
// proof referenced in content/careerTimeline.ts's mathCallout. Ids and the
// prerequisite structure are stable across locales and must not be altered;
// only title/explanation text differs per locale.
export const knowledgeCosmosContent: LocalizedContent<KnowledgeCosmosContent> = {
  en: {
    intro:
      "Every concept behind the Banach fixed-point convergence proof from the Career Timeline, laid out as a constellation. Click a node to read what it means and see the prerequisites it rests on.",
    concepts: [
      {
        id: "metric-space",
        title: "Metric Space",
        explanation:
          "A set equipped with a distance function d(x,y) satisfying non-negativity, symmetry, and the triangle inequality — the minimal structure needed to talk about how close two things are.",
        prerequisiteIds: [],
      },
      {
        id: "distance-functions",
        title: "Distance Functions",
        explanation:
          "Different ways to measure distance between vectors: Manhattan sums absolute differences, Euclidean is the straight-line root-sum-of-squares, L_p generalizes both, and the max-norm takes the single largest coordinate difference.",
        prerequisiteIds: ["metric-space"],
      },
      {
        id: "epsilon-n",
        title: "Epsilon-N Argument",
        explanation:
          "The formal definition of a limit: for every epsilon > 0 there exists an N such that every term beyond the N-th stays within epsilon of the limit. The rigorous backbone under every convergence statement.",
        prerequisiteIds: [],
      },
      {
        id: "sequences-of-functions",
        title: "Sequences of Functions",
        explanation:
          "A sequence where each term is itself a whole function, not a number — f_1, f_2, f_3, and so on.",
        prerequisiteIds: [],
      },
      {
        id: "pointwise-vs-uniform",
        title: "Pointwise vs. Uniform Convergence",
        explanation:
          "Pointwise convergence lets each input converge on its own schedule; uniform convergence requires one single N that works for every input at once — strictly stronger, and what preserves properties like continuity.",
        prerequisiteIds: ["sequences-of-functions", "epsilon-n"],
      },
      {
        id: "countable-uncountable",
        title: "Countable vs. Uncountable Infinity",
        explanation:
          "Countable infinity can be listed in one-to-one correspondence with the natural numbers (like the rationals); uncountable infinity, like the real numbers, provably cannot.",
        prerequisiteIds: [],
      },
      {
        id: "cauchy-sequence",
        title: "Cauchy Sequence",
        explanation:
          "A sequence whose terms get arbitrarily close to each other — not to a pre-known limit — as it progresses. The internal, limit-free way to describe a sequence 'settling down.'",
        prerequisiteIds: ["metric-space", "epsilon-n"],
      },
      {
        id: "completeness",
        title: "Completeness",
        explanation:
          "A metric space is complete when every Cauchy sequence in it actually converges to a limit that's also inside the space — nothing falls through a gap.",
        prerequisiteIds: ["cauchy-sequence"],
      },
      {
        id: "contraction-mapping",
        title: "Contraction Mapping",
        explanation:
          "A function that strictly shrinks the distance between any two points it's applied to, by some fixed ratio less than 1. Repeatedly applying it squeezes everything toward one point.",
        prerequisiteIds: ["metric-space"],
      },
      {
        id: "max-norm-uniform-convergence",
        title: "Why Max-Norm Guarantees Uniform Convergence",
        explanation:
          "The max-norm measures the single worst-case gap across every state at once, so shrinking it to zero forces every state's estimate to converge together — which is exactly uniform, not just pointwise, convergence.",
        prerequisiteIds: ["distance-functions", "pointwise-vs-uniform"],
      },
      {
        id: "value-function-space-complete",
        title: "Why the Value-Function Space Is a Complete Metric Space",
        explanation:
          "The set of all possible value functions, measured by max-norm distance, forms a complete metric space — so Banach's theorem can be applied to it directly.",
        prerequisiteIds: ["completeness", "max-norm-uniform-convergence"],
      },
      {
        id: "banach-fixed-point",
        title: "Banach Fixed-Point Theorem",
        explanation:
          "On a complete metric space, every contraction mapping has exactly one fixed point, and repeatedly applying it from any starting point converges to it.",
        prerequisiteIds: ["contraction-mapping", "completeness"],
      },
      {
        id: "policy-evaluation-convergence",
        title: "Iterative Policy Evaluation Convergence Proof",
        explanation:
          "Combining the Banach fixed-point theorem with the fact that the value-function space is complete under the max-norm proves the iterative policy evaluation update converges to a unique, correct value function — the proof worked through end to end.",
        prerequisiteIds: ["banach-fixed-point", "value-function-space-complete"],
      },
    ],
  },
  ko: {
    intro:
      "커리어 타임라인에 등장한 바나흐 고정점 수렴 증명의 배경이 되는 개념들을 별자리로 펼쳐 놓았습니다. 노드를 클릭하면 그 의미와, 그것이 딛고 선 선행 개념을 확인할 수 있습니다.",
    concepts: [
      {
        id: "metric-space",
        title: "거리 공간",
        explanation:
          "비음수성, 대칭성, 삼각부등식을 만족하는 거리 함수 d(x,y)를 갖춘 집합 — '얼마나 가까운가'를 논하기 위한 최소한의 구조.",
        prerequisiteIds: [],
      },
      {
        id: "distance-functions",
        title: "거리 함수들",
        explanation:
          "벡터 간 거리를 재는 여러 방법: 맨해튼 거리는 절댓값의 합, 유클리드 거리는 제곱합의 제곱근, L_p 거리는 이 둘을 일반화한 형태, 최대 노름 거리는 좌표 중 가장 큰 차이값을 취한다.",
        prerequisiteIds: ["metric-space"],
      },
      {
        id: "epsilon-n",
        title: "Epsilon-N 논법",
        explanation:
          "극한의 엄밀한 정의: 임의의 epsilon > 0에 대해 N번째 이후의 모든 항이 극한값과 epsilon 이내로 가까워지게 하는 N이 존재한다는 것. 모든 수렴 주장의 엄밀한 근거.",
        prerequisiteIds: [],
      },
      {
        id: "sequences-of-functions",
        title: "함수열",
        explanation: "각 항이 숫자가 아니라 함수 그 자체인 수열 — f_1, f_2, f_3, ...",
        prerequisiteIds: [],
      },
      {
        id: "pointwise-vs-uniform",
        title: "점별수렴과 균등수렴",
        explanation:
          "점별수렴은 각 입력이 저마다의 속도로 수렴해도 되지만, 균등수렴은 모든 입력에 동시에 통하는 하나의 N이 존재해야 한다 — 더 강한 조건이며 연속성 같은 성질을 보존한다.",
        prerequisiteIds: ["sequences-of-functions", "epsilon-n"],
      },
      {
        id: "countable-uncountable",
        title: "가산 무한과 비가산 무한",
        explanation:
          "가산 무한은 자연수와 일대일 대응시켜 나열할 수 있는 무한(유리수 등), 비가산 무한은 실수처럼 그렇게 나열하는 것이 불가능함이 증명된 무한.",
        prerequisiteIds: [],
      },
      {
        id: "cauchy-sequence",
        title: "코시 수열",
        explanation:
          "미리 정해진 극한이 아니라, 항들끼리 서로 점점 가까워지는 수열. '수렴해가고 있음'을 극한 없이 내부적으로 서술하는 방법.",
        prerequisiteIds: ["metric-space", "epsilon-n"],
      },
      {
        id: "completeness",
        title: "완비성",
        explanation:
          "그 공간 안의 모든 코시 수열이 실제로 그 공간 안에 있는 극한값으로 수렴할 때, 그 거리공간을 완비 공간이라 한다 — 틈 사이로 빠지는 값이 없다는 뜻.",
        prerequisiteIds: ["cauchy-sequence"],
      },
      {
        id: "contraction-mapping",
        title: "축약 사상",
        explanation:
          "적용하는 임의의 두 점 사이 거리를 1보다 작은 고정 비율로 반드시 줄이는 함수. 반복 적용하면 모든 점이 한 점으로 모여든다.",
        prerequisiteIds: ["metric-space"],
      },
      {
        id: "max-norm-uniform-convergence",
        title: "최대 노름 거리가 균등수렴을 보장하는 이유",
        explanation:
          "최대 노름은 모든 상태 중 가장 나쁜 오차 하나를 측정하므로, 이를 0으로 줄이면 모든 상태의 추정값이 함께 수렴한다 — 이것이 바로 점별수렴이 아닌 균등수렴이다.",
        prerequisiteIds: ["distance-functions", "pointwise-vs-uniform"],
      },
      {
        id: "value-function-space-complete",
        title: "가치 함수 집합이 완비 거리 공간인 이유",
        explanation:
          "가능한 모든 가치 함수의 집합은 최대 노름 거리로 측정했을 때 완비 거리 공간을 이룬다 — 그래서 바나흐 고정점 정리를 직접 적용할 수 있다.",
        prerequisiteIds: ["completeness", "max-norm-uniform-convergence"],
      },
      {
        id: "banach-fixed-point",
        title: "바나흐 고정점 정리",
        explanation:
          "완비 거리 공간에서 모든 축약 사상은 정확히 하나의 고정점을 가지며, 어느 시작점에서 반복 적용해도 그 고정점으로 수렴한다.",
        prerequisiteIds: ["contraction-mapping", "completeness"],
      },
      {
        id: "policy-evaluation-convergence",
        title: "반복적 정책평가 수렴 증명",
        explanation:
          "바나흐 고정점 정리와, 가치 함수 공간이 최대 노름 아래 완비 공간이라는 사실을 결합하면 반복적 정책평가 업데이트가 유일하고 올바른 가치 함수로 수렴함이 증명된다 — 실제로 끝까지 풀어본 증명.",
        prerequisiteIds: ["banach-fixed-point", "value-function-space-complete"],
      },
    ],
  },
};
