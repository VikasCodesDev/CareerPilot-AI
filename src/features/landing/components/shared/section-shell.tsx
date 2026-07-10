import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = Readonly<{
  id: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  variant?: "default" | "muted" | "aurora";
}>;

export function SectionShell({
  id,
  children,
  className,
  containerClassName,
  variant = "default",
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "py-16 md:py-24",
        variant === "muted" && "bg-surface/50",
        variant === "aurora" && "aurora-bg",
        className
      )}
    >
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </section>
  );
}
