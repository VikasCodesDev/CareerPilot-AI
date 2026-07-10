import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GradientTextProps = Readonly<{
  children: ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
}>;

export function GradientText({
  children,
  className,
  as: Tag = "span",
}: GradientTextProps) {
  return <Tag className={cn("text-gradient", className)}>{children}</Tag>;
}
