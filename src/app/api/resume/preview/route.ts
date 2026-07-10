import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/config/auth.config";
import { apiSuccess, apiError, withErrorHandler } from "@/lib/utils/api";
import { ERROR_MESSAGES } from "@/constants";
import { ResumePreviewService } from "@/services";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return apiError("Resume ID is required.", 400);

  try {
    const preview = await ResumePreviewService.getPreview(id, session.user.id);
    return apiSuccess({ preview }, "Resume preview generated.");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : ERROR_MESSAGES.NOT_FOUND;
    return apiError(message, 404);
  }
});
