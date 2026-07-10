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

export function FeaturesGridSection() {
  return (
    <SectionShell id="features" variant="muted">
      <SectionHeader
        id="features"
        eyebrow={SECTION_CONTENT.features.eyebrow}
        title={SECTION_CONTENT.features.title}
        description={SECTION_CONTENT.features.description}
      />
      <StaggerReveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURE_ITEMS.map((feature) => {
          const Icon = feature.icon;
          return (
            <StaggerItem key={feature.id}>
              <motion.article
                className="surface-card group h-full p-6"
                initial="rest"
                whileHover="hover"
                variants={hoverLift}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-pretty text-muted-foreground">
                  {feature.description}
                </p>
              </motion.article>
            </StaggerItem>
          );
        })}
      </StaggerReveal>
    </SectionShell>
  );
}
