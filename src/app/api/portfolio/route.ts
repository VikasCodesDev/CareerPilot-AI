import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { portfolioFeatureRepository } from "@/features/portfolio/repository";
import { portfolioCreateSchema } from "@/features/portfolio/schemas";
import { PortfolioBuilderService } from "@/features/portfolio/services";
import { connectToDatabase } from "@/lib/db";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  await connectToDatabase();
  const portfolio = await portfolioFeatureRepository.findByUser(session.user.id);

  return apiSuccess({ portfolio }, "Portfolio retrieved successfully.");
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = portfolioCreateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid portfolio create request.", 400);
  }

  const portfolioDraft = PortfolioBuilderService.build({
    ...parsed.data,
    userId: session.user.id,
  });

  await connectToDatabase();
  const portfolio = await portfolioFeatureRepository.createPortfolio(portfolioDraft);

  return apiSuccess({ portfolio }, "Portfolio created successfully.", 201);
});
