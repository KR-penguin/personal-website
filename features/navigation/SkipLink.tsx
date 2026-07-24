interface SkipLinkProps {
  label: string;
  targetId: string;
}

// Visually hidden until focused: the first Tab stop on every page load lets
// a keyboard/screen-reader user jump straight past the fixed SiteNav to the
// main content landmark, instead of tabbing through all 7 nav links first.
export function SkipLink({ label, targetId }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded focus:bg-cosmos-surface focus:px-4 focus:py-2 focus:text-cosmos-text"
    >
      {label}
    </a>
  );
}
