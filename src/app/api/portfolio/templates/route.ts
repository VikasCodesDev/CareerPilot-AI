import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { PortfolioTemplateService } from "@/features/portfolio/services";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  return apiSuccess(
    { templates: PortfolioTemplateService.listTemplates() },
    "Portfolio templates retrieved successfully."
  );
});
