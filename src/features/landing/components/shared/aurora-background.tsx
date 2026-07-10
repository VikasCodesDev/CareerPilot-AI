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
          <motion.div
            className="pointer-events-none absolute -top-1/4 -left-1/4 size-[600px] rounded-full bg-primary/20 blur-[120px]"
            animate={{
              x: [0, 40, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute -right-1/4 -bottom-1/4 size-[500px] rounded-full bg-secondary/15 blur-[100px]"
            animate={{
              x: [0, -30, 0],
              y: [0, -40, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute top-1/2 left-1/2 size-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            aria-hidden="true"
          />
        </>
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
