"use client";

import { motion } from "framer-motion";

import { JOURNEY_PHASES, SECTION_CONTENT } from "@/features/landing/config/landing-content";
import { Reveal } from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";
import { cn } from "@/lib/utils";
import type { JourneyPhase } from "@/types/landing";

const STATUS_STYLES: Record<JourneyPhase["status"], string> = {
  complete: "border-success/40 bg-success/10 text-success",
  active: "border-primary/40 bg-primary/10 text-primary shadow-glow",
  upcoming: "border-border bg-muted/40 text-muted-foreground",
};

export function CareerJourneySection() {
  return (
    <SectionShell id="journey" variant="muted">
      <SectionHeader
        id="journey"
        eyebrow={SECTION_CONTENT.journey.eyebrow}
        title={SECTION_CONTENT.journey.title}
        description={SECTION_CONTENT.journey.description}
      />
      <Reveal>
        <div className="relative">
          <div
            className="absolute top-8 right-8 left-8 hidden h-0.5 bg-border md:block"
            aria-hidden="true"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_PHASES.map((phase, index) => (
              <motion.article
                key={phase.id}
                className={cn(
                  "surface-card relative p-6 text-center",
                  STATUS_STYLES[phase.status]
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.4 }}
              >
                <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-full border-2 border-current text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="font-semibold">{phase.title}</h3>
                <p className="mt-2 text-sm text-pretty opacity-80">
                  {phase.description}
                </p>
                {phase.status === "active" ? (
                  <span className="mt-3 inline-block rounded-full bg-primary/20 px-3 py-0.5 text-xs font-medium">
                    In Progress
                  </span>
                ) : null}
              </motion.article>
            ))}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
