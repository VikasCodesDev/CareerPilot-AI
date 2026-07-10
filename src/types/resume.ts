export type ResumeStatus = "active" | "archived";

export type ResumeProcessingStatus = "pending" | "processing" | "completed" | "failed";

export interface IResumeVersion {
  versionNumber: number;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: Date;
  status: ResumeStatus;
}

export interface IResumeMetadata {
  fileName: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: Date;
  updatedAt: Date;
  version: number;
  status: ResumeStatus;
  processingStatus: ResumeProcessingStatus;
  ownerId: string;
}

export interface IResumeUpload {
  originalName: string;
  fileType: string;
  fileSize: number;
}

export interface IResumePreview {
  fileName: string;
  fileUrl: string;
  rawText: string;
  sections: {
    title: string;
    content: string;
  }[];
}
