import { getServerSession } from "next-auth";

import { ATSHistoryService } from "@/features/ats/services";
import {
  AnalyticsSection,
  type AnalyticsSectionData,
} from "@/features/dashboard/components/sections";
import { authOptions } from "@/features/auth/config/auth.config";
import { InterviewHistoryService } from "@/features/interview/services";
import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { roadmapFeatureRepository } from "@/features/roadmap/repository";
import { connectToDatabase } from "@/lib/db";
import { AgentMemoryService, AnalyticsService, ResumeService } from "@/services";

const moduleColors = {
  Resume: "#8b5cf6",
  Interview: "#a855f7",
  Roadmap: "#d946ef",
  Portfolio: "#ec4899",
  AI: "#10b981",
} as const;

function statusForCount(count: number): "Growing" | "Stable" | "Idle" {
  if (count >= 3) return "Growing";
  if (count > 0) return "Stable";
  return "Idle";
}

function buildHealth(score: number, tracked: number) {
  if (tracked === 0) return "No data";
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 50) return "C";
  return "Needs work";
}

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <AnalyticsSection />;
  }

  await connectToDatabase();
  const [analytics, resumes, atsHistory, interviews, roadmap, portfolio, memories] =
    await Promise.all([
      AnalyticsService.getAnalyticsByUser(session.user.id),
      ResumeService.getResumesByUser(session.user.id),
      ATSHistoryService.listHistory(session.user.id, { page: 1, limit: 100 }),
      InterviewHistoryService.listHistory(session.user.id, { page: 1, limit: 100 }),
      roadmapFeatureRepository.getLatestRoadmap(session.user.id),
      portfolioFeatureRepository.findByUser(session.user.id),
      AgentMemoryService.getAllMemoryByUser(session.user.id),
    ]);

  const moduleData = [
    { label: "Resume", value: resumes.length + atsHistory.total },
    { label: "Interview", value: interviews.total },
    { label: "Roadmap", value: roadmap ? roadmap.progress.completedTasks : 0 },
    { label: "Portfolio", value: portfolio ? portfolio.projects.length + portfolio.skills.length : 0 },
    { label: "AI", value: memories.length },
  ];
  const outcomesTracked =
    moduleData.reduce((sum, item) => sum + item.value, 0) +
    (analytics?.xpPoints ?? 0);
  const careerVelocity = analytics?.careerScore ?? 0;

  const data: AnalyticsSectionData = {
    metrics: {
      careerVelocity,
      agentSessions: memories.length,
      outcomesTracked,
      workspaceHealth: buildHealth(careerVelocity, outcomesTracked),
    },
    growthData:
      analytics?.weeklyHoursStudied?.map((item) => ({
        label: item.day,
        value: item.hours,
      })) ?? [],
    moduleData,
    distribution: moduleData.map((item) => ({
      label: item.label,
      value: item.value,
      color: moduleColors[item.label as keyof typeof moduleColors],
    })),
    activityRows: moduleData.map((item) => ({
      module: item.label,
      events: item.value,
      change: item.value > 0 ? `${item.value} saved` : "No records",
      status: statusForCount(item.value),
    })),
    signals: [
      {
        kind: "portfolio",
        title: portfolio?.published ? "Portfolio is published" : "Portfolio not published",
        detail: portfolio
          ? `${portfolio.projects.length} projects and ${portfolio.skills.length} skills are saved.`
          : "Create a portfolio to start tracking publish readiness.",
      },
      {
        kind: "interview",
        title: `${interviews.total} interview sessions`,
        detail:
          interviews.total > 0
            ? "Interview progress is being tracked from saved practice sessions."
            : "Start interview practice to record readiness signals.",
      },
      {
        kind: "target",
        title: roadmap ? `${roadmap.completion}% roadmap completion` : "No active roadmap",
        detail: roadmap
          ? `${roadmap.progress.completedTasks}/${roadmap.progress.totalTasks} roadmap tasks are complete.`
          : "Generate a roadmap to connect analytics with career milestones.",
      },
    ],
  };

  return <AnalyticsSection data={data} />;
}
