import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z
    .string()
    .url({ message: "MONGODB_URI must be a valid connection string URL" }),
  NEXTAUTH_SECRET: z
    .string()
    .min(8, { message: "NEXTAUTH_SECRET must be at least 8 characters long" }),
  NEXTAUTH_URL: z.string().url({ message: "NEXTAUTH_URL must be a valid URL" }),
  GOOGLE_CLIENT_ID: z
    .string()
    .min(1, { message: "GOOGLE_CLIENT_ID is required" }),
  GOOGLE_CLIENT_SECRET: z
    .string()
    .min(1, { message: "GOOGLE_CLIENT_SECRET is required" }),
  GROQ_API_KEY: z.string().min(1, { message: "GROQ_API_KEY is required" }),
  GEMINI_API_KEY: z.string().optional(),
  JWT_SECRET: z
    .string()
    .min(8, { message: "JWT_SECRET must be at least 8 characters long" }),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

function validateEnv() {
  // Build-time defaults keep static compilation deterministic; deployments must supply real values.
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";
  const isProdRuntime = process.env.NODE_ENV === "production" && !isBuild;

  const envData = {
    MONGODB_URI:
      process.env.MONGODB_URI ||
      (isBuild ? "mongodb://localhost:27017/build-db" : undefined),
    NEXTAUTH_SECRET:
      process.env.NEXTAUTH_SECRET ||
      process.env.AUTH_SECRET ||
      (isBuild ? "placeholder-secret-for-build" : undefined),
    NEXTAUTH_URL:
      process.env.NEXTAUTH_URL ||
      (isBuild ? "http://localhost:3000" : undefined),
    GOOGLE_CLIENT_ID:
      process.env.GOOGLE_CLIENT_ID ||
      (isBuild ? "placeholder-google-id" : undefined),
    GOOGLE_CLIENT_SECRET:
      process.env.GOOGLE_CLIENT_SECRET ||
      (isBuild ? "placeholder-google-secret" : undefined),
    GROQ_API_KEY:
      process.env.GROQ_API_KEY ||
      (isBuild ? "placeholder-groq-key" : undefined),
    GEMINI_API_KEY:
      process.env.GEMINI_API_KEY ||
      (isBuild ? "placeholder-gemini-key" : undefined),
    JWT_SECRET:
      process.env.JWT_SECRET ||
      process.env.AUTH_SECRET ||
      (isBuild ? "placeholder-jwt-secret" : undefined),
    NODE_ENV: process.env.NODE_ENV,
  };

  const parsed = envSchema.safeParse(envData);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues
      .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(
      "Invalid server environment configuration:\n" + errorMessages,
    );
  }

  if (isProdRuntime) {
    const productionIssues = [
      ["MONGODB_URI", parsed.data.MONGODB_URI],
      ["NEXTAUTH_SECRET", parsed.data.NEXTAUTH_SECRET],
      ["NEXTAUTH_URL", parsed.data.NEXTAUTH_URL],
      ["GOOGLE_CLIENT_ID", parsed.data.GOOGLE_CLIENT_ID],
      ["GOOGLE_CLIENT_SECRET", parsed.data.GOOGLE_CLIENT_SECRET],
      ["GROQ_API_KEY", parsed.data.GROQ_API_KEY],
      ["JWT_SECRET", parsed.data.JWT_SECRET],
    ].filter(([, value]) => !value || String(value).includes("placeholder"));

    if (productionIssues.length > 0) {
      const formattedIssues = productionIssues
        .map(([key]) => `- ${key}: must be set to a real value in production`)
        .join("\n");

      throw new Error(
        "Production environment configuration is incomplete:\n" +
          formattedIssues,
      );
    }
  }

  return parsed.data;
}

export const env = validateEnv();
