import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { roadmapFeatureRepository } from "@/features/roadmap/repository";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  await connectToDatabase();
  const roadmaps = await roadmapFeatureRepository.listRoadmaps(session.user.id);

  return apiSuccess({ roadmaps }, "Roadmaps retrieved successfully.");
});
