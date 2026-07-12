"use client";

import { memo } from "react";

import { Badge } from "@/components/ui/badge";
import { CircularScore } from "@/features/ats/components/CircularScore";
import type { ATSAnalysisResult } from "@/features/ats/types";

type ResumeHealthCardProps = {
  analysis: ATSAnalysisResult;
};

function getHealthLabel(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Strong";
  if (score >= 50) return "Needs work";
  return "Critical";
}

function ResumeHealthCardComponent({ analysis }: ResumeHealthCardProps) {
  return (
    <section className="workspace-card grid gap-6 p-6 lg:grid-cols-[auto_1fr]">
      <CircularScore score={analysis.score} />
      <div className="flex flex-col justify-center">
        <Badge variant="default" className="w-fit">
          Resume Health
        </Badge>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">{getHealthLabel(analysis.score)}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Deterministic ATS analysis based on sections, keywords, formatting, achievements,
          and target-role alignment.
        </p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <dt className="text-xs text-muted-foreground">Critical issues</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums text-destructive">
              {analysis.criticalIssues.length}
            </dd>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <dt className="text-xs text-muted-foreground">Warnings</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums text-warning">
              {analysis.warnings.length}
            </dd>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <dt className="text-xs text-muted-foreground">Passed checks</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums text-success">
              {analysis.passedChecks.length}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export const ResumeHealthCard = memo(ResumeHealthCardComponent);
