import Link from "next/link";
import { FileSearch } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { AnalysisSummary } from "@/features/ats/components/AnalysisSummary";
import { IssueCard } from "@/features/ats/components/IssueCard";
import { ResumeHealthCard } from "@/features/ats/components/ResumeHealthCard";
import { ScoreBreakdown } from "@/features/ats/components/ScoreBreakdown";
import { SuggestionCard } from "@/features/ats/components/SuggestionCard";
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
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Resume Intelligence</p>
          <h1 className="mt-2 text-3xl font-semibold">ATS Resume Analysis</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Deterministic resume scoring, keyword matching, section detection, and improvement
            planning for uploaded resumes.
          </p>
        </div>
        <Link href="/dashboard/resume/upload" className={buttonVariants({ variant: "outline" })}>
          Upload Resume
        </Link>
      </header>

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
          <section className="surface-card p-6">
            <h2 className="text-xl font-semibold">Improvement Suggestions</h2>
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
    <div className="surface-card flex flex-col items-center justify-center px-6 py-16 text-center">
      <FileSearch className="size-10 text-primary" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-semibold">No ATS report yet</h2>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">{message}</p>
      <Link href="/dashboard/resume/upload" className={buttonVariants({ className: "mt-6" })}>
        Upload Resume
      </Link>
    </div>
  );
}

function RecentReports({ history }: { history: ATSHistoryItem[] }) {
  return (
    <section className="surface-card p-6">
      <h2 className="text-xl font-semibold">Recent Reports</h2>
      <div className="mt-5 space-y-3">
        {history.length > 0 ? (
          history.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold">
                  {item.targetRole || "General ATS Analysis"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {item.createdAt.toLocaleDateString()} - {item.suggestionsCount} suggestions
                </p>
              </div>
              <span className="text-2xl font-semibold">{item.score}</span>
            </article>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No previous reports found.</p>
        )}
      </div>
    </section>
  );
}
