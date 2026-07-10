"use client";

import { memo } from "react";

import { cn } from "@/lib/utils";

type KeywordChipProps = {
  keyword: string;
  variant: "matched" | "missing" | "recommended" | "extra";
};

const variantClasses: Record<KeywordChipProps["variant"], string> = {
  matched: "border-success/30 bg-success/10 text-success",
  missing: "border-destructive/30 bg-destructive/10 text-destructive",
  recommended: "border-warning/30 bg-warning/10 text-warning",
  extra: "border-secondary/30 bg-secondary/10 text-secondary",
};

function KeywordChipComponent({ keyword, variant }: KeywordChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variantClasses[variant]
      )}
    >
      {keyword}
    </span>
  );
}

export const KeywordChip = memo(KeywordChipComponent);
