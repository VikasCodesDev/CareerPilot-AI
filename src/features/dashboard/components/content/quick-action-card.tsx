"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { memo } from "react";
import { motion } from "framer-motion";

import type { QuickAction } from "@/types/dashboard";
import { cardHover, dashboardTransition } from "@/features/dashboard/lib/motion";
import { cn } from "@/lib/utils";

const accentStyles = {
  primary: "from-primary/25 via-primary/10 to-transparent text-primary border-primary/20",
  secondary: "from-secondary/25 via-secondary/10 to-transparent text-secondary border-secondary/20",
  accent: "from-accent/25 via-accent/10 to-transparent text-accent border-accent/20",
  success: "from-success/25 via-success/10 to-transparent text-success border-success/20",
} as const;

type QuickActionCardProps = {
  action: QuickAction;
  className?: string;
};

function QuickActionCardComponent({ action, className }: QuickActionCardProps) {
  const Icon = action.icon;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      transition={dashboardTransition}
      className={className}
    >
      <Link
        href={action.href}
        className="workspace-card group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-5 no-underline"
      >
        <div
          className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        />
        <div
          className={cn(
            "relative flex size-11 items-center justify-center rounded-xl border bg-gradient-to-br",
            accentStyles[action.accent]
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="relative">
          <h3 className="text-sm font-semibold text-foreground">{action.title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{action.description}</p>
        </div>
        <span className="relative mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-all group-hover:opacity-100">
          Open
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </span>
      </Link>
    </motion.div>
  );
}

export const QuickActionCard = memo(QuickActionCardComponent);
