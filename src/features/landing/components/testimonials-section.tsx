"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { SECTION_CONTENT, TESTIMONIALS } from "@/features/landing/config/landing-content";
import {
  StaggerItem,
  StaggerReveal,
} from "@/features/landing/components/shared/reveal";
import { SectionHeader } from "@/features/landing/components/shared/section-header";
import { SectionShell } from "@/features/landing/components/shared/section-shell";
import { hoverLift } from "@/features/landing/lib/motion";

export function TestimonialsSection() {
  return (
    <SectionShell id="testimonials">
      <SectionHeader
        id="testimonials"
        eyebrow={SECTION_CONTENT.testimonials.eyebrow}
        title={SECTION_CONTENT.testimonials.title}
        description={SECTION_CONTENT.testimonials.description}
      />
      <StaggerReveal className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <StaggerItem key={testimonial.id}>
            <motion.blockquote
              className="surface-card flex h-full flex-col p-6"
              initial="rest"
              whileHover="hover"
              variants={hoverLift}
              transition={{ duration: 0.25 }}
            >
              <Quote
                className="mb-4 size-8 text-primary/40"
                aria-hidden="true"
              />
              <p className="flex-1 text-pretty text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-border pt-4">
                <cite className="not-italic">
                  <span className="font-semibold">{testimonial.author}</span>
                  <span className="block text-sm text-muted-foreground">
                    {testimonial.role} · {testimonial.company}
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
