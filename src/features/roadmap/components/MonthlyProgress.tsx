import type { MonthlyGoal } from "@/features/roadmap/types";

type MonthlyProgressProps = {
  goals: MonthlyGoal[];
};

export function MonthlyProgress({ goals }: MonthlyProgressProps) {
  return (
    <section className="surface-card p-6">
      <h2 className="text-xl font-semibold">Monthly Goals</h2>
      <div className="mt-5 space-y-3">
        {goals.slice(0, 4).map((goal) => (
          <div key={goal.month} className="rounded-xl border border-border bg-muted/20 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium">{goal.title}</p>
              <span className="text-xs text-primary">{goal.completionTarget}%</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{goal.focus}</p>
          </div>
        ))}
        {goals.length === 0 ? (
          <p className="text-sm text-muted-foreground">No monthly goals available.</p>
        ) : null}
      </div>
    </section>
  );
}
