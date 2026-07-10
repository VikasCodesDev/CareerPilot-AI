import type { ATSAnalysisResult, ATSReport } from "@/features/ats/types";

function getHealthLabel(score: number): string {
  if (score >= 85) return "Excellent ATS health";
  if (score >= 70) return "Good ATS health";
  if (score >= 50) return "Needs focused improvements";
  return "Critical resume gaps";
}

export class ATSReportService {
  static buildReport(analysis: ATSAnalysisResult): ATSReport {
    const sorted = [...analysis.sectionScores].sort((a, b) => b.score - a.score);
    const strongestSections = sorted.slice(0, 3).map((section) => section.label);
    const weakestSections = sorted.slice(-3).reverse().map((section) => section.label);

    return {
      analysis,
      summary: {
        healthLabel: getHealthLabel(analysis.score),
        readiness:
          analysis.score >= 80 ? "high" : analysis.score >= 60 ? "medium" : "low",
        strongestSections,
        weakestSections,
        nextActions: analysis.suggestions.slice(0, 3).map((suggestion) => suggestion.title),
      },
    };
  }
}
