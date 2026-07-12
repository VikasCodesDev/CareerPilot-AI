"use client";

import { type LucideIcon } from "lucide-react";
import { type ReactNode, memo } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

function EmptyStateComponent({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "workspace-card relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/[0.1] px-6 py-16 text-center",
        className
      )}
      role="status"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.12),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative mb-5 flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
        <Icon className="size-7 text-primary" aria-hidden="true" />
      </div>
      <h3 className="relative text-lg font-semibold tracking-tight">{title}</h3>
      <p className="relative mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      {action ? <div className="relative mt-6">{action}</div> : null}
    </motion.div>
  );
}

export const EmptyState = memo(EmptyStateComponent);

export function EmptyStateAction({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <Button variant="outline" onClick={onClick}>
      {label}
    </Button>
  );
}
