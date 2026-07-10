"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, FileText, Loader2, RefreshCw, Archive, Check } from "lucide-react";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/utils/file";
import { toast } from "sonner";
import type { ResumeStatus, ResumeProcessingStatus } from "@/types/resume";

interface HistoryResumeItem {
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

export default function ResumeHistoryPage() {
  const [resumes, setResumes] = useState<HistoryResumeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/resume/list?includeArchived=true");
      if (!res.ok) throw new Error("Failed to load history.");
      const json = await res.json();
      if (json.success) {
        setResumes(json.data.resumes || []);
      } else {
        throw new Error(json.error || "Failed to load history.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load upload history.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleRestore = async (id: string) => {
    try {
      const res = await fetch(`/api/resume/update?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "active" }),
      });
      if (!res.ok) throw new Error("Failed to restore resume.");
      const json = await res.json();
      if (json.success) {
        toast.success("Resume restored to active status.");
        loadHistory();
      } else {
        throw new Error(json.error || "Failed to restore resume.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to restore resume.";
      toast.error(msg);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8 animate-fade-in">
      <WorkspaceHeader
        title="Upload History"
        description="A complete historical timeline of your resume uploads and version history, including archived records."
        breadcrumbs={[
          { label: "Resume Center", href: "/dashboard/resume" },
          { label: "History" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={loadHistory} aria-label="Refresh list">
              <RefreshCw className="size-4" />
            </Button>
            <Link
              href="/dashboard/resume"
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to Center
            </Link>
          </div>
        }
      />

      {isLoading ? (
        <div className="flex min-h-[15rem] items-center justify-center rounded-2xl border border-border bg-muted/10">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-xs text-muted-foreground">Loading upload history…</p>
          </div>
        </div>
      ) : resumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted/60">
            <Clock className="size-7 text-muted-foreground" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold">No upload history</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            You haven't uploaded any resumes yet. Uploads will appear in this timeline.
          </p>
        </div>
      ) : (
        <div className="relative border-l border-border pl-6 ml-4 space-y-8">
          {resumes.map((resume) => {
            const date = new Date(resume.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            const isArchived = resume.status === "archived";

            return (
              <div key={resume._id} className="relative">
                {/* Bullet */}
                <div
                  className={`absolute -left-[31px] top-1.5 flex size-4 items-center justify-center rounded-full border bg-background ${
                    isArchived ? "border-muted text-muted-foreground" : "border-primary text-primary"
                  }`}
                >
                  <div className={`size-1.5 rounded-full ${isArchived ? "bg-muted-foreground" : "bg-primary"}`} />
                </div>

                {/* Card Container */}
                <div className="surface-card p-5 space-y-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-foreground">{resume.originalName}</h4>
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          v{resume.version}
                        </span>
                        {isArchived ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">
                            <Archive className="size-3" />
                            Archived
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs text-success">
                            <Check className="size-3" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Uploaded on {date} · Size: {formatFileSize(resume.fileSize)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start">
                      <Link
                        href={`/dashboard/resume/details?id=${resume._id}`}
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        View details
                      </Link>
                      {isArchived && (
                        <Button variant="ghost" size="sm" onClick={() => handleRestore(resume._id)}>
                          Restore
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
