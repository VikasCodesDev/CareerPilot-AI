"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, FileText, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SUPPORTED_EXTENSIONS, MAX_FILE_SIZE } from "@/constants/resume";
import { formatFileSize, isValidExtension, isValidMimeType } from "@/utils/file";

export type DragDropZoneStatus = "idle" | "dragging" | "error";

interface DragDropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  className?: string;
}

export function DragDropZone({ onFileSelect, disabled = false, className }: DragDropZoneProps) {
  const [status, setStatus] = useState<DragDropZoneStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: { file: File }[]) => {
      setErrorMessage("");

      if (rejectedFiles.length > 0) {
        setStatus("error");
        setErrorMessage("Invalid file. Please upload a PDF or Word document under 5MB.");
        return;
      }

      const file = acceptedFiles[0];
      if (!file) return;

      if (!isValidExtension(file.name)) {
        setStatus("error");
        setErrorMessage(`Unsupported file extension. Allowed: ${SUPPORTED_EXTENSIONS.join(", ")}`);
        return;
      }

      if (!isValidMimeType(file.type)) {
        setStatus("error");
        setErrorMessage("Invalid file type. Please upload a PDF or Word document.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setStatus("error");
        setErrorMessage(`File size exceeds ${formatFileSize(MAX_FILE_SIZE)} limit.`);
        return;
      }

      setStatus("idle");
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setStatus("dragging"),
    onDragLeave: () => setStatus("idle"),
    disabled,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  const isError = status === "error";
  const isDragging = isDragActive;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        {...getRootProps()}
        id="resume-dropzone"
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-14 text-center transition-all duration-200 focus-ring",
          isDragging && "border-primary bg-primary/10 scale-[1.01]",
          isError && "border-destructive bg-destructive/5",
          !isDragging && !isError && "border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40",
          disabled && "pointer-events-none opacity-50"
        )}
        role="button"
        aria-label="Upload resume file — PDF or Word documents accepted"
      >
        <input {...getInputProps()} aria-hidden="true" />

        <AnimatePresence mode="wait">
          {isError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/15">
                <AlertCircle className="size-7 text-destructive" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-destructive">Upload Failed</p>
              <p className="max-w-xs text-xs text-muted-foreground">{errorMessage}</p>
            </motion.div>
          ) : isDragging ? (
            <motion.div
              key="dragging"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl gradient-primary animate-glow">
                <CloudUpload className="size-7 text-white" aria-hidden="true" />
              </div>
              <p className="text-base font-semibold text-primary">Drop your resume here</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60">
                <FileText className="size-7 text-muted-foreground" aria-hidden="true" />
              </div>
              <div>
                <p className="text-base font-semibold">
                  Drag &amp; drop or{" "}
                  <span className="text-primary underline underline-offset-2">browse file</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Supports {SUPPORTED_EXTENSIONS.join(", ")} · Max {formatFileSize(MAX_FILE_SIZE)}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isError && (
        <button
          onClick={() => setStatus("idle")}
          className="flex items-center gap-1.5 self-end text-xs text-muted-foreground transition-colors hover:text-foreground"
          type="button"
          aria-label="Dismiss error"
        >
          <X className="size-3" />
          Dismiss
        </button>
      )}
    </div>
  );
}
