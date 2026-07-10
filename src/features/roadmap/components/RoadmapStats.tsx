import { BookOpen, CalendarClock, CheckCircle2, Clock3 } from "lucide-react";

import type { Roadmap } from "@/features/roadmap/types";

type RoadmapStatsProps = {
  roadmap: Roadmap | null;
};

export function RoadmapStats({ roadmap }: RoadmapStatsProps) {
  const stats = [
    { label: "Completion", value: `${roadmap?.completion ?? 0}%`, icon: CheckCircle2 },
    { label: "Learning Hours", value: `${roadmap?.progress.learningHoursPlanned ?? 0}`, icon: Clock3 },
    { label: "Milestones", value: `${roadmap?.milestones.length ?? 0}`, icon: CalendarClock },
    { label: "Resources", value: `${roadmap?.resources.length ?? 0}`, icon: BookOpen },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <article key={stat.label} className="surface-card p-5">
            <Icon className="size-5 text-primary" aria-hidden="true" />
            <p className="mt-4 text-2xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </article>
        );
      })}
    </section>
  );
}
