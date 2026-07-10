import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { portfolioCreateSchema } from "@/features/portfolio/schemas";
import { PortfolioBuilderService, PortfolioImportService } from "@/features/portfolio/services";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = portfolioCreateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid portfolio import request.", 400);
  }

  const imported = await PortfolioImportService.fromCareerProfile(session.user.id, parsed.data);
  const portfolioDraft = PortfolioBuilderService.build(imported);

  await connectToDatabase();
  const portfolio = await portfolioFeatureRepository.createPortfolio(portfolioDraft);

  return apiSuccess({ portfolio }, "Portfolio imported successfully.", 201);
});
