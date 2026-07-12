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

// Override layout accents for Purple, Plum, Magenta theme
const CUSTOM_AGENT_ACCENTS: Record<string, string> = {
  "resume-agent": "from-primary/15 via-accent/5 to-transparent",
  "interview-agent": "from-secondary/15 via-primary/5 to-transparent",
  "roadmap-agent": "from-accent/15 via-secondary/5 to-transparent",
};

export function AiAgentCardsSection() {
  return (
    <SectionShell id="agents">
      <SectionHeader
        id="agents"
        eyebrow={SECTION_CONTENT.agents.eyebrow}
        title={SECTION_CONTENT.agents.title}
        description={SECTION_CONTENT.agents.description}
      />
      <StaggerReveal className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
        {AGENT_CARDS.map((agent) => {
          const Icon = agent.icon;
          const gradientAccent = CUSTOM_AGENT_ACCENTS[agent.id] || "from-primary/10 to-transparent";
          return (
            <StaggerItem key={agent.id}>
              <motion.article
                className={cn(
                  "glass-premium group relative h-full overflow-hidden p-8 rounded-2xl border border-white/[0.06] bg-zinc-950/20 shadow-xl",
                  `bg-gradient-to-br ${gradientAccent}`
                )}
                initial="rest"
                whileHover="hover"
                variants={hoverLift}
                transition={{ duration: 0.3 }}
              >
                {/* Floating card ambient glow */}
                <div className="absolute -top-12 -right-12 size-24 rounded-full bg-gradient-to-br from-primary to-accent opacity-0 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
                
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-zinc-900/80 border border-white/[0.06] group-hover:scale-105 group-hover:border-primary/30 transition-transform shadow-glow">
                    <Icon className="size-7 text-primary group-hover:text-accent transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{agent.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">{agent.role}</p>
                  </div>
                </div>
                
                <p className="text-sm text-pretty text-zinc-400 leading-relaxed min-h-[72px]">
                  {agent.description}
                </p>
                
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${agent.name} capabilities`}>
                  {agent.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="rounded-lg border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.1] px-3 py-1.5 text-xs font-semibold text-zinc-300 transition-colors cursor-default"
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
