# Phase 3 Technical Brief — Tech Lab interactive demos

Three demos, each a genuinely working, from-scratch (no ML/math library) implementation the visitor can operate — not a static illustration. This is the site's core "체험" (hands-on experience) payoff. Algorithmic correctness matters as much as visuals: use the exact formulas below.

Each demo lives under `features/tech-lab/<demo-name>/` with the established layering: pure, framework-agnostic computation in a `lib/` (or a local `logic.ts`) that has NO React/DOM dependency and is unit-testable in isolation; a thin hook owning animation/interaction state; a presentational view component. Do not put math directly inside JSX-heavy view components.

All demos must respect `prefers-reduced-motion` (reuse the existing `hooks/usePrefersReducedMotion.ts`): any continuous auto-playing animation must become a manual, discrete, user-triggered step instead of an automatic loop when reduced motion is preferred. All demos must be usable on a 375px-wide viewport (may stack controls vertically).

Every demo needs an EN and KO short caption (1-2 sentences, plain text, not code) explaining what it is; put this copy in `content/techLab.ts` following the same `LocalizedContent<T>` pattern as `content/founderStory.ts` etc. Do not invent extra biographical claims — the "why he built this" framing already lives in `content/careerTimeline.ts`'s deep-dive teasers (float/quake/ml); Tech Lab copy should be short and demo-focused (what the controls do), not a repeat of the biography.

---

## Demo 1 — Fast Inverse Square Root Lab (`features/tech-lab/fast-inverse-sqrt/`)

Recreates Quake III's `Q_rsqrt` faithfully in TypeScript using typed-array bit reinterpretation (the modern, strict-aliasing-safe equivalent of the original's pointer cast — this IS the `memcpy`/`std::bit_cast` style fix the site's Career Timeline callout references, so get it right):

```ts
function fastInverseSqrt(x: number, iterations: 1 | 2 = 1): number {
  const buf = new ArrayBuffer(4);
  const f32 = new Float32Array(buf);
  const i32 = new Int32Array(buf);

  f32[0] = x;
  const magic = 0x5f3759df;
  i32[0] = magic - (i32[0] >> 1);

  let y = f32[0];
  const x2 = x * 0.5;
  for (let i = 0; i < iterations; i++) {
    y = y * (1.5 - x2 * y * y); // one Newton-Raphson step
  }
  return y;
}
```

Accurate reference: `1 / Math.sqrt(x)`.

