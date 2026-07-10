import { generateUniqueFilename } from "@/utils/file";
import { ResumeValidationService } from "./resume-validation.service";

export interface UploadResult {
  fileName: string;
  originalName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
}

export class ResumeUploadService {
  /**
   * Simulates uploading a resume file.
   * Performs validation, generates a unique file name, and returns upload details.
   */
  static async uploadResume(
    originalName: string,
    fileType: string,
    fileSize: number
  ): Promise<UploadResult> {
    // 1. Validate file properties
    const validation = ResumeValidationService.validateFileProperties(
      originalName,
      fileType,
      fileSize
    );
    if (!validation.isValid) {
      throw new Error(validation.error || "File validation failed.");
    }

    // 2. Generate a unique name for stored file
    const uniqueName = generateUniqueFilename(originalName);

    // 3. Mock file URL (under local uploads route)
    const fileUrl = `/uploads/resumes/${uniqueName}`;

    // Simulate small latency for network uploads
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      fileName: uniqueName,
      originalName,
      fileUrl,
      fileSize,
      fileType,
    };
  }
}
