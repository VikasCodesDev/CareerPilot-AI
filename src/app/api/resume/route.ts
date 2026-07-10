import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { POST as uploadResume } from "@/app/api/resume/upload/route";
import { ERROR_MESSAGES } from "@/constants";
import { authOptions } from "@/features/auth/config/auth.config";
import { apiError, apiSuccess, parsePagination, withErrorHandler } from "@/lib/utils/api";
import { ResumeService } from "@/services";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);

  const { page, limit } = parsePagination(req.url);
  const resumes = await ResumeService.getResumesByUser(session.user.id);
  const start = (page - 1) * limit;
  const paginated = resumes.slice(start, start + limit);

  return apiSuccess(
    { resumes: paginated, total: resumes.length, page, limit },
    "Resumes retrieved successfully."
  );
});

export const POST = uploadResume;
