import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { interviewAnswerSchema } from "@/features/interview/schemas";
import { InterviewSessionService } from "@/features/interview/services";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = interviewAnswerSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid interview answer.", 400);
  }

  const updatedSession = await InterviewSessionService.submitAnswer(session.user.id, parsed.data);
  if (!updatedSession) return apiError("Interview session or question not found.", 404);

  return apiSuccess({ session: updatedSession }, "Interview answer evaluated successfully.");
});
