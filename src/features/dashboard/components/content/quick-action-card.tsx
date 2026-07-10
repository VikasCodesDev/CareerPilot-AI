"use client";

import Link from "next/link";
import { memo } from "react";
import { motion } from "framer-motion";

import type { QuickAction } from "@/types/dashboard";
import { cardHover, dashboardTransition } from "@/features/dashboard/lib/motion";
import { cn } from "@/lib/utils";

const accentStyles = {
  primary: "from-primary/20 to-primary/5 text-primary",
  secondary: "from-secondary/20 to-secondary/5 text-secondary",
  accent: "from-accent/20 to-accent/5 text-accent",
  success: "from-success/20 to-success/5 text-success",
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
        className="group surface-card flex h-full flex-col gap-4 p-5 no-underline transition-shadow hover:shadow-md"
      >
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br",
            accentStyles[action.accent]
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{action.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{action.description}</p>
        </div>
        <span className="mt-auto text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Open →
        </span>
      </Link>
    </motion.div>
  );
}

export const QuickActionCard = memo(QuickActionCardComponent);
