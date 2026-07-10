import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { portfolioThemeSchema } from "@/features/portfolio/schemas";
import { PortfolioThemeService } from "@/features/portfolio/services";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = portfolioThemeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid portfolio theme request.", 400);
  }

  const portfolio = await PortfolioThemeService.saveTheme(
    parsed.data.portfolioId,
    session.user.id,
    parsed.data.theme
  );
  if (!portfolio) return apiError("Portfolio not found.", 404);

  return apiSuccess({ portfolio }, "Portfolio theme saved successfully.");
});
