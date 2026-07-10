import { NextRequest } from "next/server";

import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { portfolioPublicQuerySchema } from "@/features/portfolio/schemas";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = portfolioPublicQuerySchema.safeParse(params);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "slug is required.", 400);
  }

  await connectToDatabase();
  const portfolio = await portfolioFeatureRepository.findPublicPortfolio(parsed.data.slug);
  if (!portfolio) return apiError("Public portfolio not found.", 404);

  return apiSuccess({ portfolio }, "Public portfolio retrieved successfully.");
});
