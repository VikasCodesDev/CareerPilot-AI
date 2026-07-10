import { MAX_FILE_SIZE, SUPPORTED_EXTENSIONS, SUPPORTED_FILE_TYPES } from "@/constants/resume";

/**
 * Format file size in bytes to a human-readable string (e.g., KB, MB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Check if the file extension is supported
 */
export function isValidExtension(filename: string): boolean {
  const ext = filename.substring(filename.lastIndexOf(".")).toLowerCase();
  return (SUPPORTED_EXTENSIONS as readonly string[]).includes(ext);
}

/**
 * Check if the MIME type is supported
 */
export function isValidMimeType(mime: string): boolean {
  return (SUPPORTED_FILE_TYPES as readonly string[]).includes(mime);
}

/**
 * Validate a file's size, MIME type, and extension
 */
export function validateFile(
  filename: string,
  mimeType: string,
  fileSize: number
): { isValid: boolean; error?: string } {
  if (!isValidExtension(filename)) {
    return {
      isValid: false,
      error: `Unsupported file extension. Only ${SUPPORTED_EXTENSIONS.join(", ")} are supported.`,
    };
  }

  if (!isValidMimeType(mimeType)) {
    return {
      isValid: false,
      error: "Unsupported file type. Only PDF and Word documents are supported.",
    };
  }

  if (fileSize > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size exceeds the limit of ${formatFileSize(MAX_FILE_SIZE)}.`,
    };
  }

  return { isValid: true };
}

/**
 * Generate a unique file name to avoid collisions
 */
export function generateUniqueFilename(originalName: string): string {
  const dotIndex = originalName.lastIndexOf(".");
  const name = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
  const ext = dotIndex !== -1 ? originalName.substring(dotIndex) : "";
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${cleanName}_${timestamp}_${randomSuffix}${ext}`;
}
