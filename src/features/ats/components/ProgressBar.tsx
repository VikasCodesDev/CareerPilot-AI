"use client";

import { memo } from "react";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  className?: string;
  label?: string;
};

function ProgressBarComponent({ value, className, label }: ProgressBarProps) {
  return <Progress value={value} className={cn(className)} label={label} showValue={Boolean(label)} />;
}

export const ProgressBar = memo(ProgressBarComponent);
