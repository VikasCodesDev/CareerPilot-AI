import type { InterviewSession } from "@/features/interview/types";

type SessionSummaryProps = {
  session: InterviewSession | null;
};

export function SessionSummary({ session }: SessionSummaryProps) {
  return (
    <section className="surface-card p-6">
      <h2 className="text-xl font-semibold">Strengths & Gaps</h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <SummaryList title="Strengths" items={session?.strengths ?? []} />
        <SummaryList title="Weaknesses" items={session?.weaknesses ?? []} />
        <SummaryList title="Suggestions" items={session?.suggestions ?? []} />
      </div>
    </section>
  );
}

function SummaryList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/20 p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
        {items.length > 0 ? items.map((item) => <li key={item}>{item}</li>) : <li>No data yet.</li>}
      </ul>
    </div>
  );
}
