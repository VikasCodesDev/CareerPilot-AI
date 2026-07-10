import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { interviewSessionQuerySchema } from "@/features/interview/schemas";
import { InterviewSessionService } from "@/features/interview/services";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const authSession = await getServerSession(authOptions);
  if (!authSession?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = interviewSessionQuerySchema.safeParse(params);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "sessionId is required.", 400);
  }

  const session = await InterviewSessionService.getSession(
    parsed.data.sessionId,
    authSession.user.id
  );
  if (!session) return apiError("Interview session not found.", 404);

  return apiSuccess(
    {
      feedback: session.feedback,
      strengths: session.strengths,
      weaknesses: session.weaknesses,
      suggestions: session.suggestions,
      score: session.score,
    },
    "Interview feedback retrieved successfully."
  );
});
