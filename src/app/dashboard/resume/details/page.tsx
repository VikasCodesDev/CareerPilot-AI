"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, RefreshCw, AlertCircle, History, RotateCcw } from "lucide-react";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";
import { ResumeMetadataCard } from "@/features/resume/components/ResumeMetadataCard";
import { ResumePreviewPanel } from "@/features/resume/components/ResumePreviewPanel";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { IResumePreview, IResumeVersion } from "@/types/resume";

interface DetailsResume {
  _id: string;
  fileName: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  version: number;
  status: "active" | "archived";
  processingStatus: "pending" | "processing" | "completed" | "failed";
  ownerId?: string;
  versions: IResumeVersion[];
  createdAt: string;
  updatedAt: string;
}

export default function ResumeDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [resume, setResume] = useState<DetailsResume | null>(null);
  const [preview, setPreview] = useState<IResumePreview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReverting, setIsReverting] = useState<number | null>(null);

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      // Fetch details & preview in parallel
      const [detailsRes, previewRes] = await Promise.all([
        fetch(`/api/resume/details?id=${id}`),
        fetch(`/api/resume/preview?id=${id}`),
      ]);

      if (!detailsRes.ok) throw new Error("Failed to load resume details.");
      if (!previewRes.ok) throw new Error("Failed to load resume preview.");

      const detailsJson = await detailsRes.json();
      const previewJson = await previewRes.json();

      if (detailsJson.success && previewJson.success) {
        setResume(detailsJson.data.resume);
        setPreview(previewJson.data.preview);
      } else {
        throw new Error(detailsJson.error || previewJson.error || "Failed to load resume.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred fetching data.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadData();
    } else {
      toast.error("No resume ID provided.");
      router.push("/dashboard/resume");
    }
  }, [id, loadData, router]);

  const handleRevert = async (versionNumber: number) => {
    if (!id || isReverting !== null) return;
    try {
      setIsReverting(versionNumber);
      const res = await fetch(`/api/resume/update?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ version: versionNumber }),
      });
      if (!res.ok) throw new Error("Failed to revert version.");
      const json = await res.json();
      if (json.success) {
        toast.success(`Successfully reverted to version v${versionNumber}.`);
        loadData();
      } else {
        throw new Error(json.error || "Failed to revert version.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to revert version.";
      toast.error(msg);
    } finally {
      setIsReverting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading details and preview…</p>
        </div>
      </div>
    );
  }

  if (!resume || !preview) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center p-6 space-y-4">
        <AlertCircle className="size-12 text-destructive" />
        <h2 className="text-lg font-semibold">Resume Not Found</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          The requested resume could not be found or you do not have permission to view it.
        </p>
        <Link href="/dashboard/resume" className={buttonVariants({ variant: "default" })}>
          Back to Center
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] space-y-8 animate-fade-in">
      <WorkspaceHeader
        title={resume.originalName || "Resume Details"}
        description={`Detailed metadata overview, versions, and document preview for your uploaded resume.`}
        breadcrumbs={[
          { label: "Resume Center", href: "/dashboard/resume" },
          { label: "Details" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={loadData} aria-label="Refresh data">
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: Metadata Card and Version Switcher */}
        <div className="lg:col-span-1 space-y-6">
          <ResumeMetadataCard
            fileName={resume.fileName}
            originalName={resume.originalName}
            fileSize={resume.fileSize}
            fileType={resume.fileType}
            version={resume.version}
            status={resume.status}
            processingStatus={resume.processingStatus}
            uploadedAt={resume.createdAt}
            updatedAt={resume.updatedAt}
          />

          {/* Versions Sub-card */}
          {resume.versions && resume.versions.length > 1 && (
            <div className="surface-card p-5 space-y-4">
              <div className="flex items-center gap-2">
                <History className="size-4 text-primary" aria-hidden="true" />
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Version History
                </h3>
              </div>

              <div className="space-y-3" role="list">
                {resume.versions.map((v) => {
                  const isCurrent = v.versionNumber === resume.version;
                  const date = new Date(v.uploadedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <div
                      key={v.versionNumber}
                      className={`flex items-center justify-between rounded-xl border p-3 ${
                        isCurrent ? "border-primary/50 bg-primary/5" : "border-border"
                      }`}
                      role="listitem"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold">
                          Version {v.versionNumber} {isCurrent && "(Active)"}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          Uploaded {date}
                        </p>
                      </div>
                      {!isCurrent && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevert(v.versionNumber)}
                          disabled={isReverting !== null}
                          className="gap-1 px-2.5 py-1 text-xs"
                        >
                          {isReverting === v.versionNumber ? (
                            <Loader2 className="size-3 animate-spin" />
                          ) : (
                            <RotateCcw className="size-3" />
                          )}
                          Revert
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Document Preview Panel */}
        <div className="lg:col-span-2">
          <ResumePreviewPanel preview={preview} />
        </div>
      </div>
    </div>
  );
}
