import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/config/auth.config";
import { apiSuccess, apiError, withErrorHandler, parsePagination } from "@/lib/utils/api";
import { ERROR_MESSAGES } from "@/constants";
import { ResumeStorageService } from "@/services";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const { searchParams } = new URL(req.url);
  const includeArchived = searchParams.get("includeArchived") === "true";

  const { page, limit } = parsePagination(req.url);
  const resumes = await ResumeStorageService.listUserResumes(session.user.id, includeArchived);
  const start = (page - 1) * limit;
  const paginated = resumes.slice(start, start + limit);

  return apiSuccess(
    { resumes: paginated, total: resumes.length, page, limit },
    "Resumes retrieved successfully."
  );
});
