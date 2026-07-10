import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { interviewStartSchema } from "@/features/interview/schemas";
import { InterviewSessionService } from "@/features/interview/services";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const parsed = interviewStartSchema.safeParse(await req.json());
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid interview start request.", 400);
  }

  const interviewSession = await InterviewSessionService.createSession({
    ...parsed.data,
    userId: session.user.id,
  });

  return apiSuccess({ session: interviewSession }, "Interview session started successfully.", 201);
});
