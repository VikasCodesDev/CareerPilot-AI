import { OverviewSection } from "@/features/dashboard/components/sections/overview-section";
import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth/config/auth.config";
import { ATSHistoryService } from "@/features/ats/services";
import { AnalyticsService, AgentMemoryService } from "@/services";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <OverviewSection />;
  }

  const [analytics, latestAnalysis, memories] = await Promise.all([
    AnalyticsService.getAnalyticsByUser(session.user.id),
    ATSHistoryService.getLatest(session.user.id),
    AgentMemoryService.getAllMemoryByUser(session.user.id),
  ]);

  return (
    <OverviewSection
      analytics={analytics}
      atsScore={latestAnalysis?.score ?? null}
      memoryCount={memories.length}
    />
  );
}
