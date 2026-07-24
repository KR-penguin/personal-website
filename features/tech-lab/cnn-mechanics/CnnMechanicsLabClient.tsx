"use client";

import dynamic from "next/dynamic";
import type { AppLocale } from "@/i18n/routing";
import { DemoLoadingFallback } from "@/components/DemoLoadingFallback";

const CnnMechanicsLab = dynamic(
  () => import("./CnnMechanicsLab").then((mod) => mod.CnnMechanicsLab),
  {
    // Canvas + getComputedStyle/document access is genuinely DOM-only, and
    // next/dynamic forbids ssr:false inside a Server Component -- this thin
    // client boundary is what makes that option legal here.
    ssr: false,
    loading: () => <DemoLoadingFallback />,
  }
);

interface CnnMechanicsLabClientProps {
  locale: AppLocale;
}

export function CnnMechanicsLabClient({ locale }: CnnMechanicsLabClientProps) {
  return <CnnMechanicsLab locale={locale} />;
}
