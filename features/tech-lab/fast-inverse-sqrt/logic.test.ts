import { describe, expect, it } from "vitest";
import {
  FAST_INVERSE_SQRT_MAGIC,
  accurateInverseSqrt,
  clampX,
  fastInverseSqrt,
  floatToBits,
  magicReinterpretBits,
  relativeErrorPercent,
  sliderPositionToX,
  xToSliderPosition,
} from "./logic";

const SAMPLE_VALUES = [0.01, 0.5, 1, 2, 10, 1000, 100000];

describe("fastInverseSqrt", () => {
  it("stays within ~0.5% relative error with a single Newton-Raphson iteration", () => {
    for (const x of SAMPLE_VALUES) {
      const accurate = accurateInverseSqrt(x);
      const errorPercent = relativeErrorPercent(fastInverseSqrt(x, 1), accurate);
      expect(errorPercent).toBeLessThan(0.5);
    }
  });

  it("is strictly more accurate with a second Newton-Raphson iteration on the same input", () => {
    for (const x of SAMPLE_VALUES) {
      const accurate = accurateInverseSqrt(x);
      const errorOneIteration = relativeErrorPercent(fastInverseSqrt(x, 1), accurate);
      const errorTwoIterations = relativeErrorPercent(fastInverseSqrt(x, 2), accurate);
      expect(errorTwoIterations).toBeLessThan(errorOneIteration);
    }
  });
});

describe("bit reinterpretation", () => {
  it("splits a float32's raw bits into the real IEEE 754 sign/exponent/mantissa segments", () => {
    const bits = floatToBits(2);
    expect(bits.sign).toHaveLength(1);
    expect(bits.exponent).toHaveLength(8);
    expect(bits.mantissa).toHaveLength(23);
    expect(bits.sign + bits.exponent + bits.mantissa).toBe(bits.binary);
    expect(bits.hex).toMatch(/^0x[0-9a-f]{8}$/);
  });

  it("applies the documented magic constant 0x5f3759df during reinterpretation", () => {
    for (const x of SAMPLE_VALUES) {
      const rawBits = parseInt(floatToBits(x).hex, 16);
      const expectedBits = (FAST_INVERSE_SQRT_MAGIC - (rawBits >> 1)) >>> 0;
      const reinterpreted = magicReinterpretBits(x);
      expect(parseInt(reinterpreted.hex, 16)).toBe(expectedBits);
    }
  });
});

describe("log-scale slider mapping", () => {
  it("round-trips between x and slider position", () => {
    for (const x of SAMPLE_VALUES) {
      const roundTripped = sliderPositionToX(xToSliderPosition(x));
      expect(roundTripped).toBeCloseTo(x, 6);
    }
  });

  it("clamps out-of-domain values to the supported range", () => {
    expect(clampX(-5)).toBeGreaterThan(0);
    expect(clampX(1e9)).toBeLessThanOrEqual(100000);
    expect(clampX(Number.NaN)).toBeGreaterThan(0);
  });
});
