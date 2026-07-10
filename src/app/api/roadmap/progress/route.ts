import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { roadmapFeatureRepository } from "@/features/roadmap/repository";
import { roadmapProgressSchema } from "@/features/roadmap/schemas";
import { RoadmapProgressService } from "@/features/roadmap/services";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const roadmapId = new URL(req.url).searchParams.get("roadmapId");

  await connectToDatabase();
  const roadmap = roadmapId
    ? await roadmapFeatureRepository.getRoadmap(roadmapId, session.user.id)
    : await roadmapFeatureRepository.getLatestRoadmap(session.user.id);

  if (!roadmap) return apiError("Roadmap not found.", 404);
  return apiSuccess({ progress: roadmap.progress, roadmap }, "Roadmap progress retrieved.");
});

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = roadmapProgressSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid progress update.", 400);
  }

  await connectToDatabase();
  const roadmap = await roadmapFeatureRepository.getRoadmap(
    parsed.data.roadmapId,
    session.user.id
  );
  if (!roadmap) return apiError("Roadmap not found.", 404);

  const updatedRoadmap = RoadmapProgressService.applyProgressUpdate(roadmap, {
    taskId: parsed.data.taskId,
    milestoneId: parsed.data.milestoneId,
    status: parsed.data.status,
  });
  const saved = await roadmapFeatureRepository.updateRoadmap(
    parsed.data.roadmapId,
    session.user.id,
    {
      tasks: updatedRoadmap.tasks,
      milestones: updatedRoadmap.milestones,
      progress: updatedRoadmap.progress,
      completion: updatedRoadmap.completion,
      currentPhase: updatedRoadmap.currentPhase,
      status: updatedRoadmap.status,
    }
  );

  return apiSuccess({ roadmap: saved }, "Roadmap progress updated successfully.");
});
