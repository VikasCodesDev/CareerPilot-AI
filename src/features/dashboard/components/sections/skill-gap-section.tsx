"use client";

import {
  ArrowUpRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Code2,
  Target,
  TrendingUp,
} from "lucide-react";
import { memo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { WidgetContainer } from "@/features/dashboard/components/content/widget-container";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";
import { WorkspaceBarChart } from "@/features/dashboard/components/shared/workspace-chart";
import { WorkspaceMetric } from "@/features/dashboard/components/shared/workspace-metric";

const SKILL_GAPS = [
  {
    skill: "System Design",
    current: 42,
    target: 80,
    priority: "High",
    resources: 6,
  },
  {
    skill: "TypeScript Advanced",
    current: 68,
    target: 85,
    priority: "Medium",
    resources: 4,
  },
  {
    skill: "Leadership Narrative",
    current: 55,
    target: 78,
    priority: "High",
    resources: 5,
  },
  {
    skill: "Data Storytelling",
    current: 61,
    target: 82,
    priority: "Medium",
    resources: 3,
  },
];

const STRENGTHS = [
  { skill: "Product Strategy", level: 88 },
  { skill: "UX Research", level: 84 },
  { skill: "AI Workflows", level: 79 },
];

const LEARNING_PATH = [
  "Complete system design fundamentals module",
  "Ship one architecture case study to portfolio",
  "Practice leadership stories in interview agent",
  "Close TypeScript generics gap with 2 exercises",
];

function SkillGapSectionComponent() {
  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <WorkspaceHeader
        title="Skill Gap"
        description="Compare your current skills against your target role and close gaps with guided learning paths."
        breadcrumbs={[{ label: "Skill Gap" }]}
        actions={
          <Button className="gap-2">
            <Brain className="size-4" aria-hidden="true" />
            Run Analysis
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <WorkspaceMetric
          label="Role Alignment"
          value="72%"
          icon={Target}
          delta="+8%"
          trend="up"
          accent="primary"
        />
        <WorkspaceMetric
          label="Priority Gaps"
          value="4"
          icon={TrendingUp}
          delta="2 high"
          trend="neutral"
          accent="warning"
        />
        <WorkspaceMetric
          label="Strengths"
          value="9"
          icon={CheckCircle2}
          delta="Stable"
          trend="neutral"
          accent="success"
        />
        <WorkspaceMetric
          label="Learning Resources"
          value="18"
          icon={BookOpen}
          delta="+5 new"
          trend="up"
          accent="accent"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <WidgetContainer
          title="Gap Analysis"
          description="Current vs target proficiency"
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            {SKILL_GAPS.map((gap) => (
              <article
                key={gap.skill}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Code2 className="size-4 text-primary" aria-hidden="true" />
                    <h3 className="text-sm font-semibold">{gap.skill}</h3>
                  </div>
                  <Badge variant={gap.priority === "High" ? "warning" : "outline"}>
                    {gap.priority} priority
                  </Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">Current</p>
                    <Progress value={gap.current} showValue />
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">Target</p>
                    <Progress value={gap.target} variant="success" showValue />
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {gap.resources} curated resources available
                </p>
              </article>
            ))}
          </div>
        </WidgetContainer>

        <WidgetContainer title="Strength Profile" description="Skills above target threshold">
          <WorkspaceBarChart
            data={STRENGTHS.map((item) => ({ label: item.skill.split(" ")[0], value: item.level }))}
          />
          <ul className="mt-4 space-y-2" role="list">
            {STRENGTHS.map((item) => (
              <li
                key={item.skill}
                className="flex items-center justify-between rounded-xl border border-white/[0.05] px-3 py-2 text-sm"
              >
                <span>{item.skill}</span>
                <span className="font-semibold tabular-nums text-success">{item.level}%</span>
              </li>
            ))}
          </ul>
        </WidgetContainer>
      </section>

      <WidgetContainer
        title="Recommended Learning Path"
        description="Prioritized actions from the skill gap agent"
        action={
          <Button variant="ghost" size="sm" className="gap-1">
            View roadmap
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Button>
        }
      >
        <ol className="space-y-3" role="list">
          {LEARNING_PATH.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-foreground">{step}</p>
            </li>
          ))}
        </ol>
      </WidgetContainer>
    </div>
  );
}

export const SkillGapSection = memo(SkillGapSectionComponent);
