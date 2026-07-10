import mongoose, { Document, Schema } from "mongoose";

import type {
  ATSKeywordResult,
  ATSSectionAnalysis,
  ATSSectionScore,
  ATSSuggestion,
} from "@/features/ats/types";

export interface ATSAnalysisDocument extends Document {
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
  updatedAt: Date;
}

const SectionScoreSchema = new Schema<ATSSectionScore>(
  {
    category: { type: String, required: true },
    label: { type: String, required: true },
    score: { type: Number, min: 0, max: 100, required: true },
    weight: { type: Number, min: 0, max: 1, required: true },
    passedChecks: { type: [String], default: [] },
    warnings: { type: [String], default: [] },
    criticalIssues: { type: [String], default: [] },
  },
  { _id: false }
);

const KeywordResultSchema = new Schema<ATSKeywordResult>(
  {
    matched: { type: [String], default: [] },
    missing: { type: [String], default: [] },
    recommended: { type: [String], default: [] },
    extra: { type: [String], default: [] },
    resumeKeywords: { type: [String], default: [] },
    requiredSkills: { type: [String], default: [] },
    matchRate: { type: Number, min: 0, max: 1, default: 0 },
  },
  { _id: false }
);

const SectionDetectionSchema = new Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    present: { type: Boolean, required: true },
    confidence: { type: Number, min: 0, max: 100, required: true },
  },
  { _id: false }
);

const SectionAnalysisSchema = new Schema<ATSSectionAnalysis>(
  {
    detected: { type: [SectionDetectionSchema], default: [] },
    missingSections: { type: [String], default: [] },
    detectedSections: { type: [String], default: [] },
  },
  { _id: false }
);

const SuggestionSchema = new Schema<ATSSuggestion>(
  {
    id: { type: String, required: true },
    category: { type: String, required: true },
    severity: { type: String, enum: ["critical", "warning", "improvement"], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    actionItems: { type: [String], default: [] },
  },
  { _id: false }
);

const ATSAnalysisSchema = new Schema<ATSAnalysisDocument>(
  {
    resumeId: { type: String, ref: "Resume", index: true },
    userId: { type: String, ref: "User", required: true, index: true },
    targetRole: { type: String, default: "" },
    score: { type: Number, min: 0, max: 100, required: true, index: true },
    sectionScores: { type: [SectionScoreSchema], default: [] },
    keywordResults: { type: KeywordResultSchema, required: true },
    sectionAnalysis: { type: SectionAnalysisSchema, required: true },
    suggestions: { type: [SuggestionSchema], default: [] },
    criticalIssues: { type: [String], default: [] },
    warnings: { type: [String], default: [] },
    passedChecks: { type: [String], default: [] },
  },
  { timestamps: true }
);

ATSAnalysisSchema.index({ userId: 1, createdAt: -1 });
ATSAnalysisSchema.index({ resumeId: 1, createdAt: -1 });

export const ATSAnalysis =
  mongoose.models.ATSAnalysis ||
  mongoose.model<ATSAnalysisDocument>("ATSAnalysis", ATSAnalysisSchema);
