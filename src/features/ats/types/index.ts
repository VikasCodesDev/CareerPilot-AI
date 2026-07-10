export type ATSScoreCategory =
  | "resume"
  | "skills"
  | "experience"
  | "education"
  | "formatting"
  | "keywords"
  | "projects"
  | "achievements"
  | "certifications";

export type ATSSuggestionSeverity = "critical" | "warning" | "improvement";

export type ATSSectionKey =
  | "summary"
  | "skills"
  | "education"
  | "projects"
  | "experience"
  | "certifications"
  | "languages"
  | "links";

export interface ATSSectionDetection {
  key: ATSSectionKey;
  label: string;
  present: boolean;
  confidence: number;
}

export interface ATSSectionAnalysis {
  detected: ATSSectionDetection[];
  missingSections: ATSSectionKey[];
  detectedSections: ATSSectionKey[];
}

export interface ATSKeywordResult {
  matched: string[];
  missing: string[];
  recommended: string[];
  extra: string[];
  resumeKeywords: string[];
  requiredSkills: string[];
  matchRate: number;
}

export interface ATSSectionScore {
  category: ATSScoreCategory;
  label: string;
  score: number;
  weight: number;
  passedChecks: string[];
  warnings: string[];
  criticalIssues: string[];
}

export interface ATSSuggestion {
  id: string;
  category: ATSScoreCategory;
  severity: ATSSuggestionSeverity;
  title: string;
  description: string;
  actionItems: string[];
}

export interface ATSScoreBreakdown {
  overallScore: number;
  sectionScores: ATSSectionScore[];
  suggestionsCount: number;
  criticalIssues: string[];
  warnings: string[];
  passedChecks: string[];
}

export interface ATSAnalysisInput {
  resumeId?: string;
  userId: string;
  resumeText: string;
  requiredSkills: string[];
  targetRole?: string;
}

export interface ATSAnalysisResult {
  id?: string;
  resumeId?: string;
  userId: string;
  targetRole?: string;
  score: number;
  sectionScores: ATSSectionScore[];
  keywordResults: ATSKeywordResult;
  sectionAnalysis: ATSSectionAnalysis;
  suggestions: ATSSuggestion[];
  criticalIssues: string[];
  warnings: string[];
  passedChecks: string[];
  createdAt: Date;
}

export interface ATSAnalyzeRequest {
  resumeId?: string;
  resumeText?: string;
  requiredSkills?: string[];
  targetRole?: string;
  save?: boolean;
}

export interface ATSHistoryItem {
  id: string;
  resumeId?: string;
  score: number;
  targetRole?: string;
  suggestionsCount: number;
  criticalIssuesCount: number;
  createdAt: Date;
}

export interface ATSReport {
  analysis: ATSAnalysisResult;
  summary: {
    healthLabel: string;
    readiness: "low" | "medium" | "high";
    strongestSections: string[];
    weakestSections: string[];
    nextActions: string[];
  };
}
