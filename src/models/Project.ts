import mongoose, { Schema, Document } from "mongoose";
import { IProject } from "@/types/backend";

export interface ProjectDocument extends Omit<IProject, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    userId: { type: String, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "intermediate" },
    techStack: { type: [String], default: [] },
    featuresList: { type: [String], default: [] },
    estimatedHours: { type: Number, required: true, min: 1 },
    githubUrl: { type: String, default: "" },
    demoUrl: { type: String, default: "" },
    roadmapId: { type: String, ref: "Roadmap", default: null },
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.Project || mongoose.model<ProjectDocument>("Project", ProjectSchema);
