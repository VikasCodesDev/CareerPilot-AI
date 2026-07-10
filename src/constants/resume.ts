export const SUPPORTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const SUPPORTED_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const UPLOAD_STATUS = {
  IDLE: "idle",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export const RESUME_STATUS = {
  ACTIVE: "active",
  ARCHIVED: "archived",
} as const;

export const PROCESSING_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;
