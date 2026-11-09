interface SkipLinkProps {
  label: string;
  targetId: string;
}

// Visually hidden until focused: the first Tab stop on every page load lets
// a keyboard/screen-reader user jump straight to the main content landmark.
export function SkipLink({ label, targetId }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-70 focus:border-2 focus:border-ink focus:bg-ground focus:px-4 focus:py-2 focus:text-sm focus:font-extrabold focus:text-ink"
    >
      {label}
    </a>
  );
}
