import { SECTION_CONTENT, ROADMAP_ITEMS } from "@/features/landing/config/landing-content";
import { Reveal } from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";
import { cn } from "@/lib/utils";
import type { RoadmapItem } from "@/types/landing";

const STATUS_STYLES: Record<RoadmapItem["status"], { dot: string; label: string }> = {
  shipped: { dot: "bg-success", label: "Shipped" },
  "in-progress": { dot: "bg-primary animate-soft-pulse", label: "In Progress" },
  planned: { dot: "bg-muted-foreground/40", label: "Planned" },
};

export function RoadmapPreviewSection() {
  return (
    <SectionShell id="roadmap" variant="muted">
      <SectionHeader
        id="roadmap"
        eyebrow={SECTION_CONTENT.roadmap.eyebrow}
        title={SECTION_CONTENT.roadmap.title}
        description={SECTION_CONTENT.roadmap.description}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {ROADMAP_ITEMS.map((item, index) => {
          const status = STATUS_STYLES[item.status];
          return (
            <Reveal key={item.id} delay={index * 0.1}>
              <article className="surface-card flex h-full gap-4 p-6">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn("size-3 rounded-full", status.dot)}
                    aria-hidden="true"
                  />
                  {index < ROADMAP_ITEMS.length - 1 ? (
                    <div className="hidden w-px flex-1 bg-border md:block" aria-hidden="true" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-primary">
                      {item.quarter}
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {status.label}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
