# Phase 4 Brief — Orbit Map navigation, Knowledge Cosmos, Summary Mode

Phases 1-3 are merged into main: Hero, Founder Story, Career Timeline, Tech Lab (3 interactive demos), Philosophy, Contact, all wired into `app/[locale]/page.tsx`, all sharing `hooks/usePrefersReducedMotion.ts` for OS-level reduced-motion detection. This phase adds three integrated pieces on top of that foundation.

## 1. Summary Mode (the "Investor Fast-Track" toggle from 기획서.md §2)

A manual, site-wide toggle between "Immersive" (default) and "Summary" mode, persisted in `localStorage`. Adaptation from the original plan: rather than a one-off control only inside Hero, implement it as part of the persistent nav overlay described in section 3 below, so it's reachable at any scroll position — this serves the actual intent (investor can switch anytime) better than a Hero-only control.

- `hooks/useSummaryMode.tsx`: a Context provider (`SummaryModeProvider`) holding `{ summaryMode: boolean, setSummaryMode }`, backed by `localStorage` (read on mount, guarded for SSR — default `false` server-side/on first render, hydrate from storage in an effect), and a `useSummaryMode()` hook to read/write it.
- `app/[locale]/layout.tsx` is currently an async server component; add a small client wrapper (e.g. `app/providers.tsx`, `"use client"`) that renders `SummaryModeProvider` around `{children}`, and use it inside the existing `NextIntlClientProvider` wrapping in layout.tsx.
- `hooks/useEffectiveReducedMotion.ts`: combines OS-level `usePrefersReducedMotion()` OR the manual `summaryMode` flag — this is the hook that should now gate all decorative animation across the site instead of calling `usePrefersReducedMotion()` directly. Update every existing call site that gates an animation loop to use this combined hook instead: `features/hero/useStarfield.ts`, `features/founder-story/useCountUp.ts` (via its existing `usePrefersReducedMotion` import), `features/philosophy/PrincipleCard.tsx`, `features/tech-lab/q-learning/useQLearningLab.ts`. Leave `hooks/usePrefersReducedMotion.ts` itself untouched — it's still the correct primitive for OS-only detection and `useEffectiveReducedMotion` should be built on top of it, not duplicate it.
- `features/summary-mode/ExpandableExperience.tsx`: a small reusable wrapper component (title, caption, children) that starts collapsed (showing only title+caption+an "Show interactive demo"/"Show constellation" expand button) when `summaryMode` is true, and starts expanded when it's false — but the user can always manually toggle it open/closed regardless of mode (summary mode only sets the *default*, it never removes the ability to expand). Use this to wrap each of the three existing Tech Lab demo components and the new Knowledge Cosmos constellation view (section 2 below) — do not duplicate this collapse/expand logic per-demo.

## 2. Knowledge Cosmos section (`features/knowledge-cosmos/`, id="knowledge-cosmos")

Ties back to the Career Timeline's existing "math-for-RL" callout (the Banach fixed-point convergence proof). This section visualizes the concept dependency graph as a constellation: nodes are math concepts, edges are prerequisite relationships. New content type in `types/content.ts` (`KnowledgeCosmosConcept { id, title, explanation, prerequisiteIds: string[] }`, `KnowledgeCosmosContent { intro: string; concepts: KnowledgeCosmosConcept[] }`) and `content/knowledgeCosmos.ts` (`LocalizedContent<KnowledgeCosmosContent>`) with this exact node set (ids are stable across locales; `title`/`explanation` are translated per locale) — do not add or remove nodes, do not alter the prerequisite structure:

