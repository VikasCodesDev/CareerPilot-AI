import { connectToDatabase } from "@/lib/db";
import { ResumeDocument } from "@/models/Resume";
import { ResumeStorageService } from "./resume-storage.service";
import { resumeRepository } from "@/repositories";
import { UploadResult } from "./resume-upload.service";

export class ResumeVersionService {
  /**
   * Appends a new version to an existing resume document.
   * Increments version count and updates active pointers.
   */
  static async addVersion(
    resumeId: string,
    userId: string,
    fileData: UploadResult
  ): Promise<ResumeDocument> {
    await connectToDatabase();

    const resume = await ResumeStorageService.getResume(resumeId, userId);
    if (!resume) {
      throw new Error("Resume not found or unauthorized.");
    }

    const nextVersionNumber = (resume.version || 1) + 1;

    const newVersion = {
      versionNumber: nextVersionNumber,
      fileName: fileData.fileName,
      fileUrl: fileData.fileUrl,
      fileSize: fileData.fileSize,
      uploadedAt: new Date(),
      status: "active" as const,
    };

    const updated = await resumeRepository.updateById(resumeId, {
      fileName: fileData.fileName,
      originalName: fileData.originalName,
      fileUrl: fileData.fileUrl,
      fileSize: fileData.fileSize,
      version: nextVersionNumber,
      $push: { versions: newVersion },
    });

    if (!updated) {
      throw new Error("Failed to update resume version.");
    }

    return updated;
  }

  /**
   * Reverts the primary resume details (fileName, fileUrl, fileSize, etc.)
   * to a previous version in its history.
   */
  static async revertToVersion(
    resumeId: string,
    userId: string,
    versionNumber: number
  ): Promise<ResumeDocument> {
    await connectToDatabase();

    const resume = await ResumeStorageService.getResume(resumeId, userId);
    if (!resume) {
      throw new Error("Resume not found or unauthorized.");
    }

    const targetVersion = resume.versions.find((v) => v.versionNumber === versionNumber);
    if (!targetVersion) {
      throw new Error(`Version ${versionNumber} does not exist in history.`);
    }

    const updated = await resumeRepository.updateById(resumeId, {
      fileName: targetVersion.fileName,
      fileUrl: targetVersion.fileUrl,
      fileSize: targetVersion.fileSize,
      version: targetVersion.versionNumber,
    });

    if (!updated) {
      throw new Error("Failed to revert resume version.");
    }

    return updated;
  }
}
