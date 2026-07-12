"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ_ITEMS, SECTION_CONTENT } from "@/features/landing/config/landing-content";
import { Reveal } from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <SectionShell id="faq" variant="muted">
      <SectionHeader
        id="faq"
        eyebrow={SECTION_CONTENT.faq.eyebrow}
        title={SECTION_CONTENT.faq.title}
        description={SECTION_CONTENT.faq.description}
      />
      <Reveal>
        <div className="mx-auto max-w-2xl space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={false}
                className={cn(
                  "rounded-2xl border transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "border-primary/30 bg-zinc-900/60 shadow-[0_0_25px_rgba(139,92,246,0.08)]"
                    : "border-white/[0.06] bg-zinc-950/30 hover:border-white/[0.1] hover:bg-zinc-950/50"
                )}
              >
                <button
                  type="button"
                  id={`faq-trigger-${item.id}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggle(item.id)}
                >
                  <div className="flex items-center gap-3">
                    {/* Question index chip */}
                    <span className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold transition-colors",
                      isOpen ? "bg-primary/15 text-primary" : "bg-white/[0.04] text-zinc-500"
                    )}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className={cn(
                      "font-semibold text-sm transition-colors",
                      isOpen ? "text-white" : "text-zinc-300"
                    )}>
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180 text-primary"
                    )}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 border-t border-white/[0.04]">
                        <p className="text-sm text-pretty text-zinc-400 leading-relaxed pl-9">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </SectionShell>
  );
}
