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
      <div className="relative">
        <div
          className="absolute top-12 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 md:block"
          aria-hidden="true"
        />
        <div className="grid gap-8 md:grid-cols-4">
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.id} delay={index * 0.1}>
                <article className="relative text-center">
                  <motion.div
                    className="relative z-10 mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl border-gradient bg-card"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="size-7 text-primary" aria-hidden="true" />
                    <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                  </motion.div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
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
