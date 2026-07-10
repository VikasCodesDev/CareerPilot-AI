"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Loader2 } from "lucide-react";
import { WorkspaceHeader } from "@/features/dashboard/components/content/workspace-header";
import { DragDropZone } from "@/features/resume/components/DragDropZone";
import { UploadProgress, UploadProgressStatus } from "@/features/resume/components/UploadProgress";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ParentResumeOption {
  _id: string;
  originalName: string;
  version: number;
}

export default function ResumeUploadPage() {
  const router = useRouter();
  const [existingResumes, setExistingResumes] = useState<ParentResumeOption[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<string>("");
  const [isFetchingOptions, setIsFetchingOptions] = useState(true);

  // Upload States
  const [uploadStatus, setUploadStatus] = useState<UploadProgressStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedResumeId, setUploadedResumeId] = useState<string | null>(null);

  useEffect(() => {
    async function loadOptions() {
      try {
        const res = await fetch("/api/resume/list");
        if (!res.ok) throw new Error("Failed to load existing resumes.");
        const json = await res.json();
        if (json.success) {
          setExistingResumes(json.data.resumes || []);
        }
      } catch {
        setExistingResumes([]);
      } finally {
        setIsFetchingOptions(false);
      }
    }
    loadOptions();
  }, []);

  const handleFileSelect = async (file: File) => {
    setFileName(file.name);
    setUploadStatus("uploading");
    setProgress(15);
    setErrorMessage("");

    // Simulate progress animation for visual premium polish
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (selectedParentId) {
        formData.append("parentResumeId", selectedParentId);
      }

      const res = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to upload file.");
      }

      const json = await res.json();
      if (json.success) {
        setProgress(100);
        setUploadStatus("success");
        setUploadedResumeId(json.data._id);
        toast.success(
          selectedParentId
            ? "New version uploaded successfully!"
            : "Resume uploaded successfully!"
        );
      } else {
        throw new Error(json.error || "Failed to upload file.");
      }
    } catch (err: unknown) {
      clearInterval(interval);
      setUploadStatus("error");
      const msg = err instanceof Error ? err.message : "Network error during upload.";
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[var(--container-narrow)] space-y-8 animate-fade-in">
      <WorkspaceHeader
        title="Upload Resume"
        description="Add a new resume document or upload a revised version of an existing file."
        breadcrumbs={[
          { label: "Resume Center", href: "/dashboard/resume" },
          { label: "Upload" },
        ]}
        actions={
          <Link
            href="/dashboard/resume"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Center
          </Link>
        }
      />

      <div className="grid gap-6">
        {/* Upload Mode Config Card */}
        {uploadStatus === "idle" && (
          <div className="surface-card p-5 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Upload Settings
            </h3>
            
            <div className="space-y-2">
              <label htmlFor="parent-resume-select" className="text-xs font-medium text-muted-foreground">
                Upload Target
              </label>
              {isFetchingOptions ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground py-2">
                  <Loader2 className="size-3.5 animate-spin text-primary" />
                  Checking existing resumes…
                </div>
              ) : (
                <select
                  id="parent-resume-select"
                  value={selectedParentId}
                  onChange={(e) => setSelectedParentId(e.target.value)}
                  className="w-full rounded-xl border border-border bg-muted/30 px-3 py-2 text-sm focus-ring focus:outline-none"
                  aria-label="Select target for upload"
                >
                  <option value="">Create new resume record</option>
                  {existingResumes.map((r) => (
                    <option key={r._id} value={r._id}>
                      Append version to: {r.originalName} (currently v{r.version})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        )}

        {/* Drag Drop Zone */}
        {uploadStatus === "idle" && (
          <DragDropZone onFileSelect={handleFileSelect} />
        )}

        {/* Progress and status display */}
        {uploadStatus !== "idle" && (
          <div className="space-y-4">
            <UploadProgress
              status={uploadStatus}
              progress={progress}
              fileName={fileName}
              errorMessage={errorMessage}
            />

            {/* Post-Upload Actions */}
            {uploadStatus === "success" && uploadedResumeId && (
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/dashboard/resume/details?id=${uploadedResumeId}`}
                  className={cn(buttonVariants({ variant: "default" }), "flex-1 gap-2")}
                >
                  <FileText className="size-4" />
                  View Details
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    setUploadStatus("idle");
                    setProgress(0);
                    setFileName("");
                    setUploadedResumeId(null);
                  }}
                  className="flex-1"
                >
                  Upload Another
                </Button>
              </div>
            )}

            {uploadStatus === "error" && (
              <Button
                onClick={() => {
                  setUploadStatus("idle");
                  setProgress(0);
                  setFileName("");
                }}
                className="w-full"
              >
                Try Again
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
