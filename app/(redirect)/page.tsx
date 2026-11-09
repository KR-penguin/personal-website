"use client";

import { useEffect } from "react";
import { resolveLocalePath, DEFAULT_LOCALE_PATH } from "@/lib/resolveLocalePath";

export default function RootPage() {
  useEffect(() => {
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    window.location.replace(resolveLocalePath(languages));
  }, []);

  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#050100",
        color: "#f3f2f2",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Manual escape hatch in case the redirect above doesn't fire (JS disabled, blocked, etc.). */}
      <a href={DEFAULT_LOCALE_PATH} style={{ color: "#ff563c" }}>
        Continue in English
      </a>
    </main>
  );
}
