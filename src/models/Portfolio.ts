import mongoose, { Schema, Document } from "mongoose";
import { IPortfolio } from "@/types/backend";

export interface PortfolioDocument extends Omit<IPortfolio, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSectionSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["text", "projects", "skills", "timeline"], required: true },
  content: { type: String, required: true },
});

const PortfolioSchema = new Schema<PortfolioDocument>(
  {
    userId: { type: String, ref: "User", required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    themeName: { type: String, default: "default" },
    sections: { type: [PortfolioSectionSchema], default: [] },
    published: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export const Portfolio =
  mongoose.models.Portfolio || mongoose.model<PortfolioDocument>("Portfolio", PortfolioSchema);
