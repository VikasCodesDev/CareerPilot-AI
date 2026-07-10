import type { WeeklyGoal } from "@/features/roadmap/types";

type WeeklyProgressProps = {
  goal: WeeklyGoal | undefined;
};

export function WeeklyProgress({ goal }: WeeklyProgressProps) {
  const value = goal ? Math.min(100, Math.round((goal.completedHours / goal.targetHours) * 100)) : 0;

  return (
    <section className="surface-card p-6">
      <h2 className="text-xl font-semibold">Weekly Goal</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {goal?.title ?? "No active weekly goal yet."}
      </p>
      <div className="mt-5 h-2 rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {goal ? `${goal.completedHours}/${goal.targetHours} learning hours` : "0/0 learning hours"}
      </p>
    </section>
  );
}
