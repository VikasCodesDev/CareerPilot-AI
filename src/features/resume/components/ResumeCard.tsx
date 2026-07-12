"use client";

import { motion } from "framer-motion";
import { Archive, Clock, Eye, FileText, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/utils/file";
import type { ResumeStatus, ResumeProcessingStatus } from "@/types/resume";

interface ResumeCardItem {
  _id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  version: number;
  status: ResumeStatus;
  processingStatus: ResumeProcessingStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ResumeCardProps {
  resume: ResumeCardItem;
  onDelete?: (id: string) => void;
  className?: string;
}

const STATUS_LABELS: Record<ResumeProcessingStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  completed: "Ready",
  failed: "Failed",
};

const STATUS_COLORS: Record<ResumeProcessingStatus, string> = {
  pending: "text-warning bg-warning/10",
  processing: "text-primary bg-primary/10 animate-soft-pulse",
  completed: "text-success bg-success/10",
  failed: "text-destructive bg-destructive/10",
};

export function ResumeCard({ resume, onDelete, className }: ResumeCardProps) {
  const uploadDate = new Date(resume.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("surface-card group relative flex flex-col gap-4 p-5 transition-shadow hover:shadow-md", className)}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <FileText className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-sm font-semibold leading-tight"
            title={resume.originalName}
          >
            {resume.originalName || resume.fileName}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatFileSize(resume.fileSize)} · v{resume.version}
          </p>
        </div>
        <button
          className="flex size-7 shrink-0 items-center justify-center rounded-lg opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100 focus-visible:opacity-100"
          aria-label="More actions"
          type="button"
        >
          <MoreHorizontal className="size-4 text-muted-foreground" aria-hidden="true" />
        </button>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            STATUS_COLORS[resume.processingStatus]
          )}
        >
          {STATUS_LABELS[resume.processingStatus]}
        </span>
        {resume.status === "archived" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            <Archive className="size-3" aria-hidden="true" />
            Archived
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="size-3.5" aria-hidden="true" />
        <span>Uploaded {uploadDate}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t border-border pt-3">
        <Link
          href={`/dashboard/resume/details?id=${resume._id}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted hover:text-foreground"
          aria-label={`View details for ${resume.originalName}`}
        >
          <Eye className="size-3.5" aria-hidden="true" />
          View
        </Link>
        {onDelete && resume.status !== "archived" && (
          <button
            onClick={() => onDelete(resume._id)}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
            aria-label={`Archive ${resume.originalName}`}
            type="button"
          >
            <Trash2 className="size-3.5" aria-hidden="true" />
            Archive
          </button>
        )}
      </div>
    </motion.div>
  );
}
