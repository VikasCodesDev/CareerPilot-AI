import { connectToDatabase } from "@/lib/db";
import { atsAnalysisRepository } from "@/features/ats/repository";
import type { ATSAnalysisResult, ATSHistoryItem } from "@/features/ats/types";

function toHistoryItem(analysis: ATSAnalysisResult): ATSHistoryItem {
  return {
    id: analysis.id ?? "",
    resumeId: analysis.resumeId,
    score: analysis.score,
    targetRole: analysis.targetRole,
    suggestionsCount: analysis.suggestions.length,
    criticalIssuesCount: analysis.criticalIssues.length,
    createdAt: analysis.createdAt,
  };
}

export class ATSHistoryService {
  static async saveAnalysis(analysis: ATSAnalysisResult): Promise<ATSAnalysisResult> {
    await connectToDatabase();
    return atsAnalysisRepository.saveAnalysis(analysis);
  }

  static async getAnalysis(id: string, userId: string): Promise<ATSAnalysisResult | null> {
    await connectToDatabase();
    return atsAnalysisRepository.getAnalysis(id, userId);
  }

  static async getLatest(userId: string, resumeId?: string): Promise<ATSAnalysisResult | null> {
    await connectToDatabase();
    return atsAnalysisRepository.getLatest(userId, resumeId);
  }

  static async listHistory(
    userId: string,
    options: { resumeId?: string; page: number; limit: number }
  ) {
    await connectToDatabase();
    const result = await atsAnalysisRepository.listHistory(userId, options);

    return {
      ...result,
      data: result.data.map(toHistoryItem),
    };
  }

  static async deleteAnalysis(id: string, userId: string): Promise<boolean> {
    await connectToDatabase();
    return atsAnalysisRepository.deleteAnalysis(id, userId);
  }
}
