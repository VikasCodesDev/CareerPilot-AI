import { promises as fs } from "fs";
import path from "path";
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
   * Uploads a resume file to local storage.
   * Performs validation, generates a unique file name, and returns upload details.
   */
  static async uploadResume(
    originalName: string,
    fileType: string,
    fileSize: number,
    fileContent?: ArrayBuffer | Uint8Array | Buffer
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
    const fileUrl = `/uploads/resumes/${uniqueName}`;

    if (fileContent) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
      await fs.mkdir(uploadDir, { recursive: true });
      const outputPath = path.join(uploadDir, uniqueName);
      const buffer = Buffer.isBuffer(fileContent)
        ? fileContent
        : fileContent instanceof ArrayBuffer
        ? Buffer.from(new Uint8Array(fileContent))
        : Buffer.from(fileContent);
      await fs.writeFile(outputPath, buffer);
    }

    // Simulate small latency for network uploads
    await new Promise((resolve) => setTimeout(resolve, 200));

    return {
      fileName: uniqueName,
      originalName,
      fileUrl,
      fileSize,
      fileType,
    };
  }
}
