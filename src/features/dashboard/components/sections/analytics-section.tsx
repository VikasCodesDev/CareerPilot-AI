"use client";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  Calendar,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { memo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WidgetContainer } from "@/features/dashboard/components/content/widget-container";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";
import {
  WorkspaceAreaChart,
  WorkspaceBarChart,
  WorkspaceDonutChart,
} from "@/features/dashboard/components/shared/workspace-chart";
import { WorkspaceMetric } from "@/features/dashboard/components/shared/workspace-metric";

export type AnalyticsChartPoint = {
  label: string;
  value: number;
};

export type AnalyticsActivityRow = {
  module: string;
  events: number;
  change: string;
  status: "Growing" | "Stable" | "Idle";
};

export type AnalyticsSignal = {
  kind: "portfolio" | "interview" | "target";
  title: string;
  detail: string;
};

export type AnalyticsSectionData = {
  metrics: {
    careerVelocity: number;
    agentSessions: number;
    outcomesTracked: number;
    workspaceHealth: string;
  };
  growthData: AnalyticsChartPoint[];
  moduleData: AnalyticsChartPoint[];
  distribution: { label: string; value: number; color: string }[];
  activityRows: AnalyticsActivityRow[];
  signals: AnalyticsSignal[];
};

type AnalyticsSectionProps = {
  data?: AnalyticsSectionData;
};

const EMPTY_ANALYTICS: AnalyticsSectionData = {
  metrics: {
    careerVelocity: 0,
    agentSessions: 0,
    outcomesTracked: 0,
    workspaceHealth: "No data",
  },
  growthData: [],
  moduleData: [],
  distribution: [],
  activityRows: [],
  signals: [],
};

const signalIcons = {
  portfolio: Briefcase,
  interview: Users,
  target: Target,
} as const;

function AnalyticsSectionComponent({ data = EMPTY_ANALYTICS }: AnalyticsSectionProps) {
  const distributionTotal = data.distribution.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <WorkspaceHeader
        title="Analytics"
        description="Progress metrics, agent activity, and career momentum across your workspace."
        breadcrumbs={[{ label: "Analytics" }]}
        actions={
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="size-4" aria-hidden="true" />
            Saved data
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Analytics metrics">
        <WorkspaceMetric
          label="Career Velocity"
          value={String(data.metrics.careerVelocity)}
          icon={TrendingUp}
          delta="Career score"
          trend={data.metrics.careerVelocity > 0 ? "up" : "neutral"}
          accent="primary"
        />
        <WorkspaceMetric
          label="Agent Sessions"
          value={String(data.metrics.agentSessions)}
          icon={Activity}
          delta="Memory records"
          trend={data.metrics.agentSessions > 0 ? "up" : "neutral"}
          accent="accent"
        />
        <WorkspaceMetric
          label="Outcomes Tracked"
          value={String(data.metrics.outcomesTracked)}
          icon={Target}
          delta="Saved records"
          trend={data.metrics.outcomesTracked > 0 ? "up" : "neutral"}
          accent="success"
        />
        <WorkspaceMetric
          label="Workspace Health"
          value={data.metrics.workspaceHealth}
          icon={BarChart3}
          delta="Composite"
          trend="neutral"
          accent="secondary"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <WidgetContainer
          title="Career Growth Index"
          description="Weekly study hours from analytics"
          className="lg:col-span-2"
        >
          <WorkspaceAreaChart data={data.growthData} height={180} />
        </WidgetContainer>

        <WidgetContainer title="Module Distribution" description="Engagement by saved workspace area">
          <div className="flex flex-col items-center gap-5 py-2">
            <WorkspaceDonutChart
              centerValue={String(distributionTotal)}
              centerLabel="Records"
              segments={data.distribution}
            />
            <div className="grid w-full grid-cols-2 gap-2">
              {data.moduleData.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2"
                >
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold tabular-nums">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </WidgetContainer>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <WidgetContainer title="Module Performance" description="Saved records by feature">
          <WorkspaceBarChart data={data.moduleData} />
        </WidgetContainer>

        <WidgetContainer title="Agent Activity" description="Recent module event volume">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.activityRows.map((row) => (
                <TableRow key={row.module}>
                  <TableCell className="font-medium">{row.module}</TableCell>
                  <TableCell className="tabular-nums">{row.events}</TableCell>
                  <TableCell className={row.status === "Idle" ? "text-muted-foreground" : "text-success"}>
                    {row.change}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.status === "Growing"
                          ? "success"
                          : row.status === "Stable"
                            ? "outline"
                            : "warning"
                      }
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </WidgetContainer>
      </section>

      <WidgetContainer
        title="Career Signals"
        description="High-impact insights from saved workspace data"
        action={
          <Button variant="ghost" size="sm" className="gap-1">
            Export
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Button>
        }
      >
        <div className="grid gap-3 md:grid-cols-3">
          {data.signals.map((signal) => {
            const Icon = signalIcons[signal.kind];
            return (
              <article
                key={signal.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-primary/20 hover:bg-primary/[0.04]"
              >
                <Icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-semibold">{signal.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{signal.detail}</p>
              </article>
            );
          })}
        </div>
      </WidgetContainer>
    </div>
  );
}

export const AnalyticsSection = memo(AnalyticsSectionComponent);
