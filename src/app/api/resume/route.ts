import { NextRequest } from "next/server";
import { apiSuccess, apiError, withErrorHandler, parsePagination } from "@/lib/utils/api";
import { ResumeService } from "@/services";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/config/auth.config";
import { ERROR_MESSAGES } from "@/constants";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const { page, limit } = parsePagination(req.url);
  const resumes = await ResumeService.getResumesByUser(session.user.id);
  const start = (page - 1) * limit;
  const paginated = resumes.slice(start, start + limit);

  return apiSuccess(
    { resumes: paginated, total: resumes.length, page, limit },
    "Resumes retrieved successfully"
  );
});

export const POST = withErrorHandler(async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  return apiSuccess(
    { message: "Resume upload endpoint — file processing to be implemented in Module 07." },
    "Placeholder",
    202
  );
});
