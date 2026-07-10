"use client";

import { motion } from "framer-motion";
import { Bot, BrainCircuit, GitBranch, Sparkles } from "lucide-react";

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
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-xl sm:p-8"
      >
        <div className="absolute inset-0 -z-10 aurora-bg opacity-60" aria-hidden="true" />
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Autonomous Career Copilot
        </div>
        <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">AI Assistant</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Goal-driven orchestration across resume, skill gap, roadmap, planner, portfolio, interview, analytics, and opportunity agents.
        </p>
      </motion.header>

      {!authenticated ? (
        <section className="surface-card p-6 text-center">
          <Bot className="mx-auto size-10 text-primary" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-semibold">Sign in to run the AI workflow.</h2>
          <p className="mt-2 text-sm text-muted-foreground">Agent memory and execution history are account-scoped.</p>
        </section>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-3">
        <MetricCard icon={BrainCircuit} label="Memory Records" value={memoriesCount.toString()} />
        <MetricCard icon={GitBranch} label="Agents Selected" value={(latestWorkflow?.selectedAgents.length ?? 0).toString()} />
        <MetricCard icon={Bot} label="Provider" value={latestWorkflow?.provider ?? "ready"} />
      </section>

      <section className="surface-card p-6">
        <h2 className="text-xl font-semibold">Execution Timeline</h2>
        <div className="mt-5 space-y-3">
          {timeline.length > 0 ? (
            timeline.map((step) => (
              <article key={step.id} className="rounded-2xl border border-border bg-muted/20 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-semibold">{step.agent}</h3>
                  <span className="text-xs text-muted-foreground">{step.provider} - {step.status}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{step.summary}</p>
              </article>
            ))
          ) : (
            <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
              Run `/api/agent` or `/api/ai` with a career goal to generate an execution timeline.
            </p>
          )}
        </div>
      </section>

      <section className="surface-card p-6">
        <h2 className="text-xl font-semibold">Latest Plan</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {latestWorkflow?.summary ?? "No workflow has been executed in this session yet."}
        </p>
        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {(latestWorkflow?.recommendations ?? []).slice(0, 6).map((item) => (
            <p key={item} className="rounded-2xl border border-border bg-muted/20 p-3 text-sm text-muted-foreground">
              {item}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Bot;
  label: string;
  value: string;
}) {
  return (
    <article className="surface-card p-5">
      <Icon className="size-5 text-primary" aria-hidden="true" />
      <p className="mt-4 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </article>
  );
}
