// Lightweight placeholder shown by next/dynamic while a code-split demo's
// client bundle streams in. Kept text-free (beyond an sr-only status) since
// it is locale-agnostic module-scope config, not request-scoped content.
export function DemoLoadingFallback() {
  return (
    <div
      role="status"
      className="flex h-64 animate-pulse items-center justify-center rounded-2xl border border-white/10 bg-cosmos-surface"
    >
      <span className="sr-only">Loading interactive demo</span>
    </div>
  );
}
