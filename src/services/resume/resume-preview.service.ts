import { IResumePreview } from "@/types/resume";
import { ResumeStorageService } from "./resume-storage.service";

export class ResumePreviewService {
  /**
   * Generates a structural mockup preview for the resume document.
   * Useful before parsing is implemented in Module 08.
   */
  static async getPreview(resumeId: string, userId: string): Promise<IResumePreview> {
    const resume = await ResumeStorageService.getResume(resumeId, userId);
    if (!resume) {
      throw new Error("Resume not found or unauthorized.");
    }

    // Return mockup text/sections based on filename or static content
    const baseName = resume.originalName || "Resume";
    const displayName = baseName.replace(/\.[^/.]+$/, "");

    return {
      fileName: resume.fileName,
      fileUrl: resume.fileUrl,
      rawText: `
        [PREVIEW MODE - INFRASTRUCTURE ONLY]
        Name: ${displayName}
        File Size: ${resume.fileSize} bytes
        Version: ${resume.version}
        
        This is a visual preview structure created by the Resume Preview Service. 
        AI-based OCR and text extraction will be fully integrated in Module 08.
      `.trim(),
      sections: [
        {
          title: "Personal Information",
          content: `Name: Mock Candidate\nEmail: candidate@example.com\nPhone: (555) 019-2834\nFile: ${resume.originalName}`,
        },
        {
          title: "Professional Summary",
          content: "Experienced software engineer with a strong foundation in modern web technologies, scalable system architecture, and agile engineering practices.",
        },
        {
          title: "Experience",
          content: "Senior Software Engineer — TechCorp (2023 - Present)\n• Designed and maintained microservices supporting high-traffic REST APIs.\n• Optimized database query speeds by 40% using indexes and clean Mongoose queries.\n\nSoftware Engineer — DevSystems (2020 - 2023)\n• Developed responsive UI layouts using React and Tailwind CSS.",
        },
        {
          title: "Education",
          content: "Bachelor of Science in Computer Science\nState University (Class of 2020)",
        },
        {
          title: "Skills",
          content: "TypeScript, JavaScript, React, Next.js, Node.js, Express, MongoDB, Mongoose, Zod, Git, HTML, CSS",
        },
      ],
    };
  }
}
