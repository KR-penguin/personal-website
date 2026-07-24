import type { BitBreakdown } from "./logic";

interface BitBreakdownRowProps {
  label: string;
  hexLabel: string;
  bits: BitBreakdown;
  signLabel: string;
  exponentLabel: string;
  mantissaLabel: string;
}

export function BitBreakdownRow({
  label,
  hexLabel,
  bits,
  signLabel,
  exponentLabel,
  mantissaLabel,
}: BitBreakdownRowProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-cosmos-background p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-xs text-cosmos-text-muted">
        <span>{label}</span>
        <span className="font-mono">
          {hexLabel}: {bits.hex}
        </span>
      </div>
      <div className="flex flex-wrap gap-1 overflow-x-auto font-mono text-xs">
        <span
          className="rounded bg-cosmos-accent-secondary/20 px-1.5 py-1 text-cosmos-accent-secondary"
          title={signLabel}
        >
          {bits.sign}
        </span>
        <span className="rounded bg-cosmos-accent/20 px-1.5 py-1 text-cosmos-accent" title={exponentLabel}>
          {bits.exponent}
        </span>
        <span className="rounded bg-white/5 px-1.5 py-1 text-cosmos-text-muted" title={mantissaLabel}>
          {bits.mantissa}
        </span>
      </div>
    </div>
  );
}
