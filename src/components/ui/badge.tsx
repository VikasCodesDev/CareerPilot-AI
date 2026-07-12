import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-primary/25 bg-primary/10 text-primary shadow-[0_0_12px_rgba(139,92,246,0.12)]",
        secondary:
          "border-secondary/25 bg-secondary/10 text-secondary",
        accent:
          "border-accent/25 bg-accent/10 text-accent",
        success:
          "border-success/25 bg-success/10 text-success",
        warning:
          "border-warning/25 bg-warning/10 text-warning",
        destructive:
          "border-destructive/25 bg-destructive/10 text-destructive",
        outline:
          "border-white/[0.1] bg-white/[0.03] text-muted-foreground",
        ghost:
          "border-transparent bg-white/[0.05] text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
