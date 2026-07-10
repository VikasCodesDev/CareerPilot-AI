import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/config/auth.config";
import { apiSuccess, apiError, withErrorHandler } from "@/lib/utils/api";
import { ERROR_MESSAGES } from "@/constants";
import { ResumeStorageService, ResumeValidationService } from "@/services";

export const PATCH = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return apiError("Resume ID is required.", 400);

  const body = await req.json();
  const validation = ResumeValidationService.validateUpdateRequest(body);
  if (!validation.success) {
    return apiError(validation.error.issues[0]?.message || "Invalid request body.", 400);
  }

  const updated = await ResumeStorageService.updateResume(id, session.user.id, body);
  if (!updated) return apiError(ERROR_MESSAGES.NOT_FOUND, 404);

  return apiSuccess({ resume: updated }, "Resume updated successfully.");
});
