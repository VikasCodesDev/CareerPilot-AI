import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth/config/auth.config";
import { atsScoreRequestSchema } from "@/features/ats/schemas";
import { ATSAnalysisService, ATSHistoryService } from "@/features/ats/services";
import { atsConfig } from "@/features/ats/config";
import { ERROR_MESSAGES } from "@/constants";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const resumeId = new URL(req.url).searchParams.get("resumeId") ?? undefined;
  const latest = await ATSHistoryService.getLatest(session.user.id, resumeId);

  return apiSuccess(
    { score: latest?.score ?? null, analysis: latest },
    "Latest ATS score retrieved successfully."
  );
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = atsScoreRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid ATS score request.", 400);
  }

  const analysis = ATSAnalysisService.analyze({
    userId: session.user.id,
    resumeText: parsed.data.resumeText,
    requiredSkills: parsed.data.requiredSkills ?? [...atsConfig.defaultRequiredSkills],
    targetRole: parsed.data.targetRole,
  });

  return apiSuccess({ score: analysis.score, analysis }, "ATS score calculated successfully.");
});
