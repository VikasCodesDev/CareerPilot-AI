import { ClipboardList, Layers3, Route } from "lucide-react";

import type { Roadmap } from "@/features/roadmap/types";

type RoadmapSidebarProps = {
  roadmap: Roadmap | null;
};

export function RoadmapSidebar({ roadmap }: RoadmapSidebarProps) {
  const items = [
    { label: "Timeline View", value: `${roadmap?.estimatedDuration ?? 0} weeks`, icon: Route },
    { label: "Kanban View", value: `${roadmap?.tasks.length ?? 0} tasks`, icon: ClipboardList },
    { label: "Career Target", value: roadmap?.targetRole ?? "Not selected", icon: Layers3 },
  ];

  return (
    <aside className="surface-card p-5">
      <h2 className="text-lg font-semibold">Roadmap Views</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-xl border border-border bg-muted/20 p-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {item.label}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{item.value}</p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
