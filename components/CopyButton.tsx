"use client";

import { useEffect, useRef, useState } from "react";

interface CopyButtonProps {
  text: string;
  copyLabel: string;
  copiedLabel: string;
  /**
   * Colour/border/background styling; layout and type are shared. The base
   * sets no background, so a caller's bg-* is never overridden by it.
   */
  className: string;
  /**
   * Element showing `text`. If the Clipboard API is refused, its contents are
   * selected (and copied the legacy way where that still works), so a long
   * text is one Ctrl+C away instead of a manual drag-select.
   */
  fallbackTargetId?: string;
}

function selectAndLegacyCopy(targetId: string): boolean {
  const target = document.getElementById(targetId);
  const selection = window.getSelection();
  if (!target || !selection) return false;
  const range = document.createRange();
  range.selectNodeContents(target);
  selection.removeAllRanges();
  selection.addRange(range);
  try {
    return document.execCommand("copy");
  } catch {
    return false;
  }
}

export function CopyButton({
  text,
  copyLabel,
  copiedLabel,
  className,
  fallbackTargetId,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API can be unavailable (insecure context, denied
      // permission); the text is always visible and selectable either way.
      if (!fallbackTargetId || !selectAndLegacyCopy(fallbackTargetId)) return;
    }
    setCopied(true);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex min-w-[160px] cursor-pointer justify-between gap-6 border-2 px-4 py-3 text-left text-[15px] font-extrabold transition-colors ${className}`}
    >
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
      <span aria-hidden="true">⧉</span>
    </button>
  );
}
