import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@/types/backend";

export interface UserDocument
  extends Omit<IUser, "_id" | "createdAt" | "updatedAt">, Document {
  passwordHash?: string | null;
  emailVerified: boolean;
  verificationTokenHash?: string | null;
  verificationExpires?: Date | null;
  passwordResetTokenHash?: string | null;
  passwordResetExpires?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    image: { type: String, default: null },
    role: {
      type: String,
      enum: ["user", "admin", "mentor"],
      default: "user",
      index: true,
    },
    metadata: {
      completedOnboarding: { type: Boolean, default: false },
      careerGoal: { type: String, default: "" },
      targetRole: { type: String, default: "" },
      experienceLevel: {
        type: String,
        enum: ["entry", "mid", "senior", ""],
        default: "",
      },
      skills: { type: [String], default: [] },
      resumeUrl: { type: String, default: "" },
    },
    passwordHash: { type: String, default: null },
    emailVerified: { type: Boolean, default: false },
    verificationTokenHash: { type: String, default: null },
    verificationExpires: { type: Date, default: null },
    passwordResetTokenHash: { type: String, default: null },
    passwordResetExpires: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

// To resolve nextjs serverless model hot-reload conflicts
export const User =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);
