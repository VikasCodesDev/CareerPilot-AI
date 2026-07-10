import { connectToDatabase } from "@/lib/db";
import { resumeRepository } from "@/repositories";
import { ResumeDocument } from "@/models/Resume";

export class ResumeStorageService {
  /**
   * Register a new resume in the database
   */
  static async createResume(
    userId: string,
    data: {
      fileName: string;
      originalName: string;
      fileUrl: string;
      fileSize: number;
      fileType: string;
    }
  ): Promise<ResumeDocument> {
    await connectToDatabase();

    const initialVersion = {
      versionNumber: 1,
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      fileSize: data.fileSize,
      uploadedAt: new Date(),
      status: "active" as const,
    };

    const doc = await resumeRepository.create({
      userId,
      fileName: data.fileName,
      originalName: data.originalName,
      fileUrl: data.fileUrl,
      fileSize: data.fileSize,
      fileType: data.fileType,
      version: 1,
      status: "active",
      processingStatus: "completed",
      versions: [initialVersion],
      atsScore: 0,
      skillsDetected: [],
      feedback: {
        strengths: [],
        weaknesses: [],
        improvements: [],
      },
      rawText: "",
    });

    return doc;
  }

  /**
   * Get a single resume by ID, scoped by user ID for security
   */
  static async getResume(id: string, userId: string): Promise<ResumeDocument | null> {
    await connectToDatabase();
    const doc = await resumeRepository.findById(id);

    if (!doc || doc.userId !== userId) {
      return null;
    }

    return doc;
  }

  /**
   * Lists all resumes for a user. Standard search excludes archived.
   */
  static async listUserResumes(userId: string, includeArchived = false): Promise<ResumeDocument[]> {
    await connectToDatabase();
    return resumeRepository.findByUser(userId, includeArchived);
  }

  /**
   * Update resume metadata
   */
  static async updateResume(
    id: string,
    userId: string,
    data: Partial<Omit<ResumeDocument, "userId" | "versions" | "_id">>
  ): Promise<ResumeDocument | null> {
    await connectToDatabase();

    // Verify ownership first
    const existing = await this.getResume(id, userId);
    if (!existing) return null;

    const updated = await resumeRepository.updateById(id, data);
    return updated;
  }

  /**
   * Soft deletes a resume by marking its status as archived
   */
  static async deleteResume(id: string, userId: string): Promise<boolean> {
    await connectToDatabase();

    const existing = await this.getResume(id, userId);
    if (!existing) return false;

    return resumeRepository.softDelete(id);
  }
}
