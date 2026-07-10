import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().url({ message: "MONGODB_URI must be a valid connection string URL" }),
  NEXTAUTH_SECRET: z.string().min(8, { message: "NEXTAUTH_SECRET must be at least 8 characters long" }),
  NEXTAUTH_URL: z.string().url({ message: "NEXTAUTH_URL must be a valid URL" }),
  GOOGLE_CLIENT_ID: z.string().min(1, { message: "GOOGLE_CLIENT_ID is required" }),
  GOOGLE_CLIENT_SECRET: z.string().min(1, { message: "GOOGLE_CLIENT_SECRET is required" }),
  GROQ_API_KEY: z.string().min(1, { message: "GROQ_API_KEY is required" }),
  JWT_SECRET: z.string().min(8, { message: "JWT_SECRET must be at least 8 characters long" }),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// Helper to validate and export environment variables
function validateEnv() {
  // During build phase, dummy/placeholder env vars can be used to prevent build failure
  // if not supplied on CI/CD pipeline
  const isBuild = process.env.NEXT_PHASE === "phase-production-build" || process.env.NODE_ENV === "production";
  
  const envData = {
    MONGODB_URI: process.env.MONGODB_URI || (isBuild ? "mongodb://localhost:27017/build-db" : undefined),
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || (isBuild ? "placeholder-secret-for-build" : undefined),
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || (isBuild ? "http://localhost:3000" : undefined),
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || (isBuild ? "placeholder-google-id" : undefined),
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || (isBuild ? "placeholder-google-secret" : undefined),
    GROQ_API_KEY: process.env.GROQ_API_KEY || (isBuild ? "placeholder-groq-key" : undefined),
    JWT_SECRET: process.env.JWT_SECRET || process.env.AUTH_SECRET || (isBuild ? "placeholder-jwt-secret" : undefined),
    NODE_ENV: process.env.NODE_ENV,
  };

  const parsed = envSchema.safeParse(envData);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues
      .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
      
    console.error("❌ Environment configuration validation failed:\n" + errorMessages);
    throw new Error("Invalid server environment configuration:\n" + errorMessages);
  }

  return parsed.data;
}

export const env = validateEnv();
