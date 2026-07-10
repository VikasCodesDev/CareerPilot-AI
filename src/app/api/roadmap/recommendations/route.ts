import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { roadmapFeatureRepository } from "@/features/roadmap/repository";
import { roadmapRecommendationSchema } from "@/features/roadmap/schemas";
import { RoadmapRecommendationService } from "@/features/roadmap/services";
import type { SupportedRoadmapRole } from "@/features/roadmap/types";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

function getRecommendationsForInput(data: {
  targetRole: SupportedRoadmapRole;
  currentSkills?: string[];
}) {
  return RoadmapRecommendationService.recommendForRole(data.targetRole, data.currentSkills ?? []);
}

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = roadmapRecommendationSchema.safeParse({
    ...params,
    currentSkills: params.currentSkills ? params.currentSkills.split(",") : undefined,
  });
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid recommendations request.", 400);
  }

  if (parsed.data.roadmapId) {
    await connectToDatabase();
    const roadmap = await roadmapFeatureRepository.getRoadmap(
      parsed.data.roadmapId,
      session.user.id
    );
    if (!roadmap) return apiError("Roadmap not found.", 404);

    return apiSuccess(
      { recommendations: RoadmapRecommendationService.recommendFromRoadmap(roadmap) },
      "Roadmap recommendations retrieved successfully."
    );
  }

  if (!parsed.data.targetRole) {
    return apiError("targetRole is required when roadmapId is not provided.", 400);
  }

  const targetRole = parsed.data.targetRole;
  return apiSuccess(
    {
      recommendations: getRecommendationsForInput({
        targetRole,
        currentSkills: parsed.data.currentSkills,
      }),
    },
    "Role recommendations retrieved successfully."
  );
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = roadmapRecommendationSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid recommendations request.", 400);
  }

  if (parsed.data.roadmapId) {
    await connectToDatabase();
    const roadmap = await roadmapFeatureRepository.getRoadmap(
      parsed.data.roadmapId,
      session.user.id
    );
    if (!roadmap) return apiError("Roadmap not found.", 404);

    return apiSuccess(
      { recommendations: RoadmapRecommendationService.recommendFromRoadmap(roadmap) },
      "Roadmap recommendations retrieved successfully."
    );
  }

  if (!parsed.data.targetRole) {
    return apiError("targetRole is required when roadmapId is not provided.", 400);
  }

  const targetRole = parsed.data.targetRole;
  return apiSuccess(
    {
      recommendations: getRecommendationsForInput({
        targetRole,
        currentSkills: parsed.data.currentSkills,
      }),
    },
    "Role recommendations retrieved successfully."
  );
});
