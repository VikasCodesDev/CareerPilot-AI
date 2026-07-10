"use client";

import { memo } from "react";

import { ProgressBar } from "@/features/ats/components/ProgressBar";
import type { ATSSectionScore } from "@/features/ats/types";

type SectionScoreProps = {
  section: ATSSectionScore;
};

function SectionScoreComponent({ section }: SectionScoreProps) {
  return (
    <article className="rounded-xl border border-border bg-muted/20 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold">{section.label}</h3>
          <p className="text-xs text-muted-foreground">
            {section.passedChecks.length} passed / {section.warnings.length} warnings
          </p>
        </div>
        <span className="text-lg font-semibold">{section.score}</span>
      </div>
      <ProgressBar value={section.score} className="mt-3" />
    </article>
  );
}

export const SectionScore = memo(SectionScoreComponent);
