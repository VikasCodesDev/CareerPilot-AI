import { z } from "zod";
import { MAX_FILE_SIZE, SUPPORTED_FILE_TYPES } from "@/constants/resume";

const fileTypeError = "Invalid file type. Only PDF and Word documents are supported.";

// z.enum() in Zod v4 needs a mutable tuple — spread `as const` array into a cast
const fileTypeEnum = z.enum(
  SUPPORTED_FILE_TYPES as unknown as [string, ...string[]],
  { message: fileTypeError }
);

export const fileValidatorSchema = z.object({
  fileName: z.string().min(1, "File name cannot be empty"),
  fileType: fileTypeEnum,
  fileSize: z
    .number()
    .positive("File size must be positive")
    .max(MAX_FILE_SIZE, "File size exceeds the limit of 5MB."),
});

export const uploadRequestSchema = z.object({
  originalName: z.string().min(1, "Original name cannot be empty"),
  fileType: fileTypeEnum,
  fileSize: z
    .number()
    .positive("File size must be positive")
    .max(MAX_FILE_SIZE, "File size exceeds the limit of 5MB."),
  fileContentBase64: z.string().min(1, "File content must be provided as a base64 string."),
  parentResumeId: z.string().optional().or(z.literal("")),
});

export const updateRequestSchema = z.object({
  fileName: z.string().min(1, "File name cannot be empty").optional(),
  status: z.enum(["active", "archived"] as [string, ...string[]]).optional(),
  processingStatus: z
    .enum(["pending", "processing", "completed", "failed"] as [string, ...string[]])
    .optional(),
});
