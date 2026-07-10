import { apiSuccess, apiError, withErrorHandler } from "@/lib/utils/api";
import { AnalyticsService } from "@/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/config/auth.config";
import { ERROR_MESSAGES } from "@/constants";

export const GET = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const analytics = await AnalyticsService.getAnalyticsByUser(session.user.id);
  return apiSuccess({ analytics }, "Analytics retrieved successfully");
});
