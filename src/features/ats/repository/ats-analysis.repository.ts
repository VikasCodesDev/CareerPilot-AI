import { ATSAnalysis, ATSAnalysisDocument } from "@/models/ATSAnalysis";
import { MongooseRepository } from "@/repositories/mongoose.repository";
import type { ATSAnalysisResult } from "@/features/ats/types";

function toAnalysisResult(doc: ATSAnalysisDocument): ATSAnalysisResult {
  return {
    id: doc._id.toString(),
    resumeId: doc.resumeId,
    userId: doc.userId,
    targetRole: doc.targetRole,
    score: doc.score,
    sectionScores: doc.sectionScores,
    keywordResults: doc.keywordResults,
    sectionAnalysis: doc.sectionAnalysis,
    suggestions: doc.suggestions,
    criticalIssues: doc.criticalIssues,
    warnings: doc.warnings,
    passedChecks: doc.passedChecks,
    createdAt: doc.createdAt,
  };
}

export class ATSAnalysisRepository extends MongooseRepository<ATSAnalysisDocument> {
  constructor() {
    super(ATSAnalysis);
  }

  async saveAnalysis(analysis: ATSAnalysisResult): Promise<ATSAnalysisResult> {
    const created = await this.create({
      resumeId: analysis.resumeId,
      userId: analysis.userId,
      targetRole: analysis.targetRole,
      score: analysis.score,
      sectionScores: analysis.sectionScores,
      keywordResults: analysis.keywordResults,
      sectionAnalysis: analysis.sectionAnalysis,
      suggestions: analysis.suggestions,
      criticalIssues: analysis.criticalIssues,
      warnings: analysis.warnings,
      passedChecks: analysis.passedChecks,
    });

    return toAnalysisResult(created);
  }

  async getAnalysis(id: string, userId: string): Promise<ATSAnalysisResult | null> {
    const analysis = await ATSAnalysis.findOne({ _id: id, userId }).exec();
    return analysis ? toAnalysisResult(analysis) : null;
  }

  async listHistory(
    userId: string,
    options: { resumeId?: string; page: number; limit: number }
  ) {
    const filter = options.resumeId ? { userId, resumeId: options.resumeId } : { userId };
    const skip = (options.page - 1) * options.limit;
    const [data, total] = await Promise.all([
      ATSAnalysis.find(filter).sort({ createdAt: -1 }).skip(skip).limit(options.limit).exec(),
      ATSAnalysis.countDocuments(filter).exec(),
    ]);
    const totalPages = Math.ceil(total / options.limit);

    return {
      data: data.map(toAnalysisResult),
      total,
      page: options.page,
      limit: options.limit,
      totalPages,
      hasNextPage: options.page < totalPages,
      hasPrevPage: options.page > 1,
    };
  }

  async getLatest(userId: string, resumeId?: string): Promise<ATSAnalysisResult | null> {
    const filter = resumeId ? { userId, resumeId } : { userId };
    const latest = await ATSAnalysis.findOne(filter).sort({ createdAt: -1 }).exec();
    return latest ? toAnalysisResult(latest) : null;
  }

  async deleteAnalysis(id: string, userId: string): Promise<boolean> {
    const result = await ATSAnalysis.deleteOne({ _id: id, userId }).exec();
    return result.deletedCount === 1;
  }
}

export const atsAnalysisRepository = new ATSAnalysisRepository();
