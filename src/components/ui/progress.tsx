"use client";

import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "accent";
};

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
} as const;

const variantClasses = {
  default: "bg-[image:var(--gradient-primary)]",
  success: "bg-gradient-to-r from-success to-emerald-400",
  warning: "bg-gradient-to-r from-warning to-amber-300",
  accent: "bg-gradient-to-r from-accent to-primary",
} as const;

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      label,
      showValue = false,
      size = "md",
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    const safeValue = Math.max(0, Math.min(max, value));
    const percentage = Math.round((safeValue / max) * 100);

    return (
      <div className={cn("w-full", className)} ref={ref} {...props}>
        {(label || showValue) && (
          <div className="mb-2 flex items-center justify-between gap-2">
            {label ? (
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
            ) : (
              <span />
            )}
            {showValue ? (
              <span className="text-xs font-semibold tabular-nums text-foreground">
                {percentage}%
              </span>
            ) : null}
          </div>
        )}
        <div
          className={cn(
            "overflow-hidden rounded-full bg-white/[0.06]",
            sizeClasses[size]
          )}
          role="progressbar"
          aria-valuenow={safeValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700 ease-out",
              variantClasses[variant],
              "shadow-[0_0_12px_rgba(139,92,246,0.35)]"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
