"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import {
  DashboardContentGrid,
  DashboardGridItem,
} from "@/features/dashboard/components/content/dashboard-content-grid";
import { QuickActionCard } from "@/features/dashboard/components/content/quick-action-card";
import { WidgetContainer } from "@/features/dashboard/components/content/widget-container";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";
import { DASHBOARD_QUICK_ACTIONS } from "@/features/dashboard/config/dashboard-nav";

const OVERVIEW_WIDGETS = [
  {
    id: "readiness",
    title: "Career Readiness",
    description: "Overall progress across your workspace",
    span: "wide" as const,
  },
  {
    id: "resume",
    title: "Resume Score",
    description: "Latest ATS compatibility snapshot",
    span: "default" as const,
  },
  {
    id: "skills",
    title: "Skill Momentum",
    description: "Top skills gaining traction this week",
    span: "default" as const,
  },
  {
    id: "activity",
    title: "Recent Activity",
    description: "Latest updates from your AI agents",
    span: "full" as const,
  },
];

function OverviewSectionComponent() {
  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <WorkspaceHeader
        title="Overview"
        description="Your autonomous career command center — track progress, launch actions, and stay ahead."
        breadcrumbs={[{ label: "Overview" }]}
        actions={
          <Button className="gap-2">
            <Sparkles className="size-4" aria-hidden="true" />
            Launch AI Session
          </Button>
        }
      />

      <section aria-label="Quick actions">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Quick Actions
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {DASHBOARD_QUICK_ACTIONS.map((action) => (
            <QuickActionCard key={action.id} action={action} />
          ))}
        </div>
      </section>

      <section aria-label="Dashboard widgets">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Workspace Insights
          </h2>
          <Button variant="ghost" size="sm" className="gap-1">
            View all
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
        <DashboardContentGrid>
          {OVERVIEW_WIDGETS.map((widget) => (
            <DashboardGridItem
              key={widget.id}
              className={
                widget.span === "wide"
                  ? "md:col-span-2"
                  : widget.span === "full"
                    ? "md:col-span-2 xl:col-span-3"
                    : undefined
              }
            >
              <WidgetContainer
                title={widget.title}
                description={widget.description}
                span={widget.span}
              >
                <div className="flex min-h-[10rem] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/15 px-6 py-8 text-center">
                  <p className="text-sm font-medium text-foreground">
                    Widget placeholder
                  </p>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Data visualization and AI insights will render here in future modules.
                  </p>
                </div>
              </WidgetContainer>
            </DashboardGridItem>
          ))}
        </DashboardContentGrid>
      </section>
    </div>
  );
}

export const OverviewSection = memo(OverviewSectionComponent);
