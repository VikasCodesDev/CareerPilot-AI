import { apiSuccess, apiError, withErrorHandler } from "@/lib/utils/api";
import { AgentMemoryService } from "@/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/config/auth.config";
import { ERROR_MESSAGES } from "@/constants";

export const GET = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const memories = await AgentMemoryService.getAllMemoryByUser(session.user.id);
  return apiSuccess({ memories }, "Agent memory retrieved successfully");
});

export const POST = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  return apiSuccess(
    { message: "Agent invocation — AI orchestration to be implemented in Module 07." },
    "Placeholder",
    202
  );
});
