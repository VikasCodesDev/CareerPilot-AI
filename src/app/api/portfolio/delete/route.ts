import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { portfolioIdSchema } from "@/features/portfolio/schemas";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const DELETE = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = portfolioIdSchema.safeParse(params);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "portfolioId is required.", 400);
  }

  await connectToDatabase();
  const deleted = await portfolioFeatureRepository.deletePortfolio(
    parsed.data.portfolioId,
    session.user.id
  );

  if (!deleted) return apiError("Portfolio not found.", 404);
  return apiSuccess({ deleted }, "Portfolio deleted successfully.");
});
