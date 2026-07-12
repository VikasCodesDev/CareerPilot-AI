import Link from "next/link";
import { FileSearch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AnalysisSummary } from "@/features/ats/components/AnalysisSummary";
import { IssueCard } from "@/features/ats/components/IssueCard";
import { ResumeHealthCard } from "@/features/ats/components/ResumeHealthCard";
import { ScoreBreakdown } from "@/features/ats/components/ScoreBreakdown";
import { SuggestionCard } from "@/features/ats/components/SuggestionCard";
import { WorkspaceHero } from "@/features/dashboard/components/shared/workspace-hero";
import type { ATSAnalysisResult, ATSHistoryItem } from "@/features/ats/types";

type ATSAnalysisDashboardProps = {
  analysis: ATSAnalysisResult | null;
  history: ATSHistoryItem[];
  authenticated: boolean;
};

export function ATSAnalysisDashboard({
  analysis,
  history,
  authenticated,
}: ATSAnalysisDashboardProps) {
  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <WorkspaceHero
        eyebrow="Resume Intelligence"
        eyebrowIcon={FileSearch}
        title="ATS Resume Analysis"
        description="Deterministic resume scoring, keyword matching, section detection, and improvement planning for uploaded resumes."
        aside={
          <Link href="/dashboard/resume/upload" className={buttonVariants({ variant: "outline" })}>
            Upload Resume
          </Link>
        }
      />

      {!authenticated ? <DashboardEmptyState message="Sign in to view ATS reports." /> : null}
      {authenticated && !analysis ? (
        <DashboardEmptyState message="Upload a resume or call the ATS analyze API with resume text to generate a stored report." />
      ) : null}

      {authenticated && analysis ? (
        <div className="space-y-8">
          <ResumeHealthCard analysis={analysis} />
          <ScoreBreakdown analysis={analysis} />
          <AnalysisSummary analysis={analysis} />
          <section className="grid gap-4 lg:grid-cols-3">
            <IssueCard title="Critical Issues" items={analysis.criticalIssues} tone="critical" />
            <IssueCard title="Warnings" items={analysis.warnings} tone="warning" />
            <IssueCard
              title="Passed Checks"
              items={analysis.passedChecks.slice(0, 6)}
              tone="success"
            />
          </section>
          <section className="workspace-card p-6">
            <h2 className="text-xl font-semibold tracking-tight">Improvement Suggestions</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {analysis.suggestions.map((suggestion) => (
                <SuggestionCard key={suggestion.id} suggestion={suggestion} />
              ))}
            </div>
          </section>
          <RecentReports history={history} />
        </div>
      ) : null}
    </div>
  );
}

function DashboardEmptyState({ message }: { message: string }) {
  return (
    <div className="workspace-card flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
        <FileSearch className="size-8 text-primary" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-semibold">No ATS report yet</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{message}</p>
      <Link href="/dashboard/resume/upload" className={buttonVariants({ className: "mt-6" })}>
        Upload Resume
      </Link>
    </div>
  );
}

function RecentReports({ history }: { history: ATSHistoryItem[] }) {
  return (
    <section className="workspace-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Recent Reports</h2>
        <Badge variant="outline">{history.length} reports</Badge>
      </div>
      <div className="space-y-3">
        {history.length > 0 ? (
          history.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-primary/20 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold">
                  {item.targetRole || "General ATS Analysis"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {item.createdAt.toLocaleDateString()} · {item.suggestionsCount} suggestions
                </p>
              </div>
              <span className="text-2xl font-bold tabular-nums text-gradient">{item.score}</span>
            </article>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No previous reports found.</p>
        )}
      </div>
    </section>
  );
}