```
id: metric-space            prereqs: []
  EN title: "Metric Space" — "A set equipped with a distance function d(x,y) satisfying non-negativity, symmetry, and the triangle inequality — the minimal structure needed to talk about how close two things are."
  KO title: "거리 공간" — "비음수성, 대칭성, 삼각부등식을 만족하는 거리 함수 d(x,y)를 갖춘 집합 — '얼마나 가까운가'를 논하기 위한 최소한의 구조."

id: distance-functions       prereqs: [metric-space]
  EN: "Distance Functions" — "Different ways to measure distance between vectors: Manhattan sums absolute differences, Euclidean is the straight-line root-sum-of-squares, L_p generalizes both, and the max-norm takes the single largest coordinate difference."
  KO: "거리 함수들" — "벡터 간 거리를 재는 여러 방법: 맨해튼 거리는 절댓값의 합, 유클리드 거리는 제곱합의 제곱근, L_p 거리는 이 둘을 일반화한 형태, 최대 노름 거리는 좌표 중 가장 큰 차이값을 취한다."

id: epsilon-n                prereqs: []
  EN: "Epsilon-N Argument" — "The formal definition of a limit: for every epsilon > 0 there exists an N such that every term beyond the N-th stays within epsilon of the limit. The rigorous backbone under every convergence statement."
  KO: "Epsilon-N 논법" — "극한의 엄밀한 정의: 임의의 epsilon > 0에 대해 N번째 이후의 모든 항이 극한값과 epsilon 이내로 가까워지게 하는 N이 존재한다는 것. 모든 수렴 주장의 엄밀한 근거."

id: sequences-of-functions   prereqs: []
  EN: "Sequences of Functions" — "A sequence where each term is itself a whole function, not a number — f_1, f_2, f_3, and so on."
  KO: "함수열" — "각 항이 숫자가 아니라 함수 그 자체인 수열 — f_1, f_2, f_3, ..."

id: pointwise-vs-uniform     prereqs: [sequences-of-functions, epsilon-n]
  EN: "Pointwise vs. Uniform Convergence" — "Pointwise convergence lets each input converge on its own schedule; uniform convergence requires one single N that works for every input at once — strictly stronger, and what preserves properties like continuity."
  KO: "점별수렴과 균등수렴" — "점별수렴은 각 입력이 저마다의 속도로 수렴해도 되지만, 균등수렴은 모든 입력에 동시에 통하는 하나의 N이 존재해야 한다 — 더 강한 조건이며 연속성 같은 성질을 보존한다."

id: countable-uncountable    prereqs: []
  EN: "Countable vs. Uncountable Infinity" — "Countable infinity can be listed in one-to-one correspondence with the natural numbers (like the rationals); uncountable infinity, like the real numbers, provably cannot."
  KO: "가산 무한과 비가산 무한" — "가산 무한은 자연수와 일대일 대응시켜 나열할 수 있는 무한(유리수 등), 비가산 무한은 실수처럼 그렇게 나열하는 것이 불가능함이 증명된 무한."

id: cauchy-sequence          prereqs: [metric-space, epsilon-n]
  EN: "Cauchy Sequence" — "A sequence whose terms get arbitrarily close to each other — not to a pre-known limit — as it progresses. The internal, limit-free way to describe a sequence 'settling down.'"
  KO: "코시 수열" — "미리 정해진 극한이 아니라, 항들끼리 서로 점점 가까워지는 수열. '수렴해가고 있음'을 극한 없이 내부적으로 서술하는 방법."

id: completeness             prereqs: [cauchy-sequence]
  EN: "Completeness" — "A metric space is complete when every Cauchy sequence in it actually converges to a limit that's also inside the space — nothing falls through a gap."
  KO: "완비성" — "그 공간 안의 모든 코시 수열이 실제로 그 공간 안에 있는 극한값으로 수렴할 때, 그 거리공간을 완비 공간이라 한다 — 틈 사이로 빠지는 값이 없다는 뜻."

id: contraction-mapping      prereqs: [metric-space]
  EN: "Contraction Mapping" — "A function that strictly shrinks the distance between any two points it's applied to, by some fixed ratio less than 1. Repeatedly applying it squeezes everything toward one point."
  KO: "축약 사상" — "적용하는 임의의 두 점 사이 거리를 1보다 작은 고정 비율로 반드시 줄이는 함수. 반복 적용하면 모든 점이 한 점으로 모여든다."

id: max-norm-uniform-convergence  prereqs: [distance-functions, pointwise-vs-uniform]
  EN: "Why Max-Norm Guarantees Uniform Convergence" — "The max-norm measures the single worst-case gap across every state at once, so shrinking it to zero forces every state's estimate to converge together — which is exactly uniform, not just pointwise, convergence."
  KO: "최대 노름 거리가 균등수렴을 보장하는 이유" — "최대 노름은 모든 상태 중 가장 나쁜 오차 하나를 측정하므로, 이를 0으로 줄이면 모든 상태의 추정값이 함께 수렴한다 — 이것이 바로 점별수렴이 아닌 균등수렴이다."

id: value-function-space-complete  prereqs: [completeness, max-norm-uniform-convergence]
  EN: "Why the Value-Function Space Is a Complete Metric Space" — "The set of all possible value functions, measured by max-norm distance, forms a complete metric space — so Banach's theorem can be applied to it directly."
  KO: "가치 함수 집합이 완비 거리 공간인 이유" — "가능한 모든 가치 함수의 집합은 최대 노름 거리로 측정했을 때 완비 거리 공간을 이룬다 — 그래서 바나흐 고정점 정리를 직접 적용할 수 있다."

id: banach-fixed-point       prereqs: [contraction-mapping, completeness]
  EN: "Banach Fixed-Point Theorem" — "On a complete metric space, every contraction mapping has exactly one fixed point, and repeatedly applying it from any starting point converges to it."
  KO: "바나흐 고정점 정리" — "완비 거리 공간에서 모든 축약 사상은 정확히 하나의 고정점을 가지며, 어느 시작점에서 반복 적용해도 그 고정점으로 수렴한다."

id: policy-evaluation-convergence  prereqs: [banach-fixed-point, value-function-space-complete]
  EN: "Iterative Policy Evaluation Convergence Proof" — "Combining the Banach fixed-point theorem with the fact that the value-function space is complete under the max-norm proves the iterative policy evaluation update converges to a unique, correct value function — the proof worked through end to end."
  KO: "반복적 정책평가 수렴 증명" — "바나흐 고정점 정리와, 가치 함수 공간이 최대 노름 아래 완비 공간이라는 사실을 결합하면 반복적 정책평가 업데이트가 유일하고 올바른 가치 함수로 수렴함이 증명된다 — 실제로 끝까지 풀어본 증명."
```

