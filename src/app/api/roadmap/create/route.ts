import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { roadmapFeatureRepository } from "@/features/roadmap/repository";
import { roadmapCreateSchema } from "@/features/roadmap/schemas";
import { RoadmapGeneratorService } from "@/features/roadmap/services";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = roadmapCreateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid roadmap request.", 400);
  }

  const generated = RoadmapGeneratorService.generate({
    ...parsed.data,
    userId: session.user.id,
  });

  await connectToDatabase();
  const roadmap = await roadmapFeatureRepository.saveRoadmap(generated);

  return apiSuccess({ roadmap }, "Roadmap created successfully.", 201);
});
