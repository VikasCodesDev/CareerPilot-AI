import mongoose, { Schema, Document } from "mongoose";
import { IAnalytics } from "@/types/backend";

export interface AnalyticsDocument extends Omit<IAnalytics, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

const WeeklyHoursSchema = new Schema({
  day: { type: String, required: true },
  hours: { type: Number, required: true, min: 0 },
});

const AnalyticsSchema = new Schema<AnalyticsDocument>(
  {
    userId: { type: String, ref: "User", required: true, unique: true, index: true },
    careerScore: { type: Number, default: 0, min: 0, max: 100 },
    xpPoints: { type: Number, default: 0, min: 0 },
    streakDays: { type: Number, default: 0, min: 0 },
    lastActiveDate: { type: Date, default: Date.now },
    weeklyHoursStudied: { type: [WeeklyHoursSchema], default: [] },
    roadmapCompletionRate: { type: Number, default: 0, min: 0, max: 100 },
  },
  { timestamps: true }
);

export const Analytics =
  mongoose.models.Analytics || mongoose.model<AnalyticsDocument>("Analytics", AnalyticsSchema);
