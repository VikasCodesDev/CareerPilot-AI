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
  interface: "border-primary/30 bg-primary/10 text-primary",
  intelligence: "border-secondary/30 bg-secondary/10 text-secondary",
  data: "border-accent/30 bg-accent/10 text-accent",
};

// Node connector graphics for high-tech premium feel
function renderLayerSchematic(layer: ArchitectureNode["layer"]) {
  switch (layer) {
    case "interface":
      return (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs font-mono text-[10px] text-zinc-500">
          <div className="rounded-lg border border-white/[0.08] bg-zinc-900/60 px-4 py-2 text-white font-bold shadow-md">
            Next.js / React 19 Client
          </div>
          <div className="h-6 w-0.5 bg-gradient-to-b from-primary to-secondary animate-pulse" />
          <div className="rounded-lg border border-white/[0.08] bg-zinc-900/60 px-4 py-2 text-white font-bold shadow-md">
            Edge API Routes (Auth.js)
          </div>
          <div className="h-6 w-0.5 bg-gradient-to-b from-secondary to-accent animate-pulse" />
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-primary font-bold shadow-glow">
            Realtime Socket Server
          </div>
        </div>
      );
    case "intelligence":
      return (
        <div className="flex flex-col items-center justify-center gap-2 w-full font-mono text-[10px] text-zinc-400">
          <div className="rounded-lg border border-secondary/20 bg-secondary/5 px-4 py-2 text-secondary font-bold shadow-glow mb-2">
            Multi-Agent Orchestrator
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-center">
              <div className="rounded border border-white/[0.06] bg-zinc-900/50 p-2 text-white">Resume Agent</div>
              <div className="h-4 w-px bg-zinc-700" />
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded border border-white/[0.06] bg-zinc-900/50 p-2 text-white">Interview Agent</div>
              <div className="h-4 w-px bg-zinc-700" />
            </div>
            <div className="flex flex-col items-center">
              <div className="rounded border border-white/[0.06] bg-zinc-900/50 p-2 text-white">Roadmap Agent</div>
              <div className="h-4 w-px bg-zinc-700" />
            </div>
          </div>
          <div className="h-0.5 w-48 bg-zinc-800" />
          <div className="mt-2 rounded-lg border border-white/[0.08] bg-zinc-900/60 px-3 py-1.5 text-zinc-300">
            LLM Router (Gemini Pro / Groq)
          </div>
        </div>
      );
    case "data":
      return (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs font-mono text-[10px] text-zinc-500">
          <div className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-2 text-accent font-bold shadow-glow">
            Profile Knowledge Graph
          </div>
          <div className="h-6 w-0.5 bg-zinc-800" />
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-white/[0.08] bg-zinc-900/60 px-3 py-2 text-center text-white">
              MongoDB Atlas
            </div>
            <div className="rounded-lg border border-white/[0.08] bg-zinc-900/60 px-3 py-2 text-center text-white">
              Vector Embeddings
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

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
        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto items-stretch">
          <div className="flex flex-col gap-4" role="tablist" aria-label="Architecture layers">
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
                  "glass-premium flex items-start gap-5 p-6 text-left transition-all rounded-2xl border border-white/[0.06] bg-zinc-950/20 shadow-lg cursor-pointer",
                  activeId === node.id
                    ? "border-primary/40 shadow-[0_0_30px_rgba(139,92,246,0.15)] bg-zinc-900/40"
                    : "hover:border-white/[0.12] hover:bg-zinc-900/10"
                )}
              >
                <span
                  className={cn(
                    "shrink-0 rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider",
                    LAYER_COLORS[node.layer]
                  )}
                >
                  {LAYER_LABELS[node.layer]}
                </span>
                <div>
                  <h3 className="font-bold text-white text-base">{node.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div
            className="glass-premium relative flex flex-col justify-center items-center overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950/20 p-8 min-h-[360px]"
            role="tabpanel"
            id={`arch-panel-${activeId}`}
            aria-labelledby={`arch-tab-${activeId}`}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              aria-hidden="true"
            >
              <div className="absolute top-1/4 left-1/4 size-36 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute right-1/4 bottom-1/4 size-28 rounded-full bg-accent/20 blur-3xl" />
            </div>

            <AnimatePresence mode="wait">
              {activeNode ? (
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10 w-full flex flex-col items-center"
                >
                  <span
                    className={cn(
                      "mb-6 inline-block rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider",
                      LAYER_COLORS[activeNode.layer]
                    )}
                  >
                    {LAYER_LABELS[activeNode.layer]} Tier
                  </span>
                  
                  {/* Schematic representation display */}
                  <div className="w-full flex items-center justify-center min-h-[160px] mb-6">
                    {renderLayerSchematic(activeNode.layer)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white text-center">{activeNode.title}</h3>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
