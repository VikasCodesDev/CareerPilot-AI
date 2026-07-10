import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth/config/auth.config";
import { atsAnalysisIdQuerySchema, atsHistoryQuerySchema } from "@/features/ats/schemas";
import { ATSHistoryService } from "@/features/ats/services";
import { ERROR_MESSAGES } from "@/constants";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = atsHistoryQuerySchema.safeParse(params);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid history query.", 400);
  }

  const history = await ATSHistoryService.listHistory(session.user.id, parsed.data);
  return apiSuccess({ history }, "ATS history retrieved successfully.");
});

export const DELETE = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = atsAnalysisIdQuerySchema.safeParse(params);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "analysisId is required.", 400);
  }

  const deleted = await ATSHistoryService.deleteAnalysis(
    parsed.data.analysisId,
    session.user.id
  );

  if (!deleted) return apiError("ATS analysis not found.", 404);
  return apiSuccess({ deleted }, "ATS analysis deleted successfully.");
});
