"use client";

import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResumeCard } from "./ResumeCard";
import type { ResumeStatus, ResumeProcessingStatus } from "@/types/resume";

interface ResumeListItem {
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

interface ResumeListProps {
  resumes: ResumeListItem[];
  onDelete?: (id: string) => void;
  className?: string;
}

export function ResumeList({ resumes, onDelete, className }: ResumeListProps) {
  if (resumes.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center"
        role="status"
      >
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted/60">
          <FileText className="size-7 text-muted-foreground" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold">No resumes yet</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Upload your first resume to get started. Supported formats: PDF, DOC, DOCX.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
        className
      )}
      aria-label="Resume list"
    >
      {resumes.map((resume) => (
        <ResumeCard key={resume._id} resume={resume} onDelete={onDelete} />
      ))}
    </div>
  );
}
