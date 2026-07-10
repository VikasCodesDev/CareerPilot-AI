"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ARCHITECTURE_NODES, SECTION_CONTENT } from "@/features/landing/config/landing-content";
import { Reveal } from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";
import { cn } from "@/lib/utils";
import type { ArchitectureNode } from "@/types/landing";

const LAYER_LABELS: Record<ArchitectureNode["layer"], string> = {
  interface: "Experience",
  intelligence: "Intelligence",
  data: "Data",
};

const LAYER_COLORS: Record<ArchitectureNode["layer"], string> = {
  interface: "border-secondary/40 bg-secondary/10 text-secondary",
  intelligence: "border-primary/40 bg-primary/10 text-primary",
  data: "border-accent/40 bg-accent/10 text-accent",
};

export function ArchitectureSection() {
  const [activeId, setActiveId] = useState(ARCHITECTURE_NODES[0]?.id ?? "");

  const activeNode = ARCHITECTURE_NODES.find((n) => n.id === activeId);

  return (
    <SectionShell id="architecture" variant="muted">
      <SectionHeader
        id="architecture"
        eyebrow={SECTION_CONTENT.architecture.eyebrow}
        title={SECTION_CONTENT.architecture.title}
        description={SECTION_CONTENT.architecture.description}
      />
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-3" role="tablist" aria-label="Architecture layers">
            {ARCHITECTURE_NODES.map((node) => (
              <button
                key={node.id}
                type="button"
                role="tab"
                aria-selected={activeId === node.id}
                aria-controls={`arch-panel-${node.id}`}
                id={`arch-tab-${node.id}`}
                onClick={() => setActiveId(node.id)}
                className={cn(
                  "surface-card flex items-start gap-4 p-5 text-left transition-all",
                  activeId === node.id
                    ? "border-primary/40 shadow-glow"
                    : "hover:border-border-strong"
                )}
              >
                <span
                  className={cn(
                    "shrink-0 rounded-lg border px-2.5 py-1 text-xs font-semibold uppercase",
                    LAYER_COLORS[node.layer]
                  )}
                >
                  {LAYER_LABELS[node.layer]}
                </span>
                <div>
                  <h3 className="font-semibold">{node.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {node.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div
            className="glass relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl p-8"
            role="tabpanel"
            id={`arch-panel-${activeId}`}
            aria-labelledby={`arch-tab-${activeId}`}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              aria-hidden="true"
            >
              <div className="absolute top-1/4 left-1/4 size-32 rounded-full bg-primary/30 blur-3xl" />
              <div className="absolute right-1/4 bottom-1/4 size-24 rounded-full bg-secondary/30 blur-3xl" />
            </div>

            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 text-center"
                >
                  <span
                    className={cn(
                      "mb-4 inline-block rounded-lg border px-3 py-1 text-xs font-semibold uppercase",
                      LAYER_COLORS[activeNode.layer]
                    )}
                  >
                    {LAYER_LABELS[activeNode.layer]} Layer
                  </span>
                  <h3 className="text-h3 text-2xl font-bold">{activeNode.title}</h3>
                  <p className="mt-4 max-w-md text-pretty text-muted-foreground">
                    {activeNode.description}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
