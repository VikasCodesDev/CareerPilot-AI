"use client";

import { ArrowUpRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DashboardContentGrid,
  DashboardGridItem,
} from "@/features/dashboard/components/content/dashboard-content-grid";
import { QuickActionCard } from "@/features/dashboard/components/content/quick-action-card";
import { WidgetContainer } from "@/features/dashboard/components/content/widget-container";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";
import { WorkspaceAreaChart, WorkspaceBarChart } from "@/features/dashboard/components/shared/workspace-chart";
import { WorkspaceMetric } from "@/features/dashboard/components/shared/workspace-metric";
import { DASHBOARD_QUICK_ACTIONS } from "@/features/dashboard/config/dashboard-nav";
import type { IAnalytics } from "@/types/backend";

type OverviewSectionProps = {
  analytics?: IAnalytics | null;
  atsScore?: number | null;
  memoryCount?: number;
};

function formatDate(value?: Date | string | null) {
  if (!value) return "No activity";
  return new Date(value).toLocaleDateString();
}

function OverviewSectionComponent({
  analytics = null,
  atsScore = null,
  memoryCount = 0,
}: OverviewSectionProps) {
  const careerReadiness = analytics?.careerScore ?? 0;
  const weeklyHours =
    analytics?.weeklyHoursStudied?.reduce((sum, day) => sum + day.hours, 0) ?? 0;
  const roadmapHealth = analytics?.roadmapCompletionRate ?? 0;
  const readinessChartData =
    analytics?.weeklyHoursStudied?.map((item) => ({
      label: item.day,
      value: item.hours,
    })) ?? [];
  const skillData = [
    { label: "Career", value: careerReadiness },
    { label: "ATS", value: atsScore ?? 0 },
    { label: "Roadmap", value: roadmapHealth },
    { label: "Agents", value: Math.min(memoryCount * 10, 100) },
    { label: "Study", value: Math.min(weeklyHours * 5, 100) },
  ];
  const activityItems = [
    {
      agent: "Analytics Agent",
      action: analytics
        ? `Logged ${weeklyHours} study hours last week`
        : "No analytics activity recorded yet",
      time: formatDate(analytics?.updatedAt),
    },
    {
      agent: "Resume Agent",
      action:
        atsScore !== null ? `Latest ATS score is ${atsScore}` : "No ATS report generated yet",
      time: atsScore !== null ? "Latest report" : "No activity",
    },
    {
      agent: "Roadmap Agent",
      action: analytics
        ? `Roadmap completion at ${roadmapHealth}%`
        : "No roadmap progress tracked yet",
      time: formatDate(analytics?.lastActiveDate),
    },
    {
      agent: "Memory Agent",
      action: `${memoryCount} saved agent contexts`,
      time: memoryCount > 0 ? "Saved in workspace" : "No activity",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <WorkspaceHeader
        title="Overview"
        description="Your autonomous career command center: track progress, launch actions, and stay ahead."
        breadcrumbs={[{ label: "Overview" }]}
        actions={
          <Button className="gap-2">
            <Sparkles className="size-4" aria-hidden="true" />
            Launch AI Session
          </Button>
        }
      />

      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric
          label="Career Readiness"
          value={`${careerReadiness}%`}
          icon={TrendingUp}
          delta={analytics ? "From analytics" : "No data"}
          trend={careerReadiness >= 70 ? "up" : "neutral"}
          accent="primary"
        />
        <WorkspaceMetric
          label="ATS Score"
          value={atsScore !== null ? String(atsScore) : "0"}
          icon={Zap}
          delta={atsScore !== null ? "Latest report" : "No report"}
          trend={atsScore !== null ? "up" : "neutral"}
          accent="accent"
        />
        <WorkspaceMetric
          label="Active Agents"
          value={String(memoryCount)}
          icon={Sparkles}
          delta={memoryCount > 0 ? "Saved" : "No sessions"}
          trend="neutral"
          accent="secondary"
        />
        <WorkspaceMetric
          label="Weekly Hours"
          value={String(weeklyHours)}
          icon={ArrowUpRight}
          delta={roadmapHealth > 0 ? `${roadmapHealth}% roadmap` : "No roadmap"}
          trend={roadmapHealth > 50 ? "up" : roadmapHealth > 0 ? "neutral" : "down"}
          accent="success"
        />
      </section>

      <section aria-label="Quick actions">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
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
          <h2 className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Workspace Insights
          </h2>
          <Button variant="ghost" size="sm" className="gap-1">
            View all
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Button>
        </div>
        <DashboardContentGrid>
          <DashboardGridItem className="md:col-span-2">
            <WidgetContainer
              title="Career Readiness"
              description="Overall progress across your workspace"
              span="wide"
            >
              <div className="space-y-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-4xl font-bold tracking-tight tabular-nums">
                      {careerReadiness}%
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {weeklyHours} study hours logged this week
                    </p>
                  </div>
                  <Progress value={careerReadiness} showValue className="max-w-xs" />
                </div>
                <WorkspaceAreaChart data={readinessChartData} height={140} />
              </div>
            </WidgetContainer>
          </DashboardGridItem>

          <DashboardGridItem>
            <WidgetContainer title="Resume Score" description="Latest ATS compatibility snapshot">
              <div className="flex flex-col items-center gap-4 py-2 text-center">
                <p className="text-5xl font-bold tracking-tight text-gradient">
                  {atsScore !== null ? atsScore : "0"}
                </p>
                <Progress value={atsScore ?? 0} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  {atsScore !== null
                    ? "Latest ATS compatibility snapshot from your reports"
                    : "Upload and analyze a resume to generate a score"}
                </p>
              </div>
            </WidgetContainer>
          </DashboardGridItem>

          <DashboardGridItem>
            <WidgetContainer
              title="Skill Momentum"
              description="Workspace signals derived from saved activity"
            >
              <WorkspaceBarChart data={skillData} />
            </WidgetContainer>
          </DashboardGridItem>

          <DashboardGridItem className="md:col-span-2 xl:col-span-3">
            <WidgetContainer
              title="Recent Activity"
              description="Latest updates from your AI agents"
              span="full"
            >
              <ul className="space-y-3" role="list">
                {activityItems.map((item) => (
                  <li
                    key={`${item.agent}-${item.time}`}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3 transition-colors hover:border-primary/20 hover:bg-primary/[0.04]"
                  >
                    <div>
                      <p className="text-sm font-semibold">{item.agent}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{item.action}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                  </li>
                ))}
              </ul>
            </WidgetContainer>
          </DashboardGridItem>
        </DashboardContentGrid>
      </section>
    </div>
  );
}

export const OverviewSection = memo(OverviewSectionComponent);
