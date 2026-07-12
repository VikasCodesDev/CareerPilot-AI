"use client";

import { ArrowRight, Play, LayoutDashboard, Brain, Compass, Users, Code, Bot, CheckCircle2, Terminal } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
  
  // Spotlight effect coordinates
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Agent live simulation logs
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    "System standby... Initializing career graph",
  ]);

  useEffect(() => {
    const phrases = [
      "Agent Alpha: Analyzing resume compliance...",
      "Agent Alpha: Added 14 ATS keywords for Staff Designer role",
      "Agent Beta: Calibrating mock interview questions...",
      "Agent Beta: Completed technical communication report",
      "System: ATS Score upgraded to 94%",
      "Agent Gamma: Recalibrating multi-year career path matrix",
      "System: Recommended 3 digital certificates from IBM SkillsBuild",
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      setSimulatedLogs((prev) => {
        const next = [...prev, phrases[currentIndex]];
        if (next.length > 5) next.shift();
        return next;
      });
      currentIndex = (currentIndex + 1) % phrases.length;
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuroraBackground className="relative min-h-[92vh] overflow-hidden noise-bg">
      <FloatingParticles />

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="container-page relative z-10 flex min-h-[92vh] flex-col items-center justify-center pt-28 pb-20 text-center"
      >
        {/* Cinematic Mouse Spotlight */}
        {isHovered && !prefersReducedMotion && (
          <div
            className="pointer-events-none absolute rounded-full bg-gradient-to-r from-primary/10 to-accent/5 blur-[120px] transition-opacity duration-300"
            style={{
              width: "600px",
              height: "600px",
              left: `${mousePosition.x - 300}px`,
              top: `${mousePosition.y - 300}px`,
            }}
          />
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...defaultTransition, delay: 0.1 }}
        >
          <AiBadge label={HERO_CONTENT.badge} className="mb-8 scale-105 shadow-glow" />
        </motion.div>

        <motion.h1
          className="max-w-5xl text-display text-balance font-extrabold tracking-tight text-white text-glow"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...defaultTransition, delay: 0.2 }}
        >
          {headingParts[0]}
          <span className="relative">
            <span className="absolute -inset-x-1 bottom-1 h-3 w-full bg-gradient-to-r from-primary to-accent opacity-20 blur-sm" />
            <GradientText className="relative z-10 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {HERO_CONTENT.headingAccent}
            </GradientText>
          </span>
          {headingParts[1] ?? ""}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground md:text-xl font-medium"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...defaultTransition, delay: 0.35 }}
        >
          {HERO_CONTENT.subheading}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 z-20"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...defaultTransition, delay: 0.5 }}
        >
          <Button
            size="lg"
            className="h-12 gap-2 px-8 text-base bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(217,70,239,0.55)] cursor-pointer"
            render={<Link href={HERO_CONTENT.primaryCta.href} />}
          >
            {HERO_CONTENT.primaryCta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 gap-2 px-8 text-base border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] cursor-pointer"
            render={<Link href={HERO_CONTENT.secondaryCta.href} />}
          >
            <Play className="size-4 fill-white" aria-hidden="true" />
            {HERO_CONTENT.secondaryCta.label}
          </Button>
        </motion.div>

        {/* Premium Dashboard Workspace Preview inside Landing */}
        <motion.div
          className="relative mt-20 w-full max-w-5xl rounded-2xl border border-white/[0.08] bg-zinc-950/40 p-1.5 shadow-2xl backdrop-blur-2xl shadow-black/80"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 opacity-30 blur-lg" />
          
          {/* Mockup Frame Header */}
          <div className="relative rounded-[14px] bg-zinc-900/60 overflow-hidden border border-white/[0.05]">
            <div className="flex h-12 items-center justify-between border-b border-white/[0.05] px-4 bg-zinc-950/40">
              <div className="flex items-center gap-1.5">
                <div className="size-3 rounded-full bg-red-500/80" />
                <div className="size-3 rounded-full bg-yellow-500/80" />
                <div className="size-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex h-6 w-80 items-center justify-center rounded-lg bg-zinc-900/80 border border-white/[0.05] text-[10px] text-zinc-500">
                app.careerpilot.ai/dashboard
              </div>
              <div className="w-12" />
            </div>

            {/* Mockup Workspace Body */}
            <div className="grid grid-cols-12 min-h-[480px]">
              {/* Sidebar Menu Mock */}
              <div className="col-span-3 border-r border-white/[0.05] p-3 text-left space-y-4 bg-zinc-950/20">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <div className="size-6 rounded-lg bg-gradient-to-r from-primary to-accent" />
                  <span className="text-xs font-bold text-white">CareerPilot AI</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 rounded-lg bg-white/[0.06] px-3 py-2 text-xs text-white">
                    <LayoutDashboard className="size-3.5 text-primary" />
                    <span>Overview</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300">
                    <Brain className="size-3.5" />
                    <span>Resume Scoring</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300">
                    <Compass className="size-3.5" />
                    <span>Career Roadmap</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300">
                    <Users className="size-3.5" />
                    <span>Interview Coach</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-500 hover:text-zinc-300">
                    <Code className="size-3.5" />
                    <span>Skill Gaps</span>
                  </div>
                </div>
              </div>

              {/* Overview Workspace Mock */}
              <div className="col-span-9 p-6 text-left space-y-6 bg-zinc-950/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Workspace Overview</h3>
                    <p className="text-[10px] text-zinc-500">Autonomous agents active and scanning</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-2.5 py-1 text-[10px] text-green-400 font-medium animate-pulse">
                    <span className="size-1.5 rounded-full bg-green-400" />
                    System Active
                  </div>
                </div>

                {/* Score Widget & Metric Rows */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl border border-white/[0.05] bg-zinc-900/80 p-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">ATS Compliance Score</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">94%</span>
                      <span className="text-[10px] text-green-400 font-semibold">+8% increase</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/[0.05] bg-zinc-900/80 p-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">Roadmap Milestones</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">4 / 6</span>
                      <span className="text-[10px] text-zinc-500">Quarter targets</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/[0.05] bg-zinc-900/80 p-4 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">Skills gap index</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-white">88%</span>
                      <span className="text-[10px] text-zinc-400">Match accuracy</span>
                    </div>
                  </div>
                </div>

                {/* Agent Simulation Logger Console */}
                <div className="rounded-xl border border-white/[0.05] bg-zinc-950 p-4">
                  <div className="flex items-center gap-2 border-b border-white/[0.05] pb-2 mb-3">
                    <Terminal className="size-3.5 text-primary" />
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Agent Orchestration Console</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    {simulatedLogs.map((log, idx) => (
                      <div key={idx} className="flex gap-2 text-zinc-400">
                        <span className="text-primary select-none">&gt;</span>
                        <span className={log.includes("System:") ? "text-accent font-semibold" : ""}>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Build Alignment Widget */}
                <div className="rounded-xl border border-white/[0.05] bg-zinc-900/80 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">IBM SkillsBuild Partnership</p>
                      <p className="text-[10px] text-zinc-500">Digital Credentials mapped to 6 job roles</p>
                    </div>
                  </div>
                  <div className="text-[10px] text-zinc-400 font-semibold border border-white/[0.1] rounded-lg px-2.5 py-1.5 bg-zinc-950/20">
                    Verify Badges
                  </div>
                </div>
              </div>
            </div>
          </div>
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
