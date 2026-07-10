import type { WeeklyGoal } from "@/features/roadmap/types";

type LearningCalendarProps = {
  goals: WeeklyGoal[];
};

export function LearningCalendar({ goals }: LearningCalendarProps) {
  return (
    <section className="surface-card p-6">
      <h2 className="text-xl font-semibold">Learning Calendar</h2>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {goals.slice(0, 12).map((goal) => (
          <div key={goal.week} className="rounded-xl border border-border bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">Week {goal.week}</p>
            <p className="mt-1 truncate text-sm font-medium">{goal.focus}</p>
            <p className="mt-2 text-xs text-primary">{goal.targetHours}h</p>
          </div>
        ))}
        {goals.length === 0 ? (
          <p className="col-span-full text-sm text-muted-foreground">No weekly goals available.</p>
        ) : null}
      </div>
    </section>
  );
}
