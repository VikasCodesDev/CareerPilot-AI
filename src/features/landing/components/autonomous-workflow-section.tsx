"use client";

import { motion } from "framer-motion";
import { SECTION_CONTENT, WORKFLOW_STEPS } from "@/features/landing/config/landing-content";
import { Reveal } from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";
import { cn } from "@/lib/utils";

export function AutonomousWorkflowSection() {
  return (
    <SectionShell id="workflow">
      <SectionHeader
        id="workflow"
        eyebrow={SECTION_CONTENT.workflow.eyebrow}
        title={SECTION_CONTENT.workflow.title}
        description={SECTION_CONTENT.workflow.description}
      />
      <div className="relative max-w-5xl mx-auto">
        {/* Animated Connected SVG path */}
        <div className="absolute top-12 left-[10%] right-[10%] hidden h-0.5 md:block pointer-events-none" aria-hidden="true">
          <svg className="w-full h-2 overflow-visible" fill="none">
            <motion.path
              d="M 0,2 H 800"
              className="stroke-zinc-800"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
            {/* Animated Laser Pulse */}
            <motion.path
              d="M 0,2 H 800"
              stroke="url(#workflow-laser)"
              strokeWidth="3"
              strokeDasharray="40 180"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -440 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <defs>
              <linearGradient id="workflow-laser" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid gap-8 md:grid-cols-4 relative z-10">
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.id} delay={index * 0.12}>
                <article className="relative text-center group">
                  <motion.div
                    className="relative z-10 mx-auto mb-5 flex size-20 items-center justify-center rounded-2xl border border-white/[0.06] bg-zinc-950/40 backdrop-blur-xl shadow-lg transition-colors group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  >
                    {/* Radial active glow spotlight */}
                    <div className="absolute inset-0 rounded-2xl bg-radial-gradient from-primary/10 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <Icon className="size-8 text-primary group-hover:text-accent transition-colors" aria-hidden="true" />
                    <span className="absolute -top-2.5 -right-2.5 flex size-7 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-[11px] font-bold text-white shadow-md border border-white/[0.08]">
                      {index + 1}
                    </span>
                  </motion.div>
                  
                  <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="mt-2 text-xs text-pretty text-muted-foreground leading-relaxed px-2">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
