import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth/config/auth.config";
import { atsAnalysisIdQuerySchema } from "@/features/ats/schemas";
import { ATSHistoryService, ATSReportService } from "@/features/ats/services";
import { ERROR_MESSAGES } from "@/constants";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = atsAnalysisIdQuerySchema.safeParse(params);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "analysisId is required.", 400);
  }

  const analysis = await ATSHistoryService.getAnalysis(parsed.data.analysisId, session.user.id);
  if (!analysis) return apiError("ATS report not found.", 404);

  const report = ATSReportService.buildReport(analysis);
  return apiSuccess({ report }, "ATS report generated successfully.");
});
