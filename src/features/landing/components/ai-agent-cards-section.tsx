"use client";

import { motion } from "framer-motion";

import { AGENT_CARDS, SECTION_CONTENT } from "@/features/landing/config/landing-content";
import {
  StaggerItem,
  StaggerReveal,
} from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";
import { hoverLift } from "@/features/landing/lib/motion";
import { cn } from "@/lib/utils";

export function AiAgentCardsSection() {
  return (
    <SectionShell id="agents">
      <SectionHeader
        id="agents"
        eyebrow={SECTION_CONTENT.agents.eyebrow}
        title={SECTION_CONTENT.agents.title}
        description={SECTION_CONTENT.agents.description}
      />
      <StaggerReveal className="grid gap-6 lg:grid-cols-3">
        {AGENT_CARDS.map((agent) => {
          const Icon = agent.icon;
          return (
            <StaggerItem key={agent.id}>
              <motion.article
                className={cn(
                  "surface-card group relative h-full overflow-hidden p-6",
                  `bg-gradient-to-br ${agent.accent}`
                )}
                initial="rest"
                whileHover="hover"
                variants={hoverLift}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
                    <Icon className="size-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold">{agent.name}</h3>
                    <p className="text-xs text-muted-foreground">{agent.role}</p>
                  </div>
                </div>
                <p className="text-sm text-pretty text-muted-foreground">
                  {agent.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${agent.name} capabilities`}>
                  {agent.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium"
                    >
                      {cap}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </StaggerItem>
          );
        })}
      </StaggerReveal>
    </SectionShell>
  );
}
