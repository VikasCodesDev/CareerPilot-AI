import { ResumeStorageService } from "@/services";
import type { PortfolioBuilderInput } from "@/features/portfolio/types";

export class PortfolioImportService {
  static async fromCareerProfile(userId: string, input: Omit<PortfolioBuilderInput, "userId">) {
    const resumes = await ResumeStorageService.listUserResumes(userId);
    const latestResume = resumes[0];

    return {
      ...input,
      userId,
      resumeUrl: input.resumeUrl ?? latestResume?.fileUrl,
      skills: input.skills?.length ? input.skills : latestResume?.skillsDetected ?? [],
    };
  }
}
