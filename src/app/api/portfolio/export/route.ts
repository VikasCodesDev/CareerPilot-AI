import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { portfolioIdSchema } from "@/features/portfolio/schemas";
import { PortfolioExportService } from "@/features/portfolio/services";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = portfolioIdSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "portfolioId is required.", 400);
  }

  await connectToDatabase();
  const portfolio = await portfolioFeatureRepository.findById(parsed.data.portfolioId, session.user.id);
  if (!portfolio) return apiError("Portfolio not found.", 404);

  return apiSuccess(
    {
      json: PortfolioExportService.toJson(portfolio),
      markdown: PortfolioExportService.toMarkdown(portfolio),
    },
    "Portfolio exported successfully."
  );
});