Rendering: compute each node's layer via topological depth (`layer = 0` if no prerequisites, else `1 + max(layer of its prerequisites)`), lay out nodes left-to-right (or top-to-bottom) by layer with even spacing within a layer, and draw straight connecting lines (SVG) between each node and its prerequisites — this is a small pure, unit-testable layering function (`features/knowledge-cosmos/layout.ts`), not a physics simulation library. Clicking/tapping a node reveals its explanation (a popover/card) and highlights its prerequisite edges. Wrap the whole graph visualization in the `ExpandableExperience` component from section 1 (with a plain scannable list of concept titles always visible as the collapsed-state content, matching the wrapper's title+caption pattern). Add a `"knowledgeCosmos": { "heading": "Knowledge Cosmos" / "지식 우주" }` entry to `messages/en.json` / `messages/ko.json`.

Unit test: for the exact 13-node graph above, every node's computed layer must be strictly greater than every one of its prerequisites' layers (this is the general correctness property — don't hardcode expected layer numbers, assert the property).

## 3. Orbit Map / persistent site nav (`features/navigation/SiteNav.tsx`)

A persistent overlay (fixed position, visible while scrolling, usable at 375px — e.g. collapse to a compact icon strip or a toggleable drawer on narrow viewports) listing all 7 sections in order (hero, founder-story, career-timeline, tech-lab, knowledge-cosmos, philosophy, contact) as anchor links (`<a href="#section-id">` or a smooth-scroll click handler). Add a `"nav": { "home": "...", ... }` messages entry only for whatever short label Hero itself needs (the other six sections already have a `*.heading` message key you can reuse — read them rather than re-declaring). Highlight the currently in-view section using an `IntersectionObserver` watching all seven section elements (a small hook, e.g. `features/navigation/useActiveSection.ts`, pure enough to unit test the "which section is active" selection logic separately from the DOM observer wiring). Clicking a link scrolls to the section — smoothly under normal conditions, instantly (`scrollIntoView({ behavior: "auto" })`) when `useEffectiveReducedMotion()` is true. Also render the Summary Mode toggle (section 1) inside this same nav component, not as a separate floating element.

Wire `SiteNav` into `app/[locale]/layout.tsx` (or `page.tsx`, whichever fits — it needs to render once, not per-locale-page-remount weirdly, and needs `locale` for its labels) so it's present on every page.

Smoke test: renders all 7 nav labels and the mode-toggle button; clicking the toggle flips `summaryMode` (assert via a DOM side-effect, e.g. an ExpandableExperience default-collapsed state changing, or by reading the toggle's own `aria-pressed`).

## Section order after this phase

Hero, Founder Story, Career Timeline, Tech Lab, Knowledge Cosmos, Philosophy, Contact — update `app/[locale]/page.tsx` accordingly (Knowledge Cosmos goes between Tech Lab and Philosophy).
