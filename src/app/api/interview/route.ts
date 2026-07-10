import { apiSuccess, apiError, withErrorHandler } from "@/lib/utils/api";
import { InterviewService } from "@/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/config/auth.config";
import { ERROR_MESSAGES } from "@/constants";

export const GET = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const sessions = await InterviewService.getSessionsByUser(session.user.id);
  return apiSuccess({ sessions }, "Interview sessions retrieved successfully");
});

export const POST = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  return apiSuccess(
    { message: "Interview session — AI conversation engine to be implemented in Module 07." },
    "Placeholder",
    202
  );
});
