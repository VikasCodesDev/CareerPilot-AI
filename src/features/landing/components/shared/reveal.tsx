"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { defaultTransition, fadeUp, revealViewport } from "@/features/landing/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </Component>
  );
}

type StaggerRevealProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function StaggerReveal({ children, className }: StaggerRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn(className)} variants={fadeUp} transition={defaultTransition}>
      {children}
    </motion.div>
  );
}
