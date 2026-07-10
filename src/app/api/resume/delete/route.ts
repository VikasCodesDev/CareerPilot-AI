import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/config/auth.config";
import { apiSuccess, apiError, withErrorHandler } from "@/lib/utils/api";
import { ERROR_MESSAGES } from "@/constants";
import { ResumeStorageService } from "@/services";

export const DELETE = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return apiError("Resume ID is required.", 400);

  const success = await ResumeStorageService.deleteResume(id, session.user.id);
  if (!success) return apiError(ERROR_MESSAGES.NOT_FOUND, 404);

  return apiSuccess({ deleted: true, id }, "Resume archived successfully.");
});
