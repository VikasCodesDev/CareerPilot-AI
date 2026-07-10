"use client";

import { useState } from "react";
import { FileText, Layout, AlignLeft, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IResumePreview } from "@/types/resume";

interface ResumePreviewPanelProps {
  preview: IResumePreview;
  className?: string;
}

export function ResumePreviewPanel({ preview, className }: ResumePreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<"visual" | "raw">("visual");

  return (
    <section className={cn("surface-card overflow-hidden flex flex-col h-full min-h-[30rem]", className)}>
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-border bg-muted/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <FileText className="size-5 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Document Preview
          </h2>
        </div>
        
        {/* Tabs */}
        <div className="flex rounded-lg bg-muted/80 p-0.5" role="tablist" aria-label="Preview type">
          <button
            onClick={() => setActiveTab("visual")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-ring",
              activeTab === "visual"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            role="tab"
            aria-selected={activeTab === "visual"}
            aria-controls="visual-preview-pane"
            type="button"
          >
            <Layout className="size-3.5" />
            Visual Sections
          </button>
          <button
            onClick={() => setActiveTab("raw")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-ring",
              activeTab === "raw"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            role="tab"
            aria-selected={activeTab === "raw"}
            aria-controls="raw-text-pane"
            type="button"
          >
            <AlignLeft className="size-3.5" />
            Raw Text
          </button>
        </div>
      </div>

      {/* Warning banner */}
      <div className="flex items-start gap-2 bg-primary/5 px-5 py-3 border-b border-border text-xs text-muted-foreground">
        <Info className="size-4 shrink-0 text-primary mt-0.5" aria-hidden="true" />
        <p>
          <strong>Note:</strong> This is a structured infrastructure mockup preview. Full AI parsing and text extraction will be functional in Module 08.
        </p>
      </div>

      {/* Pane Content */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-subtle">
        {activeTab === "visual" ? (
          <div id="visual-preview-pane" role="tabpanel" className="space-y-6">
            {preview.sections.map((section, idx) => (
              <div key={idx} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {section.title}
                </h3>
                <div className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed pl-3 border-l-2 border-muted">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div id="raw-text-pane" role="tabpanel" className="h-full">
            <pre className="h-full rounded-xl border border-border bg-muted/30 p-4 text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {preview.rawText}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
