"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SECTION_CONTENT, TESTIMONIALS } from "@/features/landing/config/landing-content";
import { StaggerItem, StaggerReveal } from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";
import { hoverLift } from "@/features/landing/lib/motion";

const AUTHOR_GRADIENT = [
  "from-primary to-secondary",
  "from-secondary to-accent",
  "from-accent to-primary",
];

export function TestimonialsSection() {
  return (
    <SectionShell id="testimonials">
      <SectionHeader
        id="testimonials"
        eyebrow={SECTION_CONTENT.testimonials.eyebrow}
        title={SECTION_CONTENT.testimonials.title}
        description={SECTION_CONTENT.testimonials.description}
      />
      <StaggerReveal className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {TESTIMONIALS.map((testimonial, idx) => (
          <StaggerItem key={testimonial.id}>
            <motion.blockquote
              className="glass-premium group flex h-full flex-col rounded-2xl border border-white/[0.06] bg-zinc-950/20 p-8 shadow-xl"
              initial="rest"
              whileHover="hover"
              variants={hoverLift}
              transition={{ duration: 0.28 }}
            >
              {/* Star rating */}
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-primary text-primary"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Gradient quote icon */}
              <Quote
                className="mb-4 size-8 opacity-40"
                style={{ color: idx === 0 ? "#8b5cf6" : idx === 1 ? "#a855f7" : "#d946ef" }}
                aria-hidden="true"
              />

              <p className="flex-1 text-sm text-pretty text-zinc-300 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <footer className="mt-6 flex items-center gap-3 border-t border-white/[0.05] pt-5">
                {/* Avatar initial */}
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-md ${AUTHOR_GRADIENT[idx % AUTHOR_GRADIENT.length]}`}
                >
                  {testimonial.author.charAt(0)}
                </div>
                <cite className="not-italic">
                  <span className="block text-sm font-bold text-white">
                    {testimonial.author}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    {testimonial.role} &middot; <span className="text-primary/80">{testimonial.company}</span>
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </SectionShell>
  );
}
