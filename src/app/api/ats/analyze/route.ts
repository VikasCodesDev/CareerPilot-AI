import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/features/auth/config/auth.config";
import { atsAnalyzeRequestSchema } from "@/features/ats/schemas";
import { ATSAnalysisService, ATSHistoryService } from "@/features/ats/services";
import { atsConfig } from "@/features/ats/config";
import { ERROR_MESSAGES } from "@/constants";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";
import { ResumeStorageService } from "@/services";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = atsAnalyzeRequestSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid ATS analysis request.", 400);
  }

  const body = parsed.data;
  let resumeText = body.resumeText ?? "";

  if (body.resumeId) {
    const resume = await ResumeStorageService.getResume(body.resumeId, session.user.id);
    if (!resume) return apiError("Resume not found.", 404);
    resumeText = resume.rawText ?? resumeText;
  }

  if (!resumeText.trim()) {
    return apiError("Resume text is required for deterministic ATS analysis.", 400);
  }

  const analysis = ATSAnalysisService.analyze({
    resumeId: body.resumeId,
    userId: session.user.id,
    resumeText,
    requiredSkills: body.requiredSkills ?? [...atsConfig.defaultRequiredSkills],
    targetRole: body.targetRole,
  });

  const result = body.save === false ? analysis : await ATSHistoryService.saveAnalysis(analysis);

  return apiSuccess({ analysis: result }, "ATS analysis completed successfully.", 201);
});
