"use client";

import { memo } from "react";

import { KeywordChip } from "@/features/ats/components/KeywordChip";
import type { ATSAnalysisResult } from "@/features/ats/types";

type AnalysisSummaryProps = {
  analysis: ATSAnalysisResult;
};

function AnalysisSummaryComponent({ analysis }: AnalysisSummaryProps) {
  return (
    <section className="surface-card p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Keyword Analysis</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Matched, missing, recommended, and extra resume keywords.
          </p>
        </div>
        <span className="text-sm text-muted-foreground">
          {Math.round(analysis.keywordResults.matchRate * 100)}% match rate
        </span>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <KeywordGroup
          title="Matched"
          keywords={analysis.keywordResults.matched}
          variant="matched"
        />
        <KeywordGroup
          title="Missing"
          keywords={analysis.keywordResults.missing}
          variant="missing"
        />
        <KeywordGroup
          title="Recommended"
          keywords={analysis.keywordResults.recommended}
          variant="recommended"
        />
        <KeywordGroup title="Extra" keywords={analysis.keywordResults.extra} variant="extra" />
      </div>
    </section>
  );
}

type KeywordGroupProps = {
  title: string;
  keywords: string[];
  variant: "matched" | "missing" | "recommended" | "extra";
};

function KeywordGroup({ title, keywords, variant }: KeywordGroupProps) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {keywords.length > 0 ? (
          keywords.map((keyword) => (
            <KeywordChip key={`${variant}-${keyword}`} keyword={keyword} variant={variant} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">None</p>
        )}
      </div>
    </div>
  );
}

export const AnalysisSummary = memo(AnalysisSummaryComponent);
