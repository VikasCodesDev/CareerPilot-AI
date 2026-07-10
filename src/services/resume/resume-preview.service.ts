import { IResumePreview } from "@/types/resume";
import { ResumeStorageService } from "./resume-storage.service";

export class ResumePreviewService {
  /**
   * Generates a deterministic structural preview for the stored resume document.
   */
  static async getPreview(resumeId: string, userId: string): Promise<IResumePreview> {
    const resume = await ResumeStorageService.getResume(resumeId, userId);
    if (!resume) {
      throw new Error("Resume not found or unauthorized.");
    }

    const baseName = resume.originalName || "Resume";
    const displayName = baseName.replace(/\.[^/.]+$/, "");
    const rawText = resume.rawText?.trim();
    const feedback = resume.feedback ?? {
      strengths: [],
      weaknesses: [],
      improvements: [],
    };
    const feedbackItems = [
      ...feedback.strengths,
      ...feedback.weaknesses,
      ...feedback.improvements,
    ];

    return {
      fileName: resume.fileName,
      fileUrl: resume.fileUrl,
      rawText:
        rawText ||
        `Resume: ${displayName}\nFile Size: ${resume.fileSize} bytes\nVersion: ${resume.version}\nStatus: ${resume.processingStatus}`,
      sections: [
        {
          title: "Document",
          content: `File: ${resume.originalName}\nStored URL: ${resume.fileUrl}\nVersion: ${resume.version}`,
        },
        {
          title: "Detected Text",
          content: rawText || "No extracted resume text is stored for this upload yet.",
        },
        {
          title: "Detected Skills",
          content: resume.skillsDetected.length
            ? resume.skillsDetected.join(", ")
            : "No skills detected yet.",
        },
        {
          title: "Feedback",
          content: feedbackItems.length ? feedbackItems.join("\n") : "No resume feedback stored yet.",
        },
        {
          title: "ATS Score",
          content: `${resume.atsScore ?? 0}/100`,
        },
      ],
    };
  }
}
