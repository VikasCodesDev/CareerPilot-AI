"use client";

import { memo } from "react";

import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  className?: string;
};

function ProgressBarComponent({ value, className }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div
      className={cn("h-2 overflow-hidden rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-[image:var(--gradient-primary)] transition-all duration-500"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}

export const ProgressBar = memo(ProgressBarComponent);
