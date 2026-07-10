import { atsConfig } from "@/features/ats/config";
import { ATSImprovementService } from "@/features/ats/services/ats-improvement.service";
import { ATSScoreService } from "@/features/ats/services/ats-score.service";
import type { ATSAnalysisInput, ATSAnalysisResult } from "@/features/ats/types";

export class ATSAnalysisService {
  static analyze(input: ATSAnalysisInput): ATSAnalysisResult {
    const requiredSkills =
      input.requiredSkills.length > 0
        ? input.requiredSkills
        : [...atsConfig.defaultRequiredSkills];
    const breakdown = ATSScoreService.analyze({ ...input, requiredSkills });
    const suggestions = ATSImprovementService.generateSuggestions(
      breakdown,
      breakdown.keywordResults
    );

    return {
      resumeId: input.resumeId,
      userId: input.userId,
      targetRole: input.targetRole,
      score: breakdown.overallScore,
      sectionScores: breakdown.sectionScores,
      keywordResults: breakdown.keywordResults,
      sectionAnalysis: breakdown.sectionAnalysis,
      suggestions,
      criticalIssues: breakdown.criticalIssues,
      warnings: breakdown.warnings,
      passedChecks: breakdown.passedChecks,
      createdAt: new Date(),
    };
  }
}
