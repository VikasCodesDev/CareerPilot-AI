import { SignupInput } from "../schemas";
import { AuthUser, ProfileMetadata } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

function normalizeError(response: unknown): string {
  if (!response || typeof response !== "object") {
    return "Unknown error occurred.";
  }

  const payload = response as { error?: unknown; message?: unknown };
  if (typeof payload.error === "string") {
    return payload.error;
  }
  if (typeof payload.message === "string") {
    return payload.message;
  }
  return "An unexpected error occurred.";
}

export class AuthService {
  static async registerUser(data: SignupInput): Promise<AuthUser> {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "same-origin",
    });

    const payload: ApiResponse<AuthUser> = await response.json();
    if (!payload.success) {
      throw new Error(normalizeError(payload));
    }
    return payload.data as AuthUser;
  }

  static async verifyCode(email: string, code: string): Promise<boolean> {
    const response = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
      credentials: "same-origin",
    });

    const payload: ApiResponse<null> = await response.json();
    if (!payload.success) {
      throw new Error(normalizeError(payload));
    }
    return true;
  }

  static async sendResetLink(email: string): Promise<void> {
    const response = await fetch("/api/auth/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      credentials: "same-origin",
    });

    const payload: ApiResponse<null> = await response.json();
    if (!payload.success) {
      throw new Error(normalizeError(payload));
    }
  }

  static async updateOnboarding(
    userId: string,
    metadata: Partial<ProfileMetadata>,
  ): Promise<AuthUser> {
    const response = await fetch("/api/auth/onboarding", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, metadata }),
      credentials: "same-origin",
    });

    const payload: ApiResponse<AuthUser> = await response.json();
    if (!payload.success) {
      throw new Error(normalizeError(payload));
    }
    return payload.data as AuthUser;
  }
}
