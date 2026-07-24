import type { Star } from "@/types/starfield";

const BACKGROUND_COLOR = "#05060f";
const STAR_COLOR_RGB = "245, 245, 250";

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function createStar(width: number, height: number): Star {
  return {
    x: randomBetween(0, width),
    y: randomBetween(0, height),
    radius: randomBetween(0.4, 1.6),
    speed: randomBetween(2, 12),
    twinklePhase: randomBetween(0, Math.PI * 2),
    twinkleSpeed: randomBetween(0.5, 1.5),
  };
}

export function createStars(count: number, width: number, height: number): Star[] {
  return Array.from({ length: count }, () => createStar(width, height));
}

export function stepStar(
  star: Star,
  width: number,
  height: number,
  dt: number
): Star {
  const nextY = star.y + star.speed * dt;
  const wrapped = nextY > height;

  return {
    ...star,
    y: wrapped ? 0 : nextY,
    x: wrapped ? randomBetween(0, width) : star.x,
    twinklePhase: star.twinklePhase + star.twinkleSpeed * dt,
  };
}

export function drawStarfield(
  ctx: CanvasRenderingContext2D,
  stars: readonly Star[],
  width: number,
  height: number
): void {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, width, height);

  for (const star of stars) {
    const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
    const opacity = 0.3 + twinkle * 0.7;
    ctx.beginPath();
    ctx.fillStyle = `rgba(${STAR_COLOR_RGB}, ${opacity.toFixed(3)})`;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
