"use client";

import { memo } from "react";

import { ATSScoreCard } from "@/features/ats/components/ATSScoreCard";
import { SectionScore } from "@/features/ats/components/SectionScore";
import type { ATSAnalysisResult } from "@/features/ats/types";

type ScoreBreakdownProps = {
  analysis: ATSAnalysisResult;
};

function ScoreBreakdownComponent({ analysis }: ScoreBreakdownProps) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">Score Breakdown</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Weighted deterministic scoring across ATS-critical dimensions.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {analysis.sectionScores.map((section) => (
          <ATSScoreCard
            key={section.category}
            title={section.label}
            score={section.score}
            description={`${Math.round(section.weight * 100)}% weight`}
          />
        ))}
      </div>
      <div className="surface-card p-6">
        <h3 className="text-base font-semibold">Section Cards</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {analysis.sectionScores.map((section) => (
            <SectionScore key={`section-${section.category}`} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const ScoreBreakdown = memo(ScoreBreakdownComponent);
