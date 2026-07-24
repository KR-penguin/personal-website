export type IterationCount = 1 | 2;

export const FAST_INVERSE_SQRT_MAGIC = 0x5f3759df;
export const MIN_X = 0.001;
export const MAX_X = 100000;

const SLIDER_MIN = Math.log10(MIN_X);
const SLIDER_MAX = Math.log10(MAX_X);
export const SLIDER_RANGE = { min: SLIDER_MIN, max: SLIDER_MAX } as const;

export function clampX(value: number): number {
  if (!Number.isFinite(value)) return MIN_X;
  return Math.min(MAX_X, Math.max(MIN_X, value));
}

// Faithful port of Quake III's Q_rsqrt, using typed-array bit reinterpretation
// (the strict-aliasing-safe equivalent of the original's pointer cast) instead
// of a raw memory cast.
export function fastInverseSqrt(x: number, iterations: IterationCount = 1): number {
  const buf = new ArrayBuffer(4);
  const f32 = new Float32Array(buf);
  const i32 = new Int32Array(buf);

  f32[0] = x;
  i32[0] = FAST_INVERSE_SQRT_MAGIC - (i32[0] >> 1);

  let y = f32[0];
  const x2 = x * 0.5;
  for (let i = 0; i < iterations; i++) {
    y = y * (1.5 - x2 * y * y); // one Newton-Raphson step
  }
  return y;
}

export function accurateInverseSqrt(x: number): number {
  return 1 / Math.sqrt(x);
}

export function relativeErrorPercent(fast: number, accurate: number): number {
  return (Math.abs(fast - accurate) / accurate) * 100;
}

export interface BitBreakdown {
  sign: string;
  exponent: string;
  mantissa: string;
  hex: string;
  binary: string;
}

// Real IEEE 754 float32 layout: 1 sign bit / 8 exponent bits / 23 mantissa
// bits. (Not to be confused with the site's custom 7-bit-exponent /
// 24-bit-mantissa float format used elsewhere on the site.)
function bitsToBreakdown(bits: number): BitBreakdown {
  const unsigned = bits >>> 0;
  const binary = unsigned.toString(2).padStart(32, "0");
  return {
    sign: binary.slice(0, 1),
    exponent: binary.slice(1, 9),
    mantissa: binary.slice(9),
    hex: `0x${unsigned.toString(16).padStart(8, "0")}`,
    binary,
  };
}

export function floatToBits(x: number): BitBreakdown {
  const buf = new ArrayBuffer(4);
  const f32 = new Float32Array(buf);
  const i32 = new Int32Array(buf);
  f32[0] = x;
  return bitsToBreakdown(i32[0]);
}

export function magicReinterpretBits(x: number): BitBreakdown {
  const buf = new ArrayBuffer(4);
  const f32 = new Float32Array(buf);
  const i32 = new Int32Array(buf);
  f32[0] = x;
  i32[0] = FAST_INVERSE_SQRT_MAGIC - (i32[0] >> 1);
  return bitsToBreakdown(i32[0]);
}

export function formatDecimal(value: number, fractionDigits = 6): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(fractionDigits);
}

export function xToSliderPosition(x: number): number {
  return Math.log10(clampX(x));
}

export function sliderPositionToX(position: number): number {
  return clampX(10 ** position);
}
