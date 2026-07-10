import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import {
  interviewHistoryQuerySchema,
  interviewSessionQuerySchema,
} from "@/features/interview/schemas";
import { InterviewHistoryService } from "@/features/interview/services";
import { apiError, apiSuccess, withErrorHandler } from "@/lib/utils/api";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = interviewHistoryQuerySchema.safeParse(params);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "Invalid interview history query.", 400);
  }

  const history = await InterviewHistoryService.listHistory(session.user.id, parsed.data);

  return apiSuccess({ history }, "Interview history retrieved successfully.");
});

export const DELETE = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const params = Object.fromEntries(new URL(req.url).searchParams.entries());
  const parsed = interviewSessionQuerySchema.safeParse(params);
  if (!parsed.success) {
    return apiError(parsed.error.issues[0]?.message ?? "sessionId is required.", 400);
  }

  const deleted = await InterviewHistoryService.deleteSession(parsed.data.sessionId, session.user.id);
  if (!deleted) return apiError("Interview session not found.", 404);

  return apiSuccess({ deleted }, "Interview session deleted successfully.");
});
