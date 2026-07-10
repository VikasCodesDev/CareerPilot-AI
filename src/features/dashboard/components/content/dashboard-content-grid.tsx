"use client";

import { type ReactNode, memo } from "react";
import { motion } from "framer-motion";

import { staggerGrid, gridItem, dashboardTransition } from "@/features/dashboard/lib/motion";
import { cn } from "@/lib/utils";

type DashboardContentGridProps = {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3;
};

function DashboardContentGridComponent({
  children,
  className,
  columns = 3,
}: DashboardContentGridProps) {
  const columnClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";

  return (
    <motion.div
      variants={staggerGrid}
      initial="hidden"
      animate="visible"
      className={cn("grid gap-4", columnClass, className)}
    >
      {children}
    </motion.div>
  );
}

type DashboardGridItemProps = {
  children: ReactNode;
  className?: string;
};

function DashboardGridItemComponent({ children, className }: DashboardGridItemProps) {
  return (
    <motion.div variants={gridItem} transition={dashboardTransition} className={className}>
      {children}
    </motion.div>
  );
}

export const DashboardContentGrid = memo(DashboardContentGridComponent);
export const DashboardGridItem = memo(DashboardGridItemComponent);
