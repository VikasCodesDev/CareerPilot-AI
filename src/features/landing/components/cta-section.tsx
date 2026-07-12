"use client";

import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden py-32"
    >
      {/* Deep layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-zinc-950 to-background" />
      
      {/* Animated mesh orbs */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute -top-32 left-1/4 size-[500px] rounded-full bg-primary/12 blur-[120px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute -bottom-32 right-1/4 size-[400px] rounded-full bg-accent/10 blur-[100px]"
            animate={{ x: [0, -25, 0], y: [0, 15, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-secondary/8 blur-[140px]"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Noise texture overlay */}
      <div className="noise-bg absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Pre-headline badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            Early Access Now Open
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="cta-heading"
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Your AI career co-pilot{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              is ready
            </span>
          </motion.h2>

          {/* Sub-headline */}
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-zinc-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Join thousands of professionals accelerating their careers with autonomous AI agents. Free to start, no credit card required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="group h-14 gap-2 px-10 text-base font-bold bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-[0_0_40px_rgba(139,92,246,0.35)] hover:shadow-[0_0_55px_rgba(217,70,239,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all rounded-2xl"
              render={<Link href="/login" />}
            >
              <Zap className="size-5 group-hover:animate-pulse" aria-hidden="true" />
              Start Your Free Journey
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 gap-2 px-8 text-base border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.15] rounded-2xl"
              render={<Link href="#features" />}
            >
              Explore Features
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.p
            className="mt-8 text-xs text-zinc-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Trusted by professionals at Vertex Labs, Nexus Systems, Pulse Analytics &amp; more
          </motion.p>
        </div>
      </div>
    </section>
  );
}
