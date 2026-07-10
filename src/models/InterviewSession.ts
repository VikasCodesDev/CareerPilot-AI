import mongoose, { Document, Schema } from "mongoose";

import type {
  InterviewAnswer,
  InterviewDifficulty,
  InterviewFeedback,
  InterviewQuestion,
  InterviewScore,
  InterviewSessionStatus,
  InterviewType,
} from "@/features/interview/types";
import type { IInterviewMessage } from "@/types/backend";

export interface InterviewSessionDocument extends Document {
  userId: string;
  targetRole: string;
  difficulty: InterviewDifficulty;
  interviewType: InterviewType;
  currentQuestion: number;
  questions: InterviewQuestion[];
  answers: InterviewAnswer[];
  feedback: InterviewFeedback[];
  score: InterviewScore;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  duration: number;
  status: InterviewSessionStatus;
  startedAt: Date;
  completedAt?: Date;
  messages?: IInterviewMessage[];
  overallFeedback?: {
    contentRating: number;
    communicationRating: number;
    overallScore: number;
    generalComments: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ScoreSchema = new Schema<InterviewScore>(
  {
    communicationScore: { type: Number, min: 0, max: 100, default: 0 },
    technicalScore: { type: Number, min: 0, max: 100, default: 0 },
    confidenceScore: { type: Number, min: 0, max: 100, default: 0 },
    behaviorScore: { type: Number, min: 0, max: 100, default: 0 },
    problemSolvingScore: { type: Number, min: 0, max: 100, default: 0 },
    overallScore: { type: Number, min: 0, max: 100, default: 0 },
  },
  { _id: false }
);

const QuestionSchema = new Schema<InterviewQuestion>(
  {
    id: { type: String, required: true },
    prompt: { type: String, required: true },
    category: { type: String, required: true },
    expectedSignals: { type: [String], default: [] },
    difficulty: { type: String, required: true },
    interviewType: { type: String, required: true },
    order: { type: Number, min: 1, required: true },
  },
  { _id: false }
);

const AnswerSchema = new Schema<InterviewAnswer>(
  {
    id: { type: String, required: true },
    questionId: { type: String, required: true },
    content: { type: String, required: true },
    formattedContent: { type: String, required: true },
    wordCount: { type: Number, min: 0, required: true },
    durationSeconds: { type: Number, min: 0, default: 0 },
    submittedAt: { type: String, required: true },
  },
  { _id: false }
);

const FeedbackSchema = new Schema<InterviewFeedback>(
  {
    id: { type: String, required: true },
    questionId: { type: String, required: true },
    answerId: { type: String, required: true },
    scores: { type: ScoreSchema, required: true },
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },
    summary: { type: String, required: true },
    createdAt: { type: String, required: true },
  },
  { _id: false }
);

const LegacyFeedbackSchema = new Schema(
  {
    clarityScore: { type: Number, required: true },
    contentScore: { type: Number, required: true },
    grammarErrors: { type: [String], default: [] },
    suggestions: { type: String, required: true },
  },
  { _id: false }
);

const MessageSchema = new Schema(
  {
    id: { type: String, required: true },
    role: { type: String, enum: ["system", "user", "assistant"], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    feedback: { type: LegacyFeedbackSchema, default: undefined },
  },
  { _id: false }
);

const InterviewSessionSchema = new Schema<InterviewSessionDocument>(
  {
    userId: { type: String, ref: "User", required: true, index: true },
    targetRole: { type: String, required: true, index: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Intermediate",
      index: true,
    },
    interviewType: { type: String, default: "Mixed", index: true },
    currentQuestion: { type: Number, min: 0, default: 0 },
    questions: { type: [QuestionSchema], default: [] },
    answers: { type: [AnswerSchema], default: [] },
    feedback: { type: [FeedbackSchema], default: [] },
    score: { type: ScoreSchema, default: () => ({}) },
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },
    duration: { type: Number, min: 0, default: 30 },
    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
      index: true,
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    messages: { type: [MessageSchema], default: [] },
    overallFeedback: {
      contentRating: { type: Number },
      communicationRating: { type: Number },
      overallScore: { type: Number },
      generalComments: { type: String },
    },
  },
  { timestamps: true }
);

InterviewSessionSchema.index({ userId: 1, updatedAt: -1 });
InterviewSessionSchema.index({ userId: 1, status: 1 });

export const InterviewSession =
  mongoose.models.InterviewSession ||
  mongoose.model<InterviewSessionDocument>("InterviewSession", InterviewSessionSchema);
