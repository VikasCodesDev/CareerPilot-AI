"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuroraBackgroundProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("aurora-bg relative overflow-hidden", className)}>
      {!prefersReducedMotion ? (
        <>
          {/* Primary violet orb — top left */}
          <motion.div
            className="pointer-events-none absolute -top-1/3 -left-1/4 size-[700px] rounded-full bg-primary/15 blur-[140px]"
            animate={{
              x: [0, 50, 0],
              y: [0, 40, 0],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
          {/* Magenta orb — right */}
          <motion.div
            className="pointer-events-none absolute -right-1/3 -top-1/4 size-[600px] rounded-full bg-accent/10 blur-[120px]"
            animate={{
              x: [0, -40, 0],
              y: [0, 50, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            aria-hidden="true"
          />
          {/* Deep plum orb — center bottom */}
          <motion.div
            className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 size-[500px] rounded-full bg-secondary/10 blur-[100px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            aria-hidden="true"
          />
          {/* Accent micro-orb — top center */}
          <motion.div
            className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 size-[300px] rounded-full bg-primary/8 blur-[80px]"
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            aria-hidden="true"
          />
        </>
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
