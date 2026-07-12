"use client";

import { memo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
};

function WidgetSkeletonComponent({ className }: SkeletonProps) {
  return (
    <div
      className={cn("workspace-card overflow-hidden", className)}
      role="status"
      aria-label="Loading widget"
    >
      <div className="border-b border-white/[0.05] px-5 py-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="mt-2 h-3 w-1/2" />
      </div>
      <div className="space-y-3 p-5">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

function DashboardGridSkeletonComponent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <WidgetSkeleton key={index} />
      ))}
    </div>
  );
}

function SidebarSkeletonComponent() {
  return (
    <div className="space-y-2 px-3" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  );
}

function HeaderSkeletonComponent() {
  return (
    <div className="space-y-3" aria-hidden="true">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-72" />
    </div>
  );
}

export const WidgetSkeleton = memo(WidgetSkeletonComponent);
export const DashboardGridSkeleton = memo(DashboardGridSkeletonComponent);
export const SidebarSkeleton = memo(SidebarSkeletonComponent);
export const HeaderSkeleton = memo(HeaderSkeletonComponent);
