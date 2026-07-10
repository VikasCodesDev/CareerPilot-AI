import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { portfolioIdSchema } from "@/features/portfolio/schemas";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = portfolioIdSchema.partial().safeParse(params);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid portfolio analytics query.", 400);
  }

  await connectToDatabase();
  const portfolio = parsed.data.portfolioId
    ? await portfolioFeatureRepository.findById(parsed.data.portfolioId, session.user.id)
    : await portfolioFeatureRepository.findByUser(session.user.id);
  if (!portfolio) return apiError("Portfolio not found.", 404);

  return apiSuccess({ analytics: portfolio.analytics }, "Portfolio analytics retrieved successfully.");
});
