import { DashboardGridSkeleton, HeaderSkeleton } from "@/features/dashboard";

export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8">
      <HeaderSkeleton />
      <DashboardGridSkeleton />
    </div>
  );
}
