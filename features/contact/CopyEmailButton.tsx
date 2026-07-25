"use client";

import { useState } from "react";

interface CopyEmailButtonProps {
  email: string;
  copyLabel: string;
  copiedLabel: string;
}

export function CopyEmailButton({ email, copyLabel, copiedLabel }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context); the email
      // is already visible as selectable text next to this button either way.
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-cosmos-text-muted transition-colors hover:text-cosmos-text"
    >
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}
