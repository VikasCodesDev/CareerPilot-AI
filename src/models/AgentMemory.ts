import mongoose, { Schema, Document } from "mongoose";
import { IAgentMemory } from "@/types/backend";

export interface AgentMemoryDocument extends Omit<IAgentMemory, "_id" | "createdAt" | "updatedAt">, Document {
  createdAt: Date;
  updatedAt: Date;
}

const ChatHistoryItemSchema = new Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const AgentMemorySchema = new Schema<AgentMemoryDocument>(
  {
    userId: { type: String, ref: "User", required: true, index: true },
    sessionId: { type: String, required: true, index: true },
    contextSummary: { type: String, default: "" },
    chatHistory: { type: [ChatHistoryItemSchema], default: [] },
    lastInteractionTime: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const AgentMemory =
  mongoose.models.AgentMemory ||
  mongoose.model<AgentMemoryDocument>("AgentMemory", AgentMemorySchema);
