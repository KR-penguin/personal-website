"use client";

import { useEffect, useRef, useState } from "react";

interface CopyEmailButtonProps {
  email: string;
  copyLabel: string;
  copiedLabel: string;
}

export function CopyEmailButton({ email, copyLabel, copiedLabel }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context); the email
      // is already visible as selectable text next to this button either way.
      return;
    }
    setCopied(true);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex min-w-[160px] cursor-pointer justify-between gap-6 border-2 border-on-accent bg-transparent px-4 py-3 text-left text-[15px] font-extrabold text-on-accent transition-colors hover:bg-on-accent hover:text-accent"
    >
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
      <span aria-hidden="true">⧉</span>
    </button>
  );
}
