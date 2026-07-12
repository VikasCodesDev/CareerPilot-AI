import { BookOpen, CalendarClock, CheckCircle2, Clock3 } from "lucide-react";

import { WorkspaceMetric } from "@/features/dashboard/components/shared/workspace-metric";
import type { Roadmap } from "@/features/roadmap/types";

type RoadmapStatsProps = {
  roadmap: Roadmap | null;
};

export function RoadmapStats({ roadmap }: RoadmapStatsProps) {
  const stats = [
    {
      label: "Completion",
      value: `${roadmap?.completion ?? 0}%`,
      icon: CheckCircle2,
      accent: "success" as const,
    },
    {
      label: "Learning Hours",
      value: `${roadmap?.progress.learningHoursPlanned ?? 0}`,
      icon: Clock3,
      accent: "primary" as const,
    },
    {
      label: "Milestones",
      value: `${roadmap?.milestones.length ?? 0}`,
      icon: CalendarClock,
      accent: "accent" as const,
    },
    {
      label: "Resources",
      value: `${roadmap?.resources.length ?? 0}`,
      icon: BookOpen,
      accent: "secondary" as const,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <WorkspaceMetric
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          accent={stat.accent}
        />
      ))}
    </section>
  );
}
