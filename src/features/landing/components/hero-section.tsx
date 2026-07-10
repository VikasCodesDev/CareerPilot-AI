"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "@/features/landing/config/landing-content";
import { AiBadge } from "@/features/landing/components/shared/ai-badge";
import { AuroraBackground } from "@/features/landing/components/shared/aurora-background";
import { FloatingParticles } from "@/features/landing/components/shared/floating-particles";
import { GradientText } from "@/features/landing/components/shared/gradient-text";
import { defaultTransition, fadeUp } from "@/features/landing/lib/motion";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const headingParts = HERO_CONTENT.heading.split(HERO_CONTENT.headingAccent);

  return (
    <AuroraBackground className="relative min-h-[92vh]">
      <FloatingParticles />

      <div className="container-page relative z-10 flex min-h-[92vh] flex-col items-center justify-center py-24 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...defaultTransition, delay: 0.1 }}
        >
          <AiBadge label={HERO_CONTENT.badge} className="mb-8" />
        </motion.div>

        <motion.h1
          className="max-w-5xl text-display text-balance font-bold tracking-tight"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...defaultTransition, delay: 0.2 }}
        >
          {headingParts[0]}
          <GradientText>{HERO_CONTENT.headingAccent}</GradientText>
          {headingParts[1] ?? ""}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground md:text-xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...defaultTransition, delay: 0.35 }}
        >
          {HERO_CONTENT.subheading}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...defaultTransition, delay: 0.5 }}
        >
          <Button
            size="lg"
            className="h-12 gap-2 px-8 text-base animate-glow"
            render={<Link href={HERO_CONTENT.primaryCta.href} />}
          >
            {HERO_CONTENT.primaryCta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 gap-2 px-8 text-base"
            render={<Link href={HERO_CONTENT.secondaryCta.href} />}
          >
            <Play className="size-4" aria-hidden="true" />
            {HERO_CONTENT.secondaryCta.label}
          </Button>
        </motion.div>

        {!prefersReducedMotion ? (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <div className="h-10 w-6 rounded-full border-2 border-muted-foreground/30 p-1">
              <div className="mx-auto h-2 w-1 rounded-full bg-muted-foreground/50" />
            </div>
          </motion.div>
        ) : null}
      </div>
    </AuroraBackground>
  );
}
