"use client";

import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type WorkspaceHeroProps = {
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  description: string;
  aside?: ReactNode;
  badges?: string[];
  className?: string;
};

export function WorkspaceHero({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  aside,
  badges = [],
  className,
}: WorkspaceHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn("workspace-hero relative overflow-hidden", className)}
    >
      <div className="workspace-hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="workspace-eyebrow">
            {EyebrowIcon ? (
              <EyebrowIcon className="size-3.5" aria-hidden="true" />
            ) : null}
            {eyebrow}
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
          {badges.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span key={badge} className="workspace-chip">
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </motion.section>
  );
}
