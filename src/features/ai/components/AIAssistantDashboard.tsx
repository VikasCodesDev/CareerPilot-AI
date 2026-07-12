"use client";

import { motion } from "framer-motion";
import { Bot, BrainCircuit, GitBranch, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { WorkspaceHero } from "@/features/dashboard/components/shared/workspace-hero";
import { WorkspaceMetric } from "@/features/dashboard/components/shared/workspace-metric";
import type { AIWorkflowResponse } from "@/features/ai/types";

type AIAssistantDashboardProps = {
  latestWorkflow: AIWorkflowResponse | null;
  memoriesCount: number;
  authenticated: boolean;
};

export function AIAssistantDashboard({
  latestWorkflow,
  memoriesCount,
  authenticated,
}: AIAssistantDashboardProps) {
  const timeline = latestWorkflow?.executionTimeline ?? [];

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <WorkspaceHero
        eyebrow="Autonomous Career Copilot"
        eyebrowIcon={Sparkles}
        title="Career Chat"
        description="Goal-driven orchestration across resume, skill gap, roadmap, planner, portfolio, interview, analytics, and opportunity agents."
        badges={["Multi-agent", "Memory-aware", "Execution timeline"]}
      />

      {!authenticated ? (
        <section className="workspace-card flex flex-col items-center px-6 py-14 text-center">
          <Bot className="size-10 text-primary" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold">Sign in to run the AI workflow.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Agent memory and execution history are account-scoped.
          </p>
        </section>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-3">
        <WorkspaceMetric
          icon={BrainCircuit}
          label="Memory Records"
          value={memoriesCount.toString()}
          accent="primary"
        />
        <WorkspaceMetric
          icon={GitBranch}
          label="Agents Selected"
          value={(latestWorkflow?.selectedAgents.length ?? 0).toString()}
          accent="accent"
        />
        <WorkspaceMetric
          icon={Bot}
          label="Provider"
          value={latestWorkflow?.provider ?? "ready"}
          accent="secondary"
        />
      </section>

      <section className="workspace-card p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Execution Timeline</h2>
          <Badge variant="outline">{timeline.length} steps</Badge>
        </div>
        <div className="space-y-3">
          {timeline.length > 0 ? (
            timeline.map((step, index) => (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-primary/20"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-semibold">{step.agent}</h3>
                  <span className="text-xs text-muted-foreground">
                    {step.provider} · {step.status}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{step.summary}</p>
              </motion.article>
            ))
          ) : (
            <p className="rounded-2xl border border-dashed border-white/[0.1] p-6 text-sm text-muted-foreground">
              Run `/api/agent` or `/api/ai` with a career goal to generate an execution timeline.
            </p>
          )}
        </div>
      </section>

      <section className="workspace-card p-6">
        <h2 className="text-xl font-semibold tracking-tight">Latest Plan</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {latestWorkflow?.summary ?? "No workflow has been executed in this session yet."}
        </p>
        <div className="mt-5">
          <Progress value={timeline.length > 0 ? 72 : 0} showValue label="Plan progress" />
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {(latestWorkflow?.recommendations ?? []).slice(0, 6).map((item) => (
            <p
              key={item}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 text-sm text-muted-foreground"
            >
              {item}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
