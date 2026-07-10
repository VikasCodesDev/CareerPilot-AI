import mongoose, { Schema, Document } from "mongoose";
import { IRoadmap } from "@/types/backend";

export interface RoadmapDocument extends Omit<IRoadmap, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

const MilestoneSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeline: { type: String, required: true },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  resources: [
    {
      name: { type: String, required: true },
      url: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
});

const RoadmapSchema = new Schema<RoadmapDocument>(
  {
    userId: { type: String, ref: "User", required: true, index: true },
    careerGoal: { type: String, required: true },
    targetRole: { type: String, required: true },
    estimatedMonths: { type: Number, required: true },
    skillsToAcquire: { type: [String], default: [] },
    milestones: { type: [MilestoneSchema], default: [] },
    progress: { type: Number, min: 0, max: 100, default: 0 },
  },
  { timestamps: true }
);

export const Roadmap = mongoose.models.Roadmap || mongoose.model<RoadmapDocument>("Roadmap", RoadmapSchema);
