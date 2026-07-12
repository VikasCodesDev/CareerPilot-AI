"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type WorkspaceMetricProps = {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  accent?: "primary" | "secondary" | "accent" | "success" | "warning";
  className?: string;
};

const accentGlow = {
  primary: "from-primary/20 via-primary/5 to-transparent text-primary",
  secondary: "from-secondary/20 via-secondary/5 to-transparent text-secondary",
  accent: "from-accent/20 via-accent/5 to-transparent text-accent",
  success: "from-success/20 via-success/5 to-transparent text-success",
  warning: "from-warning/20 via-warning/5 to-transparent text-warning",
} as const;

export function WorkspaceMetric({
  label,
  value,
  icon: Icon,
  delta,
  trend = "neutral",
  accent = "primary",
  className,
}: WorkspaceMetricProps) {
  const TrendIcon = trend === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.28 }}
      className={cn("workspace-metric group", className)}
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-8 -right-8 size-28 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition-opacity group-hover:opacity-100",
          accentGlow[accent]
        )}
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between gap-3">
        {Icon ? (
          <div className={cn("workspace-metric-icon bg-gradient-to-br", accentGlow[accent])}>
            <Icon className="size-4" aria-hidden="true" />
          </div>
        ) : (
          <span />
        )}
        {delta ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold",
              trend === "up" && "bg-success/10 text-success",
              trend === "down" && "bg-destructive/10 text-destructive",
              trend === "neutral" && "bg-white/[0.05] text-muted-foreground"
            )}
          >
            {trend !== "neutral" ? (
              <TrendIcon className="size-3" aria-hidden="true" />
            ) : null}
            {delta}
          </span>
        ) : null}
      </div>
      <p className="relative mt-5 text-3xl font-bold tracking-tight tabular-nums">{value}</p>
      <p className="relative mt-1 text-sm text-muted-foreground">{label}</p>
    </motion.article>
  );
}
