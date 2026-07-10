import { uploadRequestSchema, updateRequestSchema, fileValidatorSchema } from "@/lib/validation/resume";
import { validateFile } from "@/utils/file";

export class ResumeValidationService {
  /**
   * Validate upload initiation request payload
   */
  static validateUploadRequest(data: unknown) {
    return uploadRequestSchema.safeParse(data);
  }

  /**
   * Validate update request payload
   */
  static validateUpdateRequest(data: unknown) {
    return updateRequestSchema.safeParse(data);
  }

  /**
   * Validate raw file properties (name, size, MIME type)
   */
  static validateFileProperties(fileName: string, fileType: string, fileSize: number) {
    // 1. Zod schema validation
    const zodResult = fileValidatorSchema.safeParse({ fileName, fileType, fileSize });
    if (!zodResult.success) {
      return {
        isValid: false,
        error: zodResult.error.issues[0]?.message || "Invalid file properties.",
      };
    }

    // 2. Custom utility validation (extensions, size limit)
    return validateFile(fileName, fileType, fileSize);
  }
}
