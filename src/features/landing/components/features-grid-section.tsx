"use client";

import { motion } from "framer-motion";
import { FEATURE_ITEMS, SECTION_CONTENT } from "@/features/landing/config/landing-content";
import {
  StaggerItem,
  StaggerReveal,
} from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";
import { hoverLift } from "@/features/landing/lib/motion";
import { cn } from "@/lib/utils";

// Mapping feature item IDs to custom graphic indicators for bento boxes
function renderBentoWidget(id: string) {
  switch (id) {
    case "resume-ai":
      return (
        <div className="mt-4 flex flex-col gap-1.5 rounded-lg bg-zinc-950/40 p-3 border border-white/[0.04] text-[10px] font-mono text-zinc-500">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Optimizing: CV_Staff_2026.pdf</span>
            <span className="text-primary font-bold">94% score</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: "94%" }} />
          </div>
          <div className="flex gap-2 mt-1">
            <span className="rounded bg-white/[0.04] px-1.5 py-0.5 text-zinc-400">#kubernetes</span>
            <span className="rounded bg-white/[0.04] px-1.5 py-0.5 text-zinc-400">#system-design</span>
            <span className="rounded bg-white/[0.04] px-1.5 py-0.5 text-zinc-400">#fintech</span>
          </div>
        </div>
      );
    case "interview-coach":
      return (
        <div className="mt-4 space-y-2 rounded-lg bg-zinc-950/40 p-3 border border-white/[0.04] text-[10px]">
          <p className="text-zinc-500 font-mono">Speech clarity analysis:</p>
          <div className="flex items-end gap-1 h-12 pt-4">
            <div className="w-1.5 bg-primary/40 rounded-full animate-pulse h-6" style={{ animationDelay: "0.1s" }} />
            <div className="w-1.5 bg-primary/60 rounded-full animate-pulse h-10" style={{ animationDelay: "0.3s" }} />
            <div className="w-1.5 bg-primary rounded-full animate-pulse h-8" style={{ animationDelay: "0.5s" }} />
            <div className="w-1.5 bg-accent rounded-full animate-pulse h-12" style={{ animationDelay: "0.2s" }} />
            <div className="w-1.5 bg-accent/60 rounded-full animate-pulse h-7" style={{ animationDelay: "0.4s" }} />
            <div className="w-1.5 bg-primary/50 rounded-full animate-pulse h-5" style={{ animationDelay: "0.6s" }} />
          </div>
          <p className="text-[9px] text-zinc-400 font-mono text-center">Confidence: Excellent &middot; Pace: Steady</p>
        </div>
      );
    case "roadmap-planner":
      return (
        <div className="mt-4 flex flex-col gap-2 rounded-lg bg-zinc-950/40 p-3 border border-white/[0.04] text-[10px]">
          <div className="flex items-center gap-2">
            <span className="flex size-4 items-center justify-center rounded-full bg-green-500/10 text-green-400 font-bold text-[8px]">✓</span>
            <span className="text-zinc-400">Q1: Redesign global branding portfolio</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[8px] animate-pulse">&gt;</span>
            <span className="text-white font-semibold">Q2: IBM Cloud Architecture cert</span>
          </div>
        </div>
      );
    case "skill-analytics":
      return (
        <div className="mt-4 space-y-2 rounded-lg bg-zinc-950/40 p-3 border border-white/[0.04] text-[10px]">
          <div className="flex justify-between text-zinc-500">
            <span>Market Demand Alignment</span>
            <span>88% Match</span>
          </div>
          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between text-[9px] text-zinc-400">
                <span>Distributed Systems</span>
                <span>Highly Aligned</span>
              </div>
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "90%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[9px] text-zinc-400">
                <span>TypeScript / Next.js</span>
                <span>Optimized</span>
              </div>
              <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: "85%" }} />
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function FeaturesGridSection() {
  return (
    <SectionShell id="features" variant="muted">
      <SectionHeader
        id="features"
        eyebrow={SECTION_CONTENT.features.eyebrow}
        title={SECTION_CONTENT.features.title}
        description={SECTION_CONTENT.features.description}
      />
      <StaggerReveal className="grid gap-6 md:grid-cols-3 auto-rows-max max-w-5xl mx-auto">
        {FEATURE_ITEMS.map((feature, idx) => {
          const Icon = feature.icon;
          // Set custom bento grid sizing based on features layout
          const isLarge = feature.id === "resume-ai" || feature.id === "skill-analytics";
          return (
            <StaggerItem 
              key={feature.id} 
              className={cn(
                "h-full",
                isLarge ? "md:col-span-2" : "md:col-span-1"
              )}
            >
              <motion.article
                className="glass-premium group flex flex-col justify-between h-full rounded-2xl border border-white/[0.06] bg-zinc-950/20 p-6 shadow-xl"
                initial="rest"
                whileHover="hover"
                variants={hoverLift}
                transition={{ duration: 0.25 }}
              >
                <div>
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-110 transition-transform shadow-glow">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Custom Bento graphics rendering */}
                {renderBentoWidget(feature.id)}
              </motion.article>
            </StaggerItem>
          );
        })}
      </StaggerReveal>
    </SectionShell>
  );
}
