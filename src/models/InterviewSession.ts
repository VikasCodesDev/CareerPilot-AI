import mongoose, { Schema, Document } from "mongoose";
import { IInterviewSession } from "@/types/backend";

export interface InterviewSessionDocument extends Omit<IInterviewSession, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema({
  clarityScore: { type: Number, required: true },
  contentScore: { type: Number, required: true },
  grammarErrors: { type: [String], default: [] },
  suggestions: { type: String, required: true },
});

const MessageSchema = new Schema({
  id: { type: String, required: true },
  role: { type: String, enum: ["system", "user", "assistant"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  feedback: { type: FeedbackSchema, default: undefined },
});

const InterviewSessionSchema = new Schema<InterviewSessionDocument>(
  {
    userId: { type: String, ref: "User", required: true, index: true },
    targetRole: { type: String, required: true },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "intermediate" },
    status: { type: String, enum: ["active", "completed"], default: "active", index: true },
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

export const InterviewSession =
  mongoose.models.InterviewSession ||
  mongoose.model<InterviewSessionDocument>("InterviewSession", InterviewSessionSchema);
