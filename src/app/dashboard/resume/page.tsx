"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FileUp, History, Loader2 } from "lucide-react";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";
import { ResumeList } from "@/features/resume/components/ResumeList";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { ResumeStatus, ResumeProcessingStatus } from "@/types/resume";

interface ResumeItem {
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

export default function ResumeCenterPage() {
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchResumes = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/resume/list");
      if (!res.ok) throw new Error("Failed to load resumes.");
      const json = await res.json();
      if (json.success) {
        setResumes(json.data.resumes || []);
      } else {
        throw new Error(json.error || "Failed to load resumes.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load resumes.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/resume/delete?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to archive resume.");
      const json = await res.json();
      if (json.success) {
        toast.success("Resume archived successfully.");
        fetchResumes();
      } else {
        throw new Error(json.error || "Failed to archive resume.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to archive resume.";
      toast.error(msg);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8 animate-fade-in">
      <WorkspaceHeader
        title="Resume Center"
        description="Manage your professional resumes, track versions, check ATS compatibility, and store files."
        breadcrumbs={[{ label: "Resume Center" }]}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/resume/history"
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              <History className="size-4" aria-hidden="true" />
              Upload History
            </Link>
            <Link
              href="/dashboard/resume/upload"
              className={cn(buttonVariants({ variant: "default" }), "gap-2")}
            >
              <FileUp className="size-4" aria-hidden="true" />
              Upload Resume
            </Link>
          </div>
        }
      />

      {/* Summary Stats */}
      {resumes.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Resume statistics">
          <div className="surface-card p-5">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Total Resumes</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{resumes.length}</p>
          </div>
          <div className="surface-card p-5">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Latest Active Version</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-primary">
              v{resumes.reduce((max, r) => Math.max(max, r.version || 1), 1)}
            </p>
          </div>
          <div className="surface-card p-5">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Storage Status</p>
            <p className="mt-2 text-2xl font-bold tracking-tight text-success">Optimal</p>
          </div>
        </section>
      )}

      {/* Main List */}
      <section aria-label="Active Resumes">
        {isLoading ? (
          <div className="flex min-h-[15rem] items-center justify-center rounded-2xl border border-border bg-muted/10">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-xs text-muted-foreground">Loading resumes…</p>
            </div>
          </div>
        ) : (
          <ResumeList resumes={resumes} onDelete={handleDelete} />
        )}
      </section>
    </div>
  );
}
