"use client";

import { motion } from "framer-motion";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type UploadProgressStatus = "idle" | "uploading" | "success" | "error";

interface UploadProgressProps {
  status: UploadProgressStatus;
  progress: number; // 0-100
  fileName?: string;
  errorMessage?: string;
  className?: string;
}

export function UploadProgress({
  status,
  progress,
  fileName,
  errorMessage,
  className,
}: UploadProgressProps) {
  if (status === "idle") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={cn("surface-card overflow-hidden p-5", className)}
      role="status"
      aria-live="polite"
      aria-label="Upload progress"
    >
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div className="mt-0.5 shrink-0">
          {status === "uploading" && (
            <Loader2
              className="size-5 animate-spin text-primary"
              aria-hidden="true"
            />
          )}
          {status === "success" && (
            <CheckCircle className="size-5 text-success" aria-hidden="true" />
          )}
          {status === "error" && (
            <XCircle className="size-5 text-destructive" aria-hidden="true" />
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {status === "uploading" && "Uploading resume…"}
            {status === "success" && "Upload complete!"}
            {status === "error" && "Upload failed"}
          </p>
          {fileName && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{fileName}</p>
          )}
          {errorMessage && status === "error" && (
            <p className="mt-0.5 text-xs text-destructive">{errorMessage}</p>
          )}

          {/* Progress bar */}
          {status === "uploading" && (
            <div className="mt-3">
              <div
                className="h-1.5 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  className="h-full rounded-full gradient-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <p className="mt-1 text-right text-xs tabular-nums text-muted-foreground">
                {progress}%
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
