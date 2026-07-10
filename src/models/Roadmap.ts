import mongoose, { Document, Schema } from "mongoose";

import type {
  ExperienceLevel,
  MonthlyGoal,
  RoadmapDeadline,
  RoadmapItemStatus,
  RoadmapLevel,
  RoadmapMilestone,
  RoadmapProgress,
  RoadmapResource,
  RoadmapStatus,
  RoadmapTask,
  RoadmapPhase,
  SkillNode,
  SupportedRoadmapRole,
  WeeklyGoal,
} from "@/features/roadmap/types";

export interface RoadmapDocument extends Document {
  userId: string;
  careerGoal: string;
  currentSkills: string[];
  targetRole: SupportedRoadmapRole;
  experienceLevel: ExperienceLevel;
  roadmapLevel: RoadmapLevel;
  estimatedDuration: number;
  currentPhase: RoadmapPhase;
  progress: RoadmapProgress;
  completion: number;
  milestones: RoadmapMilestone[];
  tasks: RoadmapTask[];
  resources: RoadmapResource[];
  deadlines: RoadmapDeadline[];
  weeklyGoals: WeeklyGoal[];
  monthlyGoals: MonthlyGoal[];
  skillGraph: SkillNode[];
  learningHoursPerWeek: number;
  status: RoadmapStatus;
  estimatedMonths?: number;
  skillsToAcquire?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<RoadmapProgress>(
  {
    completionPercentage: { type: Number, min: 0, max: 100, default: 0 },
    completedTasks: { type: Number, min: 0, default: 0 },
    totalTasks: { type: Number, min: 0, default: 0 },
    completedMilestones: { type: Number, min: 0, default: 0 },
    totalMilestones: { type: Number, min: 0, default: 0 },
    learningHoursCompleted: { type: Number, min: 0, default: 0 },
    learningHoursPlanned: { type: Number, min: 0, default: 0 },
    currentWeek: { type: Number, min: 1, default: 1 },
  },
  { _id: false }
);

const MilestoneSchema = new Schema<RoadmapMilestone>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    phase: { type: String, required: true },
    week: { type: Number, min: 1, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"] satisfies RoadmapItemStatus[],
      default: "pending",
    },
    taskIds: { type: [String], default: [] },
  },
  { _id: false }
);

const TaskSchema = new Schema<RoadmapTask>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    phase: { type: String, required: true },
    week: { type: Number, min: 1, required: true },
    estimatedHours: { type: Number, min: 0, required: true },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"] satisfies RoadmapItemStatus[],
      default: "pending",
    },
    skillTags: { type: [String], default: [] },
  },
  { _id: false }
);

const ResourceSchema = new Schema<RoadmapResource>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    phase: { type: String, required: true },
    description: { type: String, required: true },
    placeholder: { type: Boolean, default: true },
  },
  { _id: false }
);

const DeadlineSchema = new Schema<RoadmapDeadline>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    week: { type: Number, min: 1, required: true },
    phase: { type: String, required: true },
    dueDate: { type: String, required: true },
  },
  { _id: false }
);

const WeeklyGoalSchema = new Schema<WeeklyGoal>(
  {
    week: { type: Number, min: 1, required: true },
    title: { type: String, required: true },
    focus: { type: String, required: true },
    taskIds: { type: [String], default: [] },
    targetHours: { type: Number, min: 0, required: true },
    completedHours: { type: Number, min: 0, default: 0 },
  },
  { _id: false }
);

const MonthlyGoalSchema = new Schema<MonthlyGoal>(
  {
    month: { type: Number, min: 1, required: true },
    title: { type: String, required: true },
    focus: { type: String, required: true },
    milestoneIds: { type: [String], default: [] },
    completionTarget: { type: Number, min: 0, max: 100, required: true },
  },
  { _id: false }
);

const SkillNodeSchema = new Schema<SkillNode>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    category: { type: String, required: true },
    phase: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dependencies: { type: [String], default: [] },
  },
  { _id: false }
);

const RoadmapSchema = new Schema<RoadmapDocument>(
  {
    userId: { type: String, ref: "User", required: true, index: true },
    careerGoal: { type: String, required: true },
    currentSkills: { type: [String], default: [] },
    targetRole: { type: String, required: true, index: true },
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"] satisfies ExperienceLevel[],
      required: true,
    },
    roadmapLevel: {
      type: String,
      enum: ["starter", "growth", "job-ready"] satisfies RoadmapLevel[],
      default: "starter",
    },
    estimatedDuration: { type: Number, min: 1, required: true },
    currentPhase: { type: String, default: "Foundation" },
    progress: { type: ProgressSchema, required: true },
    completion: { type: Number, min: 0, max: 100, default: 0 },
    milestones: { type: [MilestoneSchema], default: [] },
    tasks: { type: [TaskSchema], default: [] },
    resources: { type: [ResourceSchema], default: [] },
    deadlines: { type: [DeadlineSchema], default: [] },
    weeklyGoals: { type: [WeeklyGoalSchema], default: [] },
    monthlyGoals: { type: [MonthlyGoalSchema], default: [] },
    skillGraph: { type: [SkillNodeSchema], default: [] },
    learningHoursPerWeek: { type: Number, min: 1, default: 8 },
    status: {
      type: String,
      enum: ["draft", "active", "completed", "archived"] satisfies RoadmapStatus[],
      default: "active",
      index: true,
    },
    estimatedMonths: { type: Number, min: 1 },
    skillsToAcquire: { type: [String], default: [] },
  },
  { timestamps: true }
);

RoadmapSchema.index({ userId: 1, updatedAt: -1 });
RoadmapSchema.index({ userId: 1, status: 1 });

export const Roadmap =
  mongoose.models.Roadmap || mongoose.model<RoadmapDocument>("Roadmap", RoadmapSchema);
