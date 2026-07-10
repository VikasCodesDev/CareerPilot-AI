export type UserRole = "user" | "admin" | "mentor";

export interface ProfileMetadata {
  completedOnboarding: boolean;
  careerGoal?: string;
  targetRole?: string;
  experienceLevel?: "entry" | "mid" | "senior";
  skills?: string[];
  resumeUrl?: string;
}

export interface AuthUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: UserRole;
  metadata: ProfileMetadata;
  createdAt: string;
}

export interface AuthSession {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: UserRole;
    metadata: ProfileMetadata;
  };
  expires: string;
}

// Global NextAuth module overrides for typescript compatibility
declare module "next-auth" {
  interface User {
    id: string;
    role?: UserRole;
    metadata?: ProfileMetadata;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: UserRole;
      metadata: ProfileMetadata;
    };
    expires: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    metadata: ProfileMetadata;
  }
}