UI:
- A numeric input or log-scale slider for `x` (reasonable domain: 0.001 to 100000; a sane default like `x = 2`).
- A toggle/stepper for 1 vs 2 Newton-Raphson iterations.
- Side-by-side display of the accurate result and the fast result, and the relative error percentage: `Math.abs(fast - accurate) / accurate * 100`. With 1 iteration this should read roughly around 0.1-0.2% for most inputs (matches the historically documented ~0.175% worst case) — if your implementation shows wildly different numbers, the bit math is wrong; double check the magic constant and the shift.
- A bit-pattern visualizer: show the 32-bit representation of `x` as float bits (sign / 8-bit exponent / 23-bit mantissa — note: this is the REAL IEEE 754 float32 layout, don't confuse it with the site's custom-float-format story elsewhere on the site which used a different, non-standard 7-bit exponent / 24-bit mantissa layout; those are two different things, don't conflate them) split into three color-coded segments, and the same for the integer reinterpretation after `magic - (i >> 1)`. Hex and binary display is enough; this is meant to be glanceable, not a full tutorial.

Unit tests (pure logic, no DOM): `fastInverseSqrt` relative error stays under ~0.5% across a spread of positive test values (e.g. 0.01, 0.5, 1, 2, 10, 1000, 100000) with 1 iteration, and strictly smaller with 2 iterations for the same input.

---

## Demo 2 — Q-Learning Frozen Lake Lab (`features/tech-lab/q-learning/`)

Classic 4x4 FrozenLake-style grid, deterministic (not slippery) by default so training visibly converges fast and cleanly:

```
S F F F
F H F H
F F F H
H F F G
```
S = start, F = frozen/safe, H = hole (episode fails, reward 0), G = goal (episode succeeds, reward +1). 4 actions per state: up/down/left/right; moving into a wall keeps the agent in place. Episode also ends after a max step cap (e.g. 100 steps) with reward 0 if it never reaches G or H.

Tabular Q-learning update, applied after every step during training:
```
Q[s][a] += alpha * (reward + gamma * max(Q[s']) - Q[s][a])
```
Suggested defaults: `alpha = 0.1`, `gamma = 0.9`. Action selection during training is epsilon-greedy with epsilon decaying across episodes (e.g. start at 1.0, multiply by ~0.99 per episode, floor at 0.01) — exact decay constant is your call as long as it visibly converges within a few hundred episodes on this deterministic grid.

UI:
- Render the 4x4 grid visually (distinct look for start/frozen/hole/goal cells) with the agent's current position marked.
- "Train" control that runs episodes — animate it (one or a few episodes per animation frame) so the visitor can watch the Q-value heatmap (color-code each cell by its max Q-value) and the epsilon value evolve, rather than jumping straight to the final state. Under reduced motion: run all episodes immediately on click with no per-frame animation, then show the final heatmap.
- "Play greedy" control that, after training, animates the agent walking the greedy path (argmax Q[s]) from S — under reduced motion, just show the resulting path highlighted on the grid with no step-by-step animation.
- "Reset" control zeroing the Q-table and epsilon.

Unit tests (pure logic, no DOM): after training for enough episodes (e.g. 1000) on the deterministic grid above, the greedy policy derived from the resulting Q-table must reach G from S without stepping into any H cell — this is the core correctness check (a buggy update rule or reward signal will fail this).

---

## Demo 3 — CNN Mechanics Lab (`features/tech-lab/cnn-mechanics/`)

Scope note: this demonstrates the forward-pass building blocks (im2col, convolution, ReLU, max pooling vs. strided-conv) from his from-scratch CNN implementation. It is NOT a trained digit classifier — training a real classifier needs a dataset/training pipeline that doesn't belong in a live in-browser demo, and the copy must not imply otherwise (don't claim "99.31% accuracy" here; that number belongs only in the Career Timeline text, describing the offline project, not this demo).

Implement a real im2col-based 2D convolution (single channel), no shortcuts through a canvas-native filter API — the point is to show the actual matrix mechanics:
- `im2col(input, kernelSize, stride, padding)` → a 2D matrix where each row is one flattened receptive-field window (this is the "locality-aware" transform the site's Career Timeline callout references).
- `conv(im2colMatrix, flattenedKernel)` → dot product per row → reshape back to a 2D feature map.
- `relu(map)` → elementwise `max(0, v)`.
- `maxPool(map, poolSize, stride)` → standard max pooling forward pass.

UI:
- A small drawable canvas (e.g. ~32x32 logical resolution, scaled up for drawing) where the visitor draws with mouse/touch — white strokes on black, MNIST-style. Clear/reset control.
- A kernel picker with a few classic fixed 3x3 kernels (horizontal edge, vertical edge, sharpen, box blur, emboss) — no training needed, these are fixed illustrative filters.
- Stride and padding controls (small integer choices, e.g. stride 1-2, padding 0-1) and a pool-size control (2 or 3) for the max-pool stage.
- Show each stage's output as a small rendered grayscale map: input → conv output → ReLU output → pooled output.
- Live-updating display of the im2col matrix's shape (`rows x cols`) as stride/padding/kernel size change, using the standard output-size formula `floor((H + 2*padding - kernelSize) / stride) + 1` for both height and width — this is the "why locality and cache hits matter" visualization tying back to the Career Timeline ML callout.

Unit tests (pure logic, no DOM): for a known small hand-computable input (e.g. a 4x4 or 5x5 matrix of simple numbers) and a known 3x3 kernel, `im2col` + `conv` should match a hand-computed (or brute-force nested-loop, written separately in the test as an oracle) convolution result exactly; the output shape formula must match `im2col`'s actual row/col count for a few (kernelSize, stride, padding) combinations.

---

## Assembly

A `features/tech-lab/TechLabSection.tsx` (id="tech-lab") composes all three demos under one section with a short intro (from `content/techLab.ts`), and gets added to `app/[locale]/page.tsx` between Career Timeline and Philosophy (order: Hero, Founder Story, Career Timeline, Tech Lab, Philosophy, Contact).
