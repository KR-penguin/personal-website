import { spaceOut } from "@/lib/content";

interface SpacedTextProps {
  children: string;
}

// The design sets kickers like "W O R K" with literal spaces between letters.
// Screen readers would spell those out, so the spaced form is decorative and
// the plain word is what assistive tech gets.
export function SpacedText({ children }: SpacedTextProps) {
  return (
    <>
      <span aria-hidden="true">{spaceOut(children)}</span>
      <span className="sr-only">{children}</span>
    </>
  );
}
