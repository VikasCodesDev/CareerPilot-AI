import mongoose, { Document, Schema } from "mongoose";

import type {
  PortfolioAchievement,
  PortfolioAnalytics,
  PortfolioCertification,
  PortfolioEducation,
  PortfolioExperience,
  PortfolioProject,
  PortfolioSEO,
  PortfolioSection,
  PortfolioSettings,
  PortfolioSkill,
  PortfolioTheme,
  PortfolioVersion,
  PortfolioVisibility,
  PortfolioPublishStatus,
} from "@/features/portfolio/types";

export interface PortfolioDocument extends Document {
  userId: string;
  title: string;
  slug: string;
  theme: PortfolioTheme;
  themeName: string;
  visibility: PortfolioVisibility;
  sections: PortfolioSection[];
  projects: PortfolioProject[];
  skills: PortfolioSkill[];
  experience: PortfolioExperience[];
  education: PortfolioEducation[];
  certifications: PortfolioCertification[];
  achievements: PortfolioAchievement[];
  analytics: PortfolioAnalytics;
  seo: PortfolioSEO;
  settings: PortfolioSettings;
  versions: PortfolioVersion[];
  publishStatus: PortfolioPublishStatus;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSectionSchema = new Schema<PortfolioSection>(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, min: 0, required: true },
    enabled: { type: Boolean, default: true },
  },
  { _id: false }
);

const PortfolioProjectSchema = new Schema<PortfolioProject>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    githubUrl: { type: String },
    demoUrl: { type: String },
    order: { type: Number, min: 0, default: 0 },
  },
  { _id: false }
);

const PortfolioSkillSchema = new Schema<PortfolioSkill>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, default: "General" },
    level: { type: String, default: "Intermediate" },
    order: { type: Number, min: 0, default: 0 },
  },
  { _id: false }
);

const PortfolioExperienceSchema = new Schema<PortfolioExperience>(
  {
    id: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    summary: { type: String, required: true },
    achievements: { type: [String], default: [] },
  },
  { _id: false }
);

const PortfolioEducationSchema = new Schema<PortfolioEducation>(
  {
    id: { type: String, required: true },
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startYear: { type: String },
    endYear: { type: String },
  },
  { _id: false }
);

const PortfolioCertificationSchema = new Schema<PortfolioCertification>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    issuedAt: { type: String },
    credentialUrl: { type: String },
  },
  { _id: false }
);

const PortfolioAchievementSchema = new Schema<PortfolioAchievement>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String },
  },
  { _id: false }
);

const PortfolioAnalyticsSchema = new Schema<PortfolioAnalytics>(
  {
    views: { type: Number, min: 0, default: 0 },
    uniqueVisitors: { type: Number, min: 0, default: 0 },
    contactClicks: { type: Number, min: 0, default: 0 },
    resumeDownloads: { type: Number, min: 0, default: 0 },
    lastViewedAt: { type: String },
  },
  { _id: false }
);

const PortfolioSEOSchema = new Schema<PortfolioSEO>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], default: [] },
    canonicalUrl: { type: String },
    score: { type: Number, min: 0, max: 100, default: 0 },
  },
  { _id: false }
);

const PortfolioSettingsSchema = new Schema<PortfolioSettings>(
  {
    contactEmail: { type: String },
    location: { type: String },
    resumeUrl: { type: String },
    socialLinks: {
      type: [
        new Schema(
          {
            label: { type: String, required: true },
            url: { type: String, required: true },
          },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  { _id: false }
);

const PortfolioVersionSchema = new Schema<PortfolioVersion>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    createdAt: { type: String, required: true },
    snapshotSummary: { type: String, required: true },
  },
  { _id: false }
);

const PortfolioSchema = new Schema<PortfolioDocument>(
  {
    userId: { type: String, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    theme: { type: String, default: "Modern Dark" },
    themeName: { type: String, default: "Modern Dark" },
    visibility: { type: String, enum: ["private", "unlisted", "public"], default: "private" },
    sections: { type: [PortfolioSectionSchema], default: [] },
    projects: { type: [PortfolioProjectSchema], default: [] },
    skills: { type: [PortfolioSkillSchema], default: [] },
    experience: { type: [PortfolioExperienceSchema], default: [] },
    education: { type: [PortfolioEducationSchema], default: [] },
    certifications: { type: [PortfolioCertificationSchema], default: [] },
    achievements: { type: [PortfolioAchievementSchema], default: [] },
    analytics: { type: PortfolioAnalyticsSchema, default: () => ({}) },
    seo: { type: PortfolioSEOSchema, required: true },
    settings: { type: PortfolioSettingsSchema, default: () => ({ socialLinks: [] }) },
    versions: { type: [PortfolioVersionSchema], default: [] },
    publishStatus: {
      type: String,
      enum: ["draft", "published", "unpublished", "archived"],
      default: "draft",
      index: true,
    },
    published: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

PortfolioSchema.index({ userId: 1, updatedAt: -1 });
PortfolioSchema.index({ slug: 1, published: 1, visibility: 1 });

export const Portfolio =
  mongoose.models.Portfolio || mongoose.model<PortfolioDocument>("Portfolio", PortfolioSchema);
