import mongoose, { Schema, Document } from "mongoose";
import { IResume } from "@/types/backend";
import { IResumeVersion, ResumeStatus, ResumeProcessingStatus } from "@/types/resume";

export interface ResumeDocument extends Omit<IResume, "_id" | "createdAt" | "updatedAt">, Document {
  originalName: string;
  fileType: string;
  version: number;
  status: ResumeStatus;
  processingStatus: ResumeProcessingStatus;
  versions: IResumeVersion[];
  createdAt: Date;
  updatedAt: Date;
}

const ResumeVersionSchema = new Schema<IResumeVersion>({
  versionNumber: { type: Number, required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileSize: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "archived"], default: "active" },
});

const ResumeSchema = new Schema<ResumeDocument>(
  {
    userId: { type: String, ref: "User", required: true, index: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    atsScore: { type: Number, min: 0, max: 100, default: 0 },
    skillsDetected: { type: [String], default: [] },
    feedback: {
      strengths: { type: [String], default: [] },
      weaknesses: { type: [String], default: [] },
      improvements: { type: [String], default: [] },
    },
    rawText: { type: String, default: "" },
    originalName: { type: String, default: "" },
    fileType: { type: String, default: "" },
    version: { type: Number, default: 1 },
    status: { type: String, enum: ["active", "archived"], default: "active", index: true },
    processingStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "completed",
      index: true,
    },
    versions: { type: [ResumeVersionSchema], default: [] },
  },
  { timestamps: true }
);

export const Resume = mongoose.models.Resume || mongoose.model<ResumeDocument>("Resume", ResumeSchema);
