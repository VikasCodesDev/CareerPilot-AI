import mongoose, { Schema, Document } from "mongoose";
import { INotification } from "@/types/backend";

export interface NotificationDocument extends Omit<INotification, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<NotificationDocument>(
  {
    userId: { type: String, ref: "User", required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["info", "success", "warning", "error"], default: "info" },
    read: { type: Boolean, default: false, index: true },
    link: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Notification =
  mongoose.models.Notification ||
  mongoose.model<NotificationDocument>("Notification", NotificationSchema);
