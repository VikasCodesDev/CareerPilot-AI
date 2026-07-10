"use client";

import { cn } from "@/lib/utils";
import { formatFileSize } from "@/utils/file";
import type { ResumeStatus, ResumeProcessingStatus } from "@/types/resume";
import { Archive, CheckCircle, Clock, FileDigit, FileType, Hash, User } from "lucide-react";

interface ResumeMetadataCardProps {
  fileName: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  version: number;
  status: ResumeStatus;
  processingStatus: ResumeProcessingStatus;
  ownerId?: string;
  uploadedAt: Date | string;
  updatedAt: Date | string;
  className?: string;
}

const PROCESSING_COLOR: Record<ResumeProcessingStatus, string> = {
  pending: "text-warning",
  processing: "text-primary",
  completed: "text-success",
  failed: "text-destructive",
};

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted/60">
        <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium" title={value}>
          {value}
        </p>
      </div>
    </div>
  );
}

export function ResumeMetadataCard({
  fileName,
  originalName,
  fileSize,
  fileType,
  version,
  status,
  processingStatus,
  ownerId,
  uploadedAt,
  updatedAt,
  className,
}: ResumeMetadataCardProps) {
  const uploadDate = new Date(uploadedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updateDate = new Date(updatedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className={cn("surface-card flex flex-col gap-4 p-5", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Resume Metadata
        </h2>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            processingStatus === "completed"
              ? "bg-success/10 text-success"
              : processingStatus === "failed"
                ? "bg-destructive/10 text-destructive"
                : "bg-primary/10 text-primary"
          )}
        >
          <CheckCircle className={cn("size-3", PROCESSING_COLOR[processingStatus])} aria-hidden="true" />
          {processingStatus.charAt(0).toUpperCase() + processingStatus.slice(1)}
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <MetaRow icon={FileType} label="Original Name" value={originalName || fileName} />
        <MetaRow icon={FileDigit} label="File Size" value={formatFileSize(fileSize)} />
        <MetaRow icon={Hash} label="Version" value={`v${version}`} />
        <MetaRow icon={Archive} label="Status" value={status.charAt(0).toUpperCase() + status.slice(1)} />
        <MetaRow icon={FileType} label="MIME Type" value={fileType || "Unknown"} />
        {ownerId && <MetaRow icon={User} label="Owner ID" value={ownerId} />}
        <MetaRow icon={Clock} label="Uploaded" value={uploadDate} />
        <MetaRow icon={Clock} label="Last Updated" value={updateDate} />
      </div>
    </section>
  );
}
