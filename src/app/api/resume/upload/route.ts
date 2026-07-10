import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/config/auth.config";
import { apiSuccess, apiError, withErrorHandler } from "@/lib/utils/api";
import { ERROR_MESSAGES } from "@/constants";
import { ResumeUploadService, ResumeStorageService, ResumeVersionService, ResumeValidationService } from "@/services";

export const POST = withErrorHandler(async (req: NextRequest) => {
  // 1. Authenticate user
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return apiError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED, 401);
  }
  const userId = session.user.id;

  let originalName = "";
  let fileType = "";
  let fileSize = 0;
  let parentResumeId = "";

  // 2. Parse request payload (FormData or JSON)
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    parentResumeId = (formData.get("parentResumeId") as string) || "";

    if (!file) {
      return apiError("No file provided in the request.", 400);
    }

    originalName = file.name;
    fileType = file.type;
    fileSize = file.size;
  } else {
    // JSON fallback
    const body = await req.json();
    const validation = ResumeValidationService.validateUploadRequest(body);
    if (!validation.success) {
      return apiError(validation.error.issues[0]?.message || "Invalid request body.", 400);
    }
    originalName = body.originalName;
    fileType = body.fileType;
    fileSize = body.fileSize;
    parentResumeId = body.parentResumeId || "";
  }

  // 3. Simulates the file upload (validates internally)
  try {
    const uploadResult = await ResumeUploadService.uploadResume(
      originalName,
      fileType,
      fileSize
    );

    // 4. Save to Database
    if (parentResumeId) {
      // Append a new version to existing resume record
      const updatedResume = await ResumeVersionService.addVersion(
        parentResumeId,
        userId,
        uploadResult
      );
      return apiSuccess(updatedResume, "New resume version uploaded successfully.", 201);
    } else {
      // Create a brand new resume document
      const newResume = await ResumeStorageService.createResume(userId, uploadResult);
      return apiSuccess(newResume, "Resume uploaded and registered successfully.", 201);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload processing failed.";
    return apiError(message, 400);
  }
});
